/****
 
 **** Updates ****

 - New properties have been added to support UI rendering and 
   dynamic styling for badges, tooltips, and popover menus

 - Added a `status` property to the `FunctionSpec` interface to represent the intent
   of each function (i.e. "success", "pending", "info").

 - Expanded the `functionSpecs` array from 2 to 4 records 
   based on the available functions object.

    - New function: "Functions.ScheduleMeeting" (status: "success")
    - New function: "Functions.RetrieveKnowledge" (status: "info")
 ****/
export interface FunctionSpec {
  id: string;
  description: string;
  function_internal_id: string;
  status: string;
}

export const functionSpecs: FunctionSpec[] = [
  {
    id: "abc12345-def6-7890-ghij-klmnopqrstuv",
    description: "Ends the conversation with a successful outcome",
    function_internal_id: "Functions.EndConversation",
    status: "success",
  },
  {
    id: "xyz98765-wxyz-4321-lmno-pqrstuvwxyza",
    description: "Transfers the call to a human representative",
    function_internal_id: "Functions.TransferCall",
    status: "pending",
  },
  {
    id: "def67891-ghij-2345-klmn-opqrstuvwxyz",
    description: "Schedule a meeting with customer",
    function_internal_id: "Functions.ScheduleMeeting",
    status: "success",
  },
  {
    id: "ghi23456-jklm-7891-opqr-stuvwxyzabcd",
    description: "Retrieve specific information from a knowledge source",
    function_internal_id: "Functions.RetrieveKnowledge",
    status: "info",
  },
];

export const availableFunctions = {
  end: "Functions.End",
  transfer: "Functions.Transfer",
  knowledge: "Functions.Knowledge",
  calendar: "Functions.Calendar",
};
