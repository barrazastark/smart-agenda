describe('SmartAgenda E2E', () => {
  it('should redirect from home to dashboard', () => {
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    cy.get('h2').contains('Dashboard')
  })

  it('should display the dashboard content', () => {
    cy.visit('/dashboard')
    cy.get('h2').contains('Dashboard')
    cy.contains('Welcome to your new dashboard').should('be.visible')
  })
})
