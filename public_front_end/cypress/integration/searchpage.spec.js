/// <reference types="cypress" />

import AppConfig from '../../src/common/appConfig';

let countObj = {};

describe('Search page basic tests', () => {
  it('Check if landing on search page', () => {
    cy.visit('/search');
    cy.get('h1').should('have.length', 2);
    cy.get('h1').first().should('have.text', AppConfig.SEARCH.headLine);
  });

  // it('Checks all filter by interest functionalities', () => {
  //   cy.visit('/search');
  //   cy.get('[data-testid="int-filter-desk"]').should('have.length', 1);

  //   const button = cy.get('[data-testid="int-filter-desk"] button');
  //   button.should('have.length', 1);

  //   const selectedInterests = cy.get('[data-testid="selected-interests"]');
  //   selectedInterests.should('have.length', 1);

  //   const interestSelector = cy.get('[data-testid="interest-selector"]');
  //   interestSelector.should('have.length', 0);

  //   // check current count of selected interests
  //   selectedInterests.find('[data-testid="chips"]').should('have.length', 0);

  //   // click on button
  //   button.click();
  //   interestSelector.should('have.length', 1);
  // });

  it('Checks all filters one by one and lists down all less than 5 results cases', () => {
    cy.visit('/search');
    cy.document().then(doc => {
      // get all dropdowns loop through options
      cy.get('div[data-testid="filters-body"] button').each(($el, j) => {
        // get all options of first one
        cy.wrap($el).click();

        // start a loop over all elements
        cy.get('ul[role="listbox"] li').each(async ($li, i) => {
          // ignore the first one
          if (i === 0) {
            cy.wrap($el).click();
          }
          if (i > 0) {
            // open the dropdown
            cy.wrap($el).click();

            cy.get('ul[role="listbox"] li').eq(i).click();
            cy.wait(2000).then(() => {
              let text = $el.find('span')[0].innerText;

              // read the number of elements
              let count = doc.querySelector(
                'span[data-testid="res-count"]'
              ).innerText;
              count = parseInt(count);
              console.log(text, '::', count);
              if (count <= 5) {
                // add to output
                countObj[text] = count;
              }
            });
          }
        });

        cy.get('button[data-testid="clear-all"]').click();
        cy.wait(2000);
      });
    });
  });

  it.only('Checks all filters one by one and lists down all less than 5 results cases', () => {
    cy.visit('/search');
    cy.document().then(doc => {
      // open interests
      let filterBtn = cy.get('div[data-testid="int-filter-desk"] button');
      filterBtn.click();
      let intPop = cy.get('div[data-testid="interest-selector"]');

      intPop.should('have.length', 1);

      let okBtn = cy
        .get('div[data-testid="interest-selector"]>h2 button')
        .eq(1);
      let cnclBtn = cy
        .get('div[data-testid="interest-selector"]>h2 button')
        .eq(0);

      cy.get('div[data-testid="interest-selector"]>div button').each(
        ($btn, j) => {
          // click on btn
          cy.get('div[data-testid="interest-selector"]>div button')
            .eq(j)
            .click();
          // get and loop over all checkboxes
          cy.get(
            'div[data-testid="interest-selector"] div input[type="checkbox"]'
          ).each(($chk, i) => {
            if (i > 0) {
              let text = doc.querySelectorAll(
                'div[data-testid="interest-selector"] div label'
              )[i].innerText;
              // check checkbox
              cy.get(
                'div[data-testid="interest-selector"] div input[type="checkbox"]'
              )
                .eq(i)
                .click();
              // click ok
              cy.get('div[data-testid="interest-selector"]>h2 button')
                .eq(1)
                .click();
              cy.wait(2000).then(() => {
                // read the number of elements
                let count = doc.querySelector(
                  'span[data-testid="res-count"]'
                ).innerText;
                count = parseInt(count);
                if (count <= 10) {
                  countObj[text] = count;
                  console.log(countObj);
                }
                // clear the results
                cy.get('button[data-testid="clear-all"]').click();
                cy.wait(500).then(() => {
                  // open filter
                  cy.get('div[data-testid="int-filter-desk"] button').click();
                  // click category
                  cy.get('div[data-testid="interest-selector"]>div button')
                    .eq(j)
                    .click();
                });
              });
            }
          });

          // click back
          cy.contains('Back to All Interests').click();
        }
      );
    });
  });
});
