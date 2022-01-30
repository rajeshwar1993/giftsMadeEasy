/// <reference types="cypress" />

describe('Home page basic tests', () => {
  // beforeEach(() => {
  //   cy.visit('/');
  // });

  it('Checks page has rendered', () => {
    cy.visit('/');
    cy.get('h1').should('have.length', 1);
    cy.get('h2').should('have.length', 1);
    cy.get('h1').should('have.text', 'give gifts that matter');
    cy.get('h2').should(
      'have.text',
      `We Curate and Categorize the top rated gifting products from trusted websites like Amazon, making this the one-stop destination for all your gifting needs!`
    );
  });

  it('Checks page has a logo on Nav bar', () => {
    cy.get('[data-testid="navLogo"]').should('have.length', 1);
    cy.get('[data-testid="navLogo"] img').should('have.length', 1);
    cy.get('[data-testid="navLogo"] img').should('have.attr', 'src');
  });

  it('Checks page has links on nav bar', () => {
    cy.get('nav button').should('have.length', 7);
    cy.get('nav button').each(($el, index, $list) => {
      if (index === 1) {
        cy.wrap($el).should('have.text', 'Relation');
      } else if (index === 2) {
        cy.wrap($el).should('have.text', 'Interests');
      } else if (index === 3) {
        cy.wrap($el).should('have.text', 'Age');
      } else if (index === 4) {
        cy.wrap($el).should('have.text', 'Occasions');
      } else if (index === 5) {
        cy.wrap($el).should('have.text', 'Signup');
      } else if (index === 6) {
        cy.wrap($el).should('have.text', 'Login');
      }
    });
  });

  it('Click on Search All Categories should take you to search page', () => {
    cy.get('nav').contains('Search All Categories').click();
    cy.wait(1000);
    cy.url().should('include', '/search');
    cy.go('back');
    cy.wait(200);
    cy.url().should('not.include', '/search');
  });

  it('Tests the Nav expand menu and its links', () => {
    cy.get('nav button').should('have.length', 7);
    cy.get('nav button').each(($el, index, $list) => {
      if (index === 1) {
        cy.wrap($el).should('have.text', 'Relation');

        checkExpandMenu($el, 'I am looking for a gift for my', {
          name: 'Brother',
          link: '/search?rt=br'
        });
        checkExpandMenu($el, 'I am looking for a gift for my', {
          name: 'Mother',
          link: '/search?rt=mo'
        });
      } else if (index === 2) {
        cy.wrap($el).should('have.text', 'Interests');
        checkExpandMenu(
          $el,
          'The person must be interested in some of these?',
          {
            name: 'Educational Toys',
            link: '/search?it=edt'
          }
        );
        checkExpandMenu(
          $el,
          'The person must be interested in some of these?',
          {
            name: 'All Electronics & Gadgets',
            link: '/search?it=bfgeg&it=smph&it=lpt&it=tab&it=camac&it=spear&it=wede&it=smhd&it=gmac'
          }
        );
      } else if (index === 3) {
        cy.wrap($el).should('have.text', 'Age');
        checkExpandMenu($el, 'How old is this person?', {
          name: 'Young Adult (18-22)',
          link: '/search?at=YA'
        });
        checkExpandMenu($el, 'How old is this person?', {
          name: 'Teenager (13-17)',
          link: '/search?at=Teen'
        });
      } else if (index === 4) {
        cy.wrap($el).should('have.text', 'Occasions');
        checkExpandMenu($el, 'Whats the occassion?', {
          name: 'Promotion',
          link: '/search?ot=p'
        });
        checkExpandMenu($el, 'Whats the occassion?', {
          name: 'Anniversary',
          link: '/search?ot=a'
        });
      }
    });
  });

  it('Tests the quick search', () => {
    cy.visit('/');
    cy.contains('Quick Search').should('have.length', 1);
    cy.get('div[data-testid="quickSearchContainer"]').should('have.length', 1);

    // relationship dropdown
    cy.get('div[data-testid="relFilterMini"] button span')
      .first()
      .should('have.text', 'Relationship');
    // click on that button
    cy.get('div[data-testid="relFilterMini"] button').click();
    cy.get('ul[role="listbox"]').should('have.length', 1);
    cy.get('ul[role="listbox"] li').should('have.length', 15);
    // check for friend option
    cy.get('ul[role="listbox"] li').contains('Friend').should('have.length', 1);
    cy.get('ul[role="listbox"] li').contains('Friend').click();
    cy.get('div[data-testid="relFilterMini"] button span')
      .first()
      .should('have.text', 'Friend');
    // check for brother option
    cy.get('div[data-testid="relFilterMini"] button').click();
    cy.get('ul[role="listbox"] li')
      .contains('Brother')
      .should('have.length', 1);
    cy.get('ul[role="listbox"] li').contains('Brother').click();
    cy.get('div[data-testid="relFilterMini"] button span')
      .first()
      .should('have.text', 'Brother');

    // age group dropdown
    cy.get('div[data-testid="ageFilterMini"] button span')
      .first()
      .should('have.text', 'Age Group');
    // click on that button
    cy.get('div[data-testid="ageFilterMini"] button').click();
    cy.get('ul[role="listbox"]').should('have.length', 1);
    cy.get('ul[role="listbox"] li').should('have.length', 13);
    // check for friend option
    cy.get('ul[role="listbox"] li')
      .contains('Financially Settled (41-50)')
      .should('have.length', 1);
    cy.get('ul[role="listbox"] li')
      .contains('Financially Settled (41-50)')
      .click();
    cy.get('div[data-testid="ageFilterMini"] button span')
      .first()
      .should('have.text', 'Financially Settled (41-50)');
    // check for brother option
    cy.get('div[data-testid="ageFilterMini"] button').click();
    cy.get('ul[role="listbox"] li')
      .contains('Kid (8-12)')
      .should('have.length', 1);
    cy.get('ul[role="listbox"] li').contains('Kid (8-12)').click();
    cy.get('div[data-testid="ageFilterMini"] button span')
      .first()
      .should('have.text', 'Kid (8-12)');

    // click on search button
    cy.get('div[data-testid="quickSearchContainer"] button').last().click();
    cy.url().should('include', '/search?rt=br&at=Kid');
  });
});

const checkExpandMenu = (el, subtext, param) => {
  cy.wrap(el).click();
  cy.get('[data-testid="navPopover"]').should('have.length', 1);
  cy.get('[data-testid="navPopover"]')
    .contains(subtext)
    .should('have.length', 1);
  cy.get('[data-testid="navPopover"]')
    .contains(param.name)
    .should('have.length', 1);
  cy.get('[data-testid="navPopover"]').contains(param.name).click();
  cy.wait(300);
  cy.url().should('include', param.link);
};
