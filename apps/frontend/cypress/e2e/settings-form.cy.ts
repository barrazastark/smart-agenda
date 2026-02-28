describe('Settings Page', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://127.0.0.1:4100'

  beforeEach(() => {
    cy.request('POST', `${apiUrl}/settings`, { pageTitle: 'SmartAgenda' })
    cy.visit('/dashboard/settings')
  })

  it('should display the settings form with the current title', () => {
    cy.contains('Configuración').should('be.visible')
    cy.get('[data-testid="page-title-input"]').should('have.value', 'SmartAgenda')
    cy.get('[data-testid="save-settings-btn"]').should('be.visible').and('be.enabled')
  })

  it('should update the page title and persist it', () => {
    const uniqueSuffix = Date.now().toString(36)
    const newTitle = `TestTitle ${uniqueSuffix}`

    cy.get('[data-testid="page-title-input"]').clear().type(newTitle)
    cy.get('[data-testid="save-settings-btn"]').click()

    cy.contains('¡Ajustes guardados!').should('be.visible')

    cy.reload()
    cy.get('[data-testid="page-title-input"]').should('have.value', newTitle)
  })

  it('should show the updated title in the dashboard after saving', () => {
    const uniqueSuffix = Date.now().toString(36)
    const newTitle = `Dashboard Title ${uniqueSuffix}`

    cy.get('[data-testid="page-title-input"]').clear().type(newTitle)
    cy.get('[data-testid="save-settings-btn"]').click()
    cy.contains('¡Ajustes guardados!').should('be.visible')

    cy.visit('/dashboard')
    cy.get('[data-testid="sidebar-title"]').should('contain', newTitle)
    cy.get('[data-testid="dashboard-title"]').should('contain', newTitle)
  })

  it('should show validation error for a title that is too short', () => {
    cy.get('[data-testid="page-title-input"]').clear().type('a')
    cy.get('[data-testid="save-settings-btn"]').click()

    cy.contains('El título debe tener al menos 2 caracteres.').should('be.visible')
  })

  afterEach(() => {
    cy.request('POST', `${apiUrl}/settings`, { pageTitle: 'SmartAgenda' })
  })
})
