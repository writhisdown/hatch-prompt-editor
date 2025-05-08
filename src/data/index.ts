export interface FunctionSpec {
  id: string;
  description: string;
  function_internal_id: string;
}

export const functionSpecs: FunctionSpec[] = [
  {
    id: "abc12345-def6-7890-ghij-klmnopqrstuv",
    description: "Ends the conversation with a successful outcome",
    function_internal_id: "Functions.EndConversation",
  },
  {
    id: "xyz98765-wxyz-4321-lmno-pqrstuvwxyza",
    description: "Transfers the call to a human representative",
    function_internal_id: "Functions.TransferCall",
  },
];

export const availableFunctions = {
  end: "Functions.End",
  transfer: "Functions.Transfer",
  knowledge: "Functions.Knowledge",
  calendar: "Functions.Calendar",
};
