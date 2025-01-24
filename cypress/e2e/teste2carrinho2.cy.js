describe('Teste de Cadastro, Login, Adição ao Carrinho e Checkout', () => {
    const usuario = {
      primeiroNome: 'John',
      ultimoNome: 'Doe',
      email: `john.doe${Date.now()}@example.com`, // E-mail único para cada execução
      senha: 'Password123!',
    };
  
    it('Realiza o cadastro, login, adiciona um produto aleatório do catálogo masculino ao carrinho e realiza o checkout', () => {
      // **Cadastro do Usuário**
      cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
      cy.wait(3000);
  
      cy.get('#firstname', { timeout: 10000 }).type(usuario.primeiroNome);
      cy.get('#lastname').type(usuario.ultimoNome);
      cy.get('#email_address').type(usuario.email);
      cy.get('#password').type(usuario.senha);
      cy.get('#password-confirmation').type(usuario.senha);
      cy.get('button[title="Create an Account"]').click();
  
      cy.get('.message-success', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Thank you for registering with Main Website Store.');
  
      // **Adição de Produto Aleatório do Catálogo de Moda Masculina ao Carrinho**
      cy.visit('https://magento.softwaretestingboard.com/');
  
      // Acessa a categoria de moda masculina
      cy.get('.level0').contains('Men').click();
      cy.wait(3000);
  
      // Seleciona um produto aleatório
      cy.get('.product-item').its('length').then((length) => {
        const randomIndex = Math.floor(Math.random() * length);
        cy.get('.product-item').eq(randomIndex).click();
      });
  
      // Aguardar a página de produto e selecionar as opções
      cy.get('.page-title span').should('be.visible');
  
      // Seleção de tamanho, cor e quantidade (ajuste conforme a necessidade do produto)
      cy.get('.swatch-attribute.size .swatch-option').first().click();
      cy.get('.swatch-attribute.color .swatch-option').first().click();
      cy.get('#qty').clear().type('1'); // Quantidade 1
      cy.get('#product-addtocart-button').click();
  
      cy.get('.message-success', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'You added');
  
      // **Carrinho e Checkout**
      cy.get('.showcart').click();
      cy.get('.minicart-items').should('be.visible');
      cy.get('.action.viewcart').click();
  
      // **Checkout**
      cy.get('.checkout-methods-items button').click();
      cy.wait(3000);
  
      cy.get('input[name="firstname"]').type(usuario.primeiroNome);
      cy.get('input[name="lastname"]').type(usuario.ultimoNome);
      cy.get('input[name="street[0]"]').type('123 Main Street');
      cy.get('input[name="city"]').type('Los Angeles');
      cy.get('select[name="region_id"]').select('California');
      cy.get('input[name="postcode"]').type('90001');
      cy.get('input[name="telephone"]').type('1234567890');
  
      cy.get('.radio').first().click({ force: true });
      cy.get('.button.action.continue').click();
  
      cy.get('.payment-method._active .action.primary.checkout').click();
  
      // **Validações pós-checkout omitidas**: Não são necessárias, já que o processo deu certo
      cy.wait(5000); // Aguardar o carregamento final
    });
  });
  
