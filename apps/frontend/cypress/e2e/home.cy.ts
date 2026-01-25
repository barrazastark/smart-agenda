describe('SmartAgenda E2E', () => {
  it('should redirect from home to dashboard', () => {
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    cy.get('h1').should('be.visible') // AppTitle heading
  })

  it('should display dashboard content', () => {
    cy.visit('/dashboard')
    cy.get('h1').should('be.visible') // AppTitle heading
    cy.contains('Welcome Back').should('be.visible')
  })
})
