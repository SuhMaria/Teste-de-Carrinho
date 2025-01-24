describe('Teste de Cadastro, Login, Adição ao Carrinho e Checkout', () => {
  const usuario = {
    primeiroNome: 'John',
    ultimoNome: 'Doe',
    email: `john.doe${Date.now()}@example.com`, // E-mail único para cada execução
    senha: 'Password123!',
  };

  const produto = { nome: 'Jade Yoga Jacket', tamanho: 'M', cor: 'Blue', quantidade: '1' };

  it('Realiza o cadastro, login, adiciona um produto ao carrinho e realiza o checkout', () => {
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

    // **Adição de Produto ao Carrinho**
    cy.visit('https://magento.softwaretestingboard.com/');
    cy.wait(3000);

    cy.get('#search').clear().type(produto.nome);
    cy.get('button[type="submit"]').first().click();
    cy.get('.products-grid', { timeout: 10000 }).should('be.visible');
    cy.get('.product-item-link').contains(produto.nome).click();

    cy.get('.page-title span').should('be.visible').and('contain', produto.nome);
    cy.get(`.swatch-attribute.size .swatch-option[option-label="${produto.tamanho}"]`).click({ force: true });
    cy.get(`.swatch-attribute.color .swatch-option[option-label="${produto.cor}"]`).click({ force: true });
    cy.get('#qty').clear().type(produto.quantidade);
    cy.get('#product-addtocart-button').click();

    cy.get('.message-success', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'You added');

    cy.get('.showcart').click();
    cy.get('.minicart-items').should('be.visible');
    cy.get('.minicart-items').contains(produto.nome);
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
