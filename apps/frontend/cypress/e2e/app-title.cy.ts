describe('AppTitle Component', () => {
  beforeEach(() => {
    // Intercept API call
    cy.intercept('GET', '**/api/settings/app-title', {
      statusCode: 200,
      body: { key: 'app_title', value: 'Custom Title' },
    }).as('getAppTitle')
  })

  it('should display custom app title from API in both content and sidebar', () => {
    cy.visit('/dashboard')
    cy.wait('@getAppTitle')

    // There should be two h1 tags: one in sidebar, one in headet
    cy.get('h1').should('have.length', 2)

    // Check Sidebar title
    cy.get('nav, [class*="sidebar"]').find('h1').should('contain', 'Custom Title')

    // Check Main Header title
    cy.get('header').find('h1').should('contain', 'Custom Title')
    cy.get('header').find('h1').should('have.class', 'text-3xl')
  })

  it('should display fallback title if API fails', () => {
    cy.intercept('GET', '**/api/settings/app-title', {
      statusCode: 500,
      body: { error: 'Server error' },
    }).as('getAppTitleError')

    cy.visit('/dashboard')

    // Fallback title should be "SmartAgenda"
    cy.get('h1').should('contain', 'SmartAgenda')
  })
})
