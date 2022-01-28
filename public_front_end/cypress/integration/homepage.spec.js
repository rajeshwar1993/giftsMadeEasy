/// <reference types="cypress" />

describe('Home page basic tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Checks page has rendered', () => {
    // cy.url().should('have.text', '/');
    cy.get('h1').should('have.length', 1);
    cy.get('h2').should('have.length', 1);
    cy.get('h1').should('have.text', 'give gifts that matter');
    cy.get('h2').should(
      'have.text',
      `Just choose the relationship you have with the person and their age group. It's that simple.`
    );
  });

  it('Checks page has a logo on Nav bar', () => {});

  it('Checks page has links on nav bar', () => {
    let navLinks = cy.get('nav button');
    console.log(navLinks);
  });
});
