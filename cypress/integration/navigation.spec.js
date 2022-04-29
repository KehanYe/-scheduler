describe("Navigation", () => {
  it("should visit root", () => {
    // eslint-disable-next-line no-undef
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
     // eslint-disable-next-line no-undef
    cy.visit("/");
     // eslint-disable-next-line no-undef
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });

});

