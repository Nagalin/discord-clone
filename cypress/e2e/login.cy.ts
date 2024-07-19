
describe('Create server', () => {

  before(() => {
    cy.task('serverCleanup')
  })

  it('should create server', () => {
    cy.setCookie('next-auth.session-token', Cypress.env('next-auth-cookie'))
    cy.visit('http://localhost:3000/homepage')

    cy.get('[data-cy="create-server-dialog-button"]').click()
    cy.get('input[type="text"]').type('mocked-server')
    cy.get('input[type="file"]').selectFile('/discord-clone/cypress/fixtures/server-image.png');
    cy.contains('Create server').click()
    cy.get('[data-cy="create-server-submit"]').click()
    cy.contains('Server created!!', { timeout: 10000 })

  })
})
