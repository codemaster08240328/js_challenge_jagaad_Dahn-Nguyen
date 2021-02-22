describe('Main Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Visits index page', () => {
    cy.get('.card-component').should('have.length', 6);
  })

  it('Click Next button', () => {
    cy.get('.pagination-next').click();
    cy.wait(500);
    cy.get('.card-component').should('have.length', 6);
  })

  it('Add-Wishlsit button works correctly', () => {
    cy.get('#wishlist-wrapper').click();

    cy.get('#wishlist-counter').should('have.text', '1');
  })

  it('Add Cart Button works correctly', () => {
    cy.get('#add-cart-button').click();

    cy.get('#bag-counter').should('have.text', '1')
  })
})
