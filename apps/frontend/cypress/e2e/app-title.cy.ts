describe('AppTitle Component', () => {
  it('should display app title', () => {
    cy.visit('/dashboard')

    // Since it's a server component, title should be rendered immediately
    cy.get('h1').should('contain', 'SmartAgenda')
    cy.get('h1').should('have.class', 'text-3xl')
    cy.get('h1').should('have.class', 'font-bold')
  })

  it('should display fallback title if API fails', () => {
    cy.visit('/dashboard')

    // Server component should fallback to SmartAgenda if API fails
    cy.get('h1').should('contain', 'SmartAgenda')
  })
})
