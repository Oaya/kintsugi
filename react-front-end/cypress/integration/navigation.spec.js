describe("Navigation", () => {

  beforeEach(() => {
    cy.visit("/");
  })

  xit("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to professionals after selecting search params", () => {

    cy.get('.selection').contains('Language').click();
    cy.contains('Japanese').click();

    cy.get('.selection').contains('Province').click();
    cy.contains('BC').click();

    cy.get('.btn-search').click();

    cy.contains(".professionals__item", "Garek Slamaker");
    cy.contains("professionals__item", "Ole Beagley").should("not.exist");
    cy.get(".professionals").find(".professionals__item").should("have.length", 3);

  });

  it("should navigate to the appointment page", () => {

    cy.get(".navigation").contains("View Appointments").click();

    cy.contains("Upcoming Appointments");
    cy.get(".appointment").should("have.length", 2);
  })
});
