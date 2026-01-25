import { AppTitle } from '@/components/AppTitle'

describe('AppTitle Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/settings/app-title', {
      statusCode: 200,
      body: { key: 'app_title', value: 'SmartAgenda' },
    }).as('getAppTitle')
  })

  it('should display app title from API', () => {
    cy.visit('/dashboard')

    cy.wait('@getAppTitle')

    cy.get('h1').should('contain', 'SmartAgenda')
    cy.get('h1').should('have.class', 'text-3xl')
    cy.get('h1').should('have.class', 'font-bold')
  })

  it('should show loading state initially', () => {
    cy.intercept('GET', '/api/settings/app-title', {
      statusCode: 200,
      body: { key: 'app_title', value: 'SmartAgenda' },
      delay: 1000,
    }).as('getAppTitleDelayed')

    cy.visit('/dashboard')

    cy.get('h1').should('contain', 'Loading...')

    cy.wait('@getAppTitleDelayed')
    cy.get('h1').should('contain', 'SmartAgenda')
  })

  it('should handle API error', () => {
    cy.intercept('GET', '/api/settings/app-title', {
      statusCode: 500,
      body: { error: 'Failed to fetch' },
    }).as('getAppTitleError')

    cy.visit('/dashboard')

    cy.wait('@getAppTitleError')
    cy.get('h1').should('contain', 'Error:')
  })
})
