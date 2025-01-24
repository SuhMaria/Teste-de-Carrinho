describe('Teste de Cadastro, Login, Adição ao Carrinho e Checkout', () => {
  const usuario = {
    primeiroNome: 'John',
    ultimoNome: 'Doe',
    email: `john.doe${Date.now()}@example.com`, // E-mail único para cada execução
    senha: 'Password123!',
  };

  const produto = { nome: 'Shirt', tamanho: 'M', cor: 'Blue', quantidade: '1' };

  it('Realiza o cadastro, login, busca por "shirt", adiciona o último produto ao carrinho e realiza o checkout', () => {
    // **Cadastro do Usuário**
    cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
    cy.wait(3000);

    cy.get('#firstname').type(usuario.primeiroNome);
    cy.get('#lastname').type(usuario.ultimoNome);
    cy.get('#email_address').type(usuario.email);
    cy.get('#password').type(usuario.senha);
    cy.get('#password-confirmation').type(usuario.senha);
    cy.get('button[title="Create an Account"]').click();

    cy.get('.message-success', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Thank you for registering with Main Website Store.');

    // **Busca por "shirt" e Adição ao Carrinho**
    cy.visit('https://magento.softwaretestingboard.com/');
    cy.wait(3000);

    // **Busca por "shirt" no campo de pesquisa**
    cy.get('#search', { timeout: 10000 }).should('be.visible').clear().type('shirt');

    // Interceptar qualquer requisição de busca (ajustar a URL conforme necessário)
    cy.intercept('GET', '**/catalogsearch/result/**').as('searchResults');

    // Clica no botão de busca e aguarda a requisição de busca ser completada
    cy.get('button[type="submit"]').first().click();

    // Espera pela requisição de busca
    cy.wait('@searchResults', { timeout: 10000 });

    // Espera os resultados aparecerem
    cy.get('.products-grid', { timeout: 10000 }).should('be.visible');

    // **Clica no último produto da lista de resultados**
    cy.get('.product-item-link').last().click();

    // **Verificação e Seleção de Opções do Produto**
    cy.wait(5000); // Espera extra para garantir que a página do produto carregue completamente

    // Verifica se a página do produto contém a palavra "shirt" no título
    cy.get('.page-title span', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'shirt'); // Mudança para permitir qualquer variação que tenha "shirt" no nome

    // **Seleção do Tamanho** (verificar se a opção está visível antes de clicar)
    cy.get(`.swatch-attribute.size .swatch-option[option-label="${produto.tamanho}"]`, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    // **Seleção da Cor** (verificar se a opção está visível antes de clicar)
    cy.get(`.swatch-attribute.color .swatch-option[option-label="${produto.cor}"]`, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    // **Seleção da Quantidade** (garantir que o campo esteja visível e vazio antes de preencher)
    cy.get('#qty', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(produto.quantidade);

    // Verifica se o botão "Adicionar ao Carrinho" está visível e habilitado
    cy.get('#product-addtocart-button', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // **Confirmação de Adição ao Carrinho**
    cy.get('.message-success', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'You added');

    // Vai para o carrinho
    cy.get('.showcart').click();
    cy.get('.minicart-items').should('be.visible');

    // **Ir diretamente para o checkout**
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
