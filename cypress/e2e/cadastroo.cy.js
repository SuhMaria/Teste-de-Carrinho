describe('Teste de Cadastro de Novo Usuário', () => {
    beforeEach(() => {
      cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
      cy.wait(3000); // Aguarda a página carregar completamente
    });
  
    it('Realiza o cadastro de um novo usuário', () => {
      // Informações fictícias para o cadastro
      const usuario = {
        primeiroNome: 'John',
        ultimoNome: 'Doe',
        email: `john.doe.${Date.now()}@example.com`, // Gera um e-mail único com base no timestamp
        senha: 'Password123!'
      };
  
      // Preenche o formulário de cadastro
      cy.get('#firstname', { timeout: 10000 })
        .should('be.visible')
        .type(usuario.primeiroNome)
        .should('have.value', usuario.primeiroNome);
  
      cy.get('#lastname', { timeout: 10000 })
        .should('be.visible')
        .type(usuario.ultimoNome)
        .should('have.value', usuario.ultimoNome);
  
      cy.get('#email_address', { timeout: 10000 })
        .should('be.visible')
        .type(usuario.email)
        .should('have.value', usuario.email);
  
      cy.get('#password', { timeout: 10000 })
        .should('be.visible')
        .type(usuario.senha)
        .should('have.value', usuario.senha);
  
      cy.get('#password-confirmation', { timeout: 10000 })
        .should('be.visible')
        .type(usuario.senha)
        .should('have.value', usuario.senha);
  
      // Submete o formulário de cadastro
      cy.get('.action.submit.primary').click();
  
      // Verifica se o cadastro foi realizado com sucesso
      cy.get('.messages', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Thank you for registering with');
    });
  });
  
