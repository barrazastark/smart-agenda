describe('SmartAgenda E2E', () => {
  beforeEach(() => {
    // Mock fetch calls globally for all tests
    cy.intercept('GET', '**/api/settings/app-title', {
      statusCode: 200,
      body: { key: 'app_title', value: 'SmartAgenda' },
    }).as('getAppTitle')
  })

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

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', '**/api/settings/app-title', {
      statusCode: 500,
      body: { error: 'Server error' },
    }).as('getAppTitleError')

    cy.visit('/dashboard')
    cy.get('h1').should('contain', 'SmartAgenda') // Fallback title
  })
})
