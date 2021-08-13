describe("Navigation", () => {
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // cy.get("li").contains("Tuesday").click().should("have.class", "day-list__item--selected");
    cy.contains("[data-testid=day]","Tuesday").click().should("have.class", "day-list__item--selected");
  });
});