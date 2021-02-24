describe('Main Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#add-cart-button').click();
  })

  it('Mini Bag works correctly', () => {
    cy.get('.jagaad-navbar-action > :nth-child(1) > img').click();

    cy.get('.bag-item-wrapper').should('have.length', 1);
  })

  it('Remove Item from Mini Bag works correctly', () => {
    cy.get('.jagaad-navbar-action > :nth-child(1) > img').click();
    cy.get('.bag-item-content > :nth-child(2) > .icon > .mdi').click();
    cy.get('.bag-item-wrapper').should('have.length', 0);
    cy.get('#wishlist-counter').should('have.text', '0');
  })

})
