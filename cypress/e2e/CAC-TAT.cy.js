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
  }),
  it('Validar que não é possivel digitar um valor não-numérico no campo do telefone', () => {
    cy.get('#phone').type('uhasuhsauhhs');
    cy.get('#phone').should('have.value', '')
  }),
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('#firstName').type("Letícia");
    cy.get('#lastName').type("Alves");
    cy.get('#email').type("leticiancalves@hotmail.com");
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type("Hello");
    cy.get('.button').click();
    cy.get('.error').should('be.visible').should('contain', "Valide os campos obrigatórios!")
  }),
  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type("Letícia").should('have.value', 'Letícia').clear().should('have.value', '');
    cy.get('#lastName').type("Alves").should('have.value', 'Alves').clear().should('have.value', '');
    cy.get('#email').type("leticiancalves@hotmail.com").should('have.value', 'leticiancalves@hotmail.com').clear().should('have.value', '');
    cy.get('#phone').type('12313').should('have.value', '12313').clear().should('have.value', '');

  }),
  it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button').click();
    cy.get('.error').should('be.visible').should('contain', "Valide os campos obrigatórios!")
  })
})
