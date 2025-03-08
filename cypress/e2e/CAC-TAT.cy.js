beforeEach(() => {
  cy.visit('../src/index.html');
})

describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT")

  }),
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('ajsdhajdsh', 20)
    cy.get('#firstName').type("Letícia");
    cy.get('#lastName').type("Alves");
    cy.get('#email').type("leticiancalves@hotmail.com");
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.get('.button').click();
    cy.get('.success').should('be.visible');
  }),
  it('Exibe Mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type("Letícia");
    cy.get('#lastName').type("Alves");
    cy.get('#email').type("leticiancalves@x");
    cy.get('#open-text-area').type("Hello");
    cy.get('.button').click();
    cy.get('.error').should('be.visible').should('contain', "Valide os campos obrigatórios!")
  })
})
