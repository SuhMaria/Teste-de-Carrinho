describe('Teste de Cadastro e Login de Usuário', () => {
    const usuario = {
      primeiroNome: 'John',
      ultimoNome: 'Doe',
      email: `john.doe${Date.now()}@example.com`, // Usa um e-mail único para cada execução
      senha: 'Password123!',
    };
  
    it('Realiza o cadastro, faz logout e, em seguida, o login com a conta criada', () => {
      // Acessa a página de cadastro
      cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
      cy.wait(3000);
  
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
      cy.get('button[title="Create an Account"]').click();
  
      // Verifica se o cadastro foi bem-sucedido
      cy.get('.message-success', { timeout: 10000 })
        .should('be.visible')
        .and('contain', `Thank you for registering with Main Website Store.`);
  
      // Logout após o cadastro
      cy.get('.header.links').contains('Sign Out', { timeout: 10000 }).click({ force: true }); // Força o clique
  
      cy.wait(3000);
  
      // Acessa a página de login
      cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');
      cy.wait(3000);
  
      // Realiza o login
      cy.get('#email', { timeout: 10000 })
        .should('be.visible')
        .type(usuario.email)
        .should('have.value', usuario.email);
  
      cy.get('#pass', { timeout: 10000 })
        .should('be.visible')
        .type(usuario.senha)
        .should('have.value', usuario.senha);
  
      cy.get('#send2').click();
  
      // Aguarda um tempo para garantir que a página tenha carregado completamente
      cy.wait(3000); 
    });
  });
  