import { Editor } from "./Editor";
import "@/index.css"

describe('<Editor />', () => {
  beforeEach(() => {
    cy.mount(<Editor />);
  });

  it("renders the placeholder markdown as HTML", () => {
    cy.get("h1").should("contain.text", "ExampleCo Home Solutions");
    cy.get("ol").should("exist");
  });

  it("toggles to markdown editing mode when edit button is clicked", () => {
    cy.get("button").contains("edit", { matchCase: false }).click({ force: true });
    cy.get("textarea").should("exist").and("contain.value", "# ExampleCo Home Solutions");
  });

  it("updates markdown on edit", () => {
    cy.get("button").contains("edit", { matchCase: false }).click({ force: true });

    cy.get("textarea")
      .clear()
      .type("## Edited Title", { delay: 10 })
      .blur();

    cy.get("h2").should("contain.text", "Edited Title");
  });

  it("renders function badges from placeholder strings", () => {
    cy.get("button").contains("Functions.EndConversation").should("exist");
    cy.get("button").contains("Functions.TransferCall").should("exist");
  });
});