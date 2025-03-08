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
    cy.contains('.button', 'Enviar').click();
    cy.get('.success').should('be.visible');
  }),
  it('Exibe Mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type("Letícia");
    cy.get('#lastName').type("Alves");
    cy.get('#email').type("leticiancalves@x");
    cy.get('#open-text-area').type("Hello");
    cy.contains('.button', 'Enviar').click();
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
    cy.contains('.button', 'Enviar').click();
    cy.get('.error').should('be.visible').should('contain', "Valide os campos obrigatórios!")
  }),
  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type("Letícia").should('have.value', 'Letícia').clear().should('have.value', '');
    cy.get('#lastName').type("Alves").should('have.value', 'Alves').clear().should('have.value', '');
    cy.get('#email').type("leticiancalves@hotmail.com").should('have.value', 'leticiancalves@hotmail.com').clear().should('have.value', '');
    cy.get('#phone').type('12313').should('have.value', '12313').clear().should('have.value', '');

  }),
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click();
    cy.get('.error').should('be.visible').should('contain', "Valide os campos obrigatórios!")
  }),
  it('envia o formuário com sucesso usando um comando customizado (argumento)', () => {
    const data = {
      firstName: 'Let',
      lastName: 'Alves',
      email: 'leticiancalves@hotmail.com',
      text: 'Hello World!'
    }
    cy.fillMandatoryFieldsAndSubmitArgument(data)
  }),
  it('envia o formuário com sucesso usando um comando customizado (objeto)', () => {
    cy.fillMandatoryFieldsAndSubmitObject()
  }),
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  }),
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  }),
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select([1]).should('have.value', 'blog')
  }),
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get(':nth-child(4) > input').check().should('be.checked')
  }),
  it('marca cada tipo de atendimento', () => {
    cy.get(':nth-child(3) > input').check().should('be.checked');
    cy.get(':nth-child(4) > input').check().should('be.checked');
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"').check().should('be.checked').last().uncheck().should('not.be.checked')
    
  }),
  it.only('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('./cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
})

