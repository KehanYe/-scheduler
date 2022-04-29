/* eslint-disable no-undef */

describe('Appointments', () => {
  beforeEach(() => {
    // Reset API server
    cy.request('GET', '/api/debug/reset');

    // Visit homepage, make sure it contains a list element "Monday"
    cy.visit('/').contains('li', 'Monday');

  });

  it('should book an interview', () => {
    cy.get('img[alt="Add"]').first().click();

    cy.get('input[data-testid=student-name-input]').type('Lydia Miller-Jones');

    cy.get('ul.interviewers__list > li:has(img[alt="Sylvia Palmer"])').click();

    cy.get('button.button--confirm').contains(/save/i).click();

    // Verify appointment card with the student and interviewer names
    cy.contains(
      '.appointment__card--show',
      'Lydia Miller-Jones',
      'Sylvia Palmer'
    );
  });

  it('should edit an interview', () => {
    // The edit button is not visible by default
    // cy.get('img[alt="Edit"]').should('be.not.visible');

    cy.get('img[alt="Edit"]').click({ force: true });

    // Select new interviewer
    cy.get('ul.interviewers__list > li:has(img[alt="Tori Malcolm"])').click();

    // Clear student name input field
    cy.get('input[data-testid=student-name-input]').clear().type('Lydia Miller-Jones');

    // Save the updated interview
    cy.get('button.button--confirm').contains(/save/i).click();

    cy.contains('.appointment__card--show', 'Tori Malcolm', 'Lydia Miller-Jones');
  });

  it.only('should cancel an interview', () => {
    cy.get('[alt="Delete"]').click({ force: true });
    cy.contains(/confirm/i).click();

    // Check for one instance of "Deleting" process indicator which then disappears
    cy.contains(/deleting/i).should('exist');
    cy.contains(/deleting/i).should('not.exist');

    // Verify that the interview was deleted
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});

