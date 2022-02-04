/// <reference types="cypress" />

import AppConfig from '../../src/common/appConfig';

describe('Search page basic tests', () => {
  it('Check if landing on search page', () => {
    cy.visit('/search');
    cy.get('h1').should('have.length', 2);
    cy.get('h1').first().should('have.text', AppConfig.SEARCH.headLine);
  });

  it('Checks all filter by interest functionalities', () => {
    cy.visit('/search');
    cy.get('[data-testid="int-filter-desk"]').should('have.length', 1);

    const button = cy.get('[data-testid="int-filter-desk"] button');
    button.should('have.length', 1);

    const selectedInterests = cy.get('[data-testid="selected-interests"]');
    selectedInterests.should('have.length', 1);

    const interestSelector = cy.get('[data-testid="interest-selector"]');
    interestSelector.should('have.length', 0);

    // check current count of selected interests
    selectedInterests.find('[data-testid="chips"]').should('have.length', 0);

    // click on button
    button.click();
    interestSelector.should('have.length', 1);
  });
});
