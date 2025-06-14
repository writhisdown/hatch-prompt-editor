import React, { useState, useRef, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { functionSpecs } from "@/data/index";
import ReactMarkdown from "react-markdown";
import reactStringReplace from "react-string-replace";
import { Card, CardContent } from "@/components/ui/card";
import { InteractiveBadge } from "@/components/InteractiveBadge";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "@/components/icons/PencilIcon";

const SAMPLE_SCRIPT = `# ExampleCo Home Solutions – Sample Call Script

You're a customer service representative speaking on the phone.

---

## Steps:

1. Ask for **first and last name**.

2. Ask for **full property address**.

3. Confirm the address back, saying:
   - Street numbers and ZIP code individually.
   - e.g., "401st Street" → _"four hundred first street"_

4. Ask:  
   _"And that is the home you own and live at?"_

5. Ask:  
   _"And what type of home is it — single family, condo, townhome, mobile, or rental?"_

6. Ask:  
   _"Great! We also ask to meet with all owners of the property. Who would that be?"_

7. Say:  
   _"This will be a full replacement including frame and installation. We don't perform repairs or glass-only replacements."_

8. Ask how many **[units]** they want replaced (e.g., windows or doors).

9. Ask what issues they're experiencing with those **[units]**.

10. Say:  
    _"A Project Specialist will inspect, measure, and provide a quote valid for 12 months. Does that sound helpful?"_

11. Ask:  
    _"We ask that you set aside about 90 minutes for the visit. Fair enough?"_

12. Ask for **best email address**.

13. Ask:  
    _"Would daytime or evening work better for your schedule?"_

14. Offer appointment based on their preference (e.g., 2 P M or 6 P M).

15. Then:  
    <% function abc12345-def6-7890-ghij-klmnopqrstuv %>

---

## If Caller Is Not Interested:

End with:  
<% function xyz98765-wxyz-4321-lmno-pqrstuvwxyza %>`;

// Regex pattern used to capture entire function placeholder 
// from markdown i.e. `<% function some-id %>`
const REGEX_PATTERN_FULL = /(<%\s*[\w\s.-]+?\s*%>)/g;

// Captures only the function ID inside the placeholder 
// i.e. `some-id` from `<% function some-id %>`
const REGEX_PATTERN_INNER = /function\s+([\w.-]+)/;

export function Editor() {
  /**** State ****/

  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sanitizes and persists user input using localStorage (initialized with 'SAMPLE_SCRIPT')
  const [markdown, setMarkdown] = useLocalStorage("markdown", SAMPLE_SCRIPT);

  /**** Refs ****/

  // Reference <textarea> element to track markdown values
  const userInputRef = useRef<HTMLTextAreaElement>(null);    

  /****  Functions ****/

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  // if markdown value results in an empty string reset the value to 
  // initial 'SAMPLE_SCRIPT' string
  const resetPlaceholderText = (userInput: string | undefined) => {
    if (isEditing && userInput === '') {
      setMarkdown(SAMPLE_SCRIPT);
    }
  }

  const handleUserInput = () => {
    const currentValue = userInputRef.current?.value;
    if (isEditing) {
      setMarkdown(currentValue);
    }
    resetPlaceholderText(currentValue);
    toggleEditing();
  }

  return (
    <Card className="rounded-lg shadow-lg focus-within:ring focus-within:ring-hatch-blue">
      <CardContent className="p-6 relative">
        {isEditing ? (
          <textarea
            className="h-[400px] w-full font-mono text-base outline-none resize-none"
            autoFocus
            value={markdown} 
            ref={userInputRef}
            onChange={(event) => setMarkdown(event.target.value)}
            onBlur={handleUserInput}
          ></textarea>
        ) : (
          <div
            className="h-[400px] w-full outline-none text-base cursor-text whitespace-normal overflow-y-auto prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-700 prose-em:italic prose-ul:list-disc prose-ul:pl-4 prose-ol:list-decimal prose-ol:ps-6 prose-li:text-gray-700 prose-hr:border-gray-200 prose-code:before:content-none prose-code:after:content-none prose-code-inline"
            tabIndex={0}
            role="textbox"
            aria-label="Prompt editor"
          >
            {/*
              React component for safely rendering markdown content as HTML
              see: https://github.com/remarkjs/react-markdown
            */}
            <ReactMarkdown
              components={{
                p({ children }) {
                  return (
                      React.Children.map(children, (child) => {
                        if (typeof child === "string") {
                          // Replaces matching substrings with React components 
                          // without breaking rendering
                          // see: https://github.com/iansinnott/react-string-replace
                          return reactStringReplace(child, REGEX_PATTERN_FULL, (match) => {

                            // Extracts the inner function ID from the matched placeholder string
                            const extractedFunctionID = match.match(REGEX_PATTERN_INNER);

                            // Retrieves the captured ID from the regex match result
                            const id = extractedFunctionID?.[1];

                            // Finds the corresponding function spec from the list using the extracted I
                            const matchedID = functionSpecs.find((item) => item.id === id);

                            // Gets relevant fields from the matched function spec 
                            // for InteractiveBadge rendering
                            const functionID = matchedID?.id ?? "";
                            const functionName = matchedID?.function_internal_id ?? "";
                            const functionDescription = matchedID?.description ?? "";
                            const functionStatus = matchedID?.status ?? "";

                            // Callback to update a function ID placeholder in markdown string
                            // Replaces the previous ID with new one and renders a new 
                            // function badge in HTML view
                            const handleUpdate = useCallback(
                              (prevID: string, newID: string) => {
                                setMarkdown((prev: string) => {
                                  return prev.replace(prevID, newID);
                                });
                              },
                              [setMarkdown]
                            );

                            // Callback to remove a function placeholder from markdown string
                            // Replaces `<% function {id} %>` with an empty string 
                            // Function badge does not render in HTML view as a result
                            const handleRemove = useCallback(
                              (prevID: string) => {
                                setMarkdown((prev: string) => {
                                  return prev.replace(`<% function ${prevID} %>`, "");
                                });
                              },
                              [setMarkdown]
                            );

                            return (
                              <InteractiveBadge 
                                key={functionID} 
                                label={functionName} 
                                description={functionDescription}
                                status={functionStatus}
                                prevID={functionID}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                              />
                            );
                          });
                        }
                        return child; // preserve original element
                      })
                  );
                }
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        )}
        {/* Floating edit button to enable markdown editing mode (shown when not editing) */}
        {!isEditing && (
            <Button
              className="absolute bottom-0 right-6 cursor-pointer"
              variant="outline"
              size="icon_lg"
              onClick={toggleEditing}
            >
              <span className="sr-only">edit prompt in markdown</span>
              <PencilIcon/>
            </Button>
          )
        }
      </CardContent>
    </Card>
  );
}
