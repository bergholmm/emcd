/// <reference types="cypress" />

context('App integration test', () => {
  it('should render ', () => {
    cy.visit('/')
    cy.get('#logo')
  })
})
