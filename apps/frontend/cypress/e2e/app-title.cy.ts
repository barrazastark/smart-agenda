describe('AppTitle Component', () => {
  const apiUrl = Cypress.env('apiUrl')

  beforeEach(() => {
    // Reset to default before each test if needed,
    // but here we will just set what we need
  })

  it('should display custom app title from API after update', () => {
    const customTitle = 'Custom Title ' + Math.random().toString(36).substring(7)

    // 1. Update the title via real API request
    cy.request('POST', `${apiUrl}/api/settings/app-title`, {
      value: customTitle,
    })

    // 2. Visit dashboard (SSR will fetch the new title)
    cy.visit('/dashboard')

    // 3. Verify in both sidebar and header
    // There should be two h1 tags: one in sidebar, one in header
    cy.get('h1').should('have.length', 2)

    // Check Sidebar title
    cy.get('aside.sidebar').find('h1').should('contain', customTitle)

    // Check Main Header title
    cy.get('header').find('h1').should('contain', customTitle)
  })

  it('should display the initial default title', () => {
    // Set it back to default
    cy.request('POST', `${apiUrl}/api/settings/app-title`, {
      value: 'SmartAgenda',
    })

    cy.visit('/dashboard')

    // Fallback/Default title should be "SmartAgenda"
    cy.get('h1').should('contain', 'SmartAgenda')
  })
})
