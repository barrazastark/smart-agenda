describe('Home Page', () => {
  it('should redirect from home to dashboard', () => {
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    cy.get('[data-testid="dashboard-title"]').should('be.visible')
  })

  it('should display dashboard content', () => {
    cy.visit('/dashboard')
    cy.get('[data-testid="dashboard-title"]').should('be.visible')
    cy.contains('Welcome Back').should('be.visible')
  })
})
