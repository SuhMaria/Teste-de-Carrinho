describe('Teste de Cadastro Negativo - Email Inválido', () => {
    let userData;
  
    before(() => {
      // Faz uma requisição para gerar dados de um usuário aleatório
      cy.request('https://randomuser.me/api/').then((response) => {
        userData = response.body.results[0];
      });
    });
  
    beforeEach(() => {
      // Acessa diretamente a página de cadastro
      cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
      cy.wait(3000); // Aguarda o carregamento da página
    });
  
    it('Não deve permitir cadastro com email inválido "ryu.com.br"', () => {
      // Preenche o formulário com dados inválidos
      const emailInvalido = 'ryu.com.br'; // Email inválido
      const strongPassword = 'Test@1234!Secure'; // Senha válida
      cy.get('#firstname').type(userData.name.first); // Preenche o nome
      cy.get('#lastname').type(userData.name.last); // Preenche o sobrenome
      cy.get('#email_address').type(emailInvalido); // Preenche o email inválido
      cy.get('#password').type(strongPassword); // Preenche a senha
      cy.get('#password-confirmation').type(strongPassword); // Confirma a senha
  
      // Clica no botão de cadastro
      cy.contains('Create an Account').click(); // Clica no botão "Create an Account"
      
      // Aguarda a página carregar e verificar se o erro de email inválido é exibido
      cy.get('.mage-error').should('be.visible'); // Verifica se a mensagem de erro foi exibida
      cy.get('.mage-error').should('contain', 'Please enter a valid email address.'); // Verifica a mensagem específica de erro
    });
  });
  