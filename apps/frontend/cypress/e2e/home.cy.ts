describe('SmartAgenda Home Page', () => {
  it('should load the home page and display title', () => {
    cy.visit('/')
    cy.get('h1').contains('SmartAgenda')
    cy.get('p').contains('Your intelligent scheduling solution')
  })

  it('should display connection status', () => {
    cy.visit('/')
    cy.contains('Backend Connection Status').should('be.visible')
  })
})
