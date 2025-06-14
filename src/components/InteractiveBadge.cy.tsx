import { mount } from "@cypress/react";
import { InteractiveBadge } from "./InteractiveBadge";
import type { InteractiveBadgeProps } from "./InteractiveBadge";
import "@/index.css";

let baseProps: InteractiveBadgeProps;
let onUpdate: Cypress.Agent<sinon.SinonStub>;
let onRemove: Cypress.Agent<sinon.SinonStub>;

describe("<InteractiveBadge />", () => {
  beforeEach(() => {
    onUpdate = cy.stub().as("onUpdate");
    onRemove = cy.stub().as("onRemove");

    baseProps = {
      label: "Functions.EndConversation",
      description: "Ends the conversation",
      status: "success",
      prevID: "abc12345-def6-7890-ghij-klmnopqrstuv",
      onUpdate,
      onRemove,
    };

    mount(<InteractiveBadge {...baseProps} />);
  });

  it("renders with the correct label and tooltip", () => {
    cy.contains("button", baseProps.label).should("exist").focus();
    cy.get("div").contains(baseProps.description).should("exist");
  });

  it("opens the popover and updates the function", () => {
    cy.contains("button", baseProps.label).click();
    cy.get("ul > li").first().click();
    cy.get("@onUpdate").should("have.been.called");
  });

  it("opens dialog and confirms removal", () => {
    cy.get("button").contains("remove", { matchCase: false }).click({ force: true });
    cy.contains("button", "Remove function").click();
    cy.get("@onRemove").should("have.been.calledWith", baseProps.prevID);
  });

  it("cancels removal dialog properly", () => {
    cy.get("button").contains("remove", { matchCase: false }).click({ force: true });
    cy.contains("button", "Cancel").click();
    cy.get("@onRemove").should("not.have.been.called");
  });
});

