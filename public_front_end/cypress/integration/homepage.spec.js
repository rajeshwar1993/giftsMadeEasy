/// <reference types="cypress" />

describe('Home page basic tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Checks page has rendered', () => {
    // cy.url().should('have.text', '/');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').should('have.text', 'give gifts that matter');
  });
});
