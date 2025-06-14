/****
 Wrapper Component for functional Badges

 *** Props ***
 - label: Displays the name of the function within the badge.
 - description: Tooltip text describing the function's purpose.
 - status: Determines badge styling based on function type (e.g., success, pending).
 - prevID: The current function ID used to locate and update the corresponding placeholder.
 - onUpdate: Callback to update the function ID in the markdown and re-render the badge.
 - onRemove: Callback to remove the function placeholder and its rendered badge.
****/

import { functionSpecs, availableFunctions } from "@/data/index";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DocumentIcon } from "@/components/icons/DocumentIcon";
import { TwoWayArrowIcon } from "@/components/icons/TwoWayArrowIcon";
import { BookIcon } from "@/components/icons/BookIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon ";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { WarningIcon } from "@/components/icons/WarningIcon";

/**** Types ****/

// used with button component's intent prop to determine 
// badge styles based on functionSpecs data
type Status = "success" | "pending" | "info";

export interface InteractiveBadgeProps {
  label: string;
  description: string;
  status: Status | string;
  prevID: string;
  onUpdate: (prevID: string, newID: string) => void;
  onRemove?: (prevID: string) => void;
}

export function InteractiveBadge({ 
  label, 
  description, 
  status, 
  prevID, 
  onUpdate, 
  onRemove 
}: InteractiveBadgeProps) {

  /**** Consts ****/

  // Retrieve array of available functions from 'vailableFunctions'
  // to allow iteration over function values to render items
  // in popover menu
  const functionsArray = Object.values(availableFunctions);

  /**** Functions ****/

  // Helper function to retrieve corresponding ids for use in idMap
  const getFunctionId = (name: string): string => {
    return functionSpecs.find((fn) => fn.function_internal_id === name)?.id ?? "";
  }

  // Custom type guard to validate that 'status' string matches 
  // the intent values accepted by the button component
  const isValidIntent = (value: string): value is "success" | "pending" | "info" => {
    return ["success", "pending", "info"].includes(value);
  }

  // Output toast message on button click
  // see https://sonner.emilkowal.ski/
  const handleToast = () => {
    toast.success("Function successfully removed");
  }

  /**** Maps ****/

  // Map function name keys to corresponding icons for use in popover UI
  const iconMap: Record<string, React.JSX.Element> = {
    end: <DocumentIcon/>,
    transfer: <TwoWayArrowIcon/>,
    knowledge: <BookIcon/>,
    calendar: <CalendarIcon/>,
  }

  // Map function name keys to corresponding function IDs from `functionSpecs`
  const idMap: Record<string, string> = {
    end: getFunctionId("Functions.EndConversation"),
    transfer: getFunctionId("Functions.TransferCall"),
    knowledge: getFunctionId("Functions.RetrieveKnowledge"),
    calendar: getFunctionId("Functions.ScheduleMeeting"),
  }

  return (
    <div className="flex items-center gap-x-1.5 relative">
      {/* 
        * Functional badge with tooltip and popover support 
        Wraps a "badge" like button in Popover and Tooltip components
        via shadcn 
        Enables tooltip description on mouse over
        Enables popover menu that allows users to select additional function badges
      */}
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                size="xs"
                className="cursor-pointer"
                intent={isValidIntent(status) ? status : "default"}
              >
                {label}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>{description}</span>
          </TooltipContent>
        </Tooltip>
        <PopoverContent>
          <ul>
            {functionsArray.map((name, index) => {
              // Extract key from function name (i.e "Functions.Name") 
              // and convert it to lowercase to match keys in `iconMap` and `idMap`
              const nameKey = name.split(".")[1].toLowerCase();

              const icon = iconMap[nameKey] ?? null;
              const newID = idMap[nameKey] ?? null;

              return (
                <li key={index}>
                  <Button 
                    className="cursor-pointer"
                    variant="ghost"
                    size="full"
                    onClick={() => onUpdate(prevID, newID)}
                  >
                    {icon}
                    {name}
                  </Button>
                </li>
              )
            })}
          </ul>
        </PopoverContent>
      </Popover>

      {/* 
        * Remove button with <dialog> and toast support 
        Wraps a "close button in Dialog component with support for Toast via shadcn 
        Remove button triggers confirmation <dialog> that triggers a toast message 
        on confirmation
      */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" variant="outline" size="xs">
            <span className="sr-only">remove function</span>
            <CloseIcon/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-x-2 [&_svg]:stroke-destructive/90">
              <WarningIcon/>
              <DialogTitle>Are you sure?</DialogTitle>
            </div>
            <DialogDescription className="text-lg">
              This function will be deleted and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button 
                className="cursor-pointer"
                variant="destructive"
                onClick={() => {
                  handleToast();
                  return onRemove?.(prevID);
                }}
              >
                Remove function
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}