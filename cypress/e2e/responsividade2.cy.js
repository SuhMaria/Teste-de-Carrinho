describe('Teste de Responsividade no Mobile - Buscar e Adicionar Produto de Jackets ao Carrinho', () => {
    beforeEach(() => {
      // Acessa a loja e aguarda o carregamento da página
      cy.visit('https://magento.softwaretestingboard.com/');
      cy.wait(3000); // Aguarda o carregamento da página
      cy.viewport(375, 667); // Configura para a tela de um iPhone SE (mobile)
    });
  
    it('Deve buscar por "Jackets", selecionar um produto e adicionar ao carrinho', () => {
      // Verifica se o campo de busca está visível
      cy.get('input#search').should('be.visible');
  
      // Clica no campo de busca e digita "Jackets"
      cy.get('input#search').click().type('Jackets');
  
      // Clica no botão de busca
      cy.get('button.action.search').click();
  
      // Aguarda a página de resultados e verifica se os produtos estão visíveis
      cy.get('.products-grid').should('be.visible');
  
      // Seleciona o primeiro produto da categoria "Jackets" (ajustar o seletor, se necessário)
      cy.get('.product-item').first().click();
  
      // Aguarda a página do produto carregar
      cy.get('button.add-to-cart').should('be.visible');
  
      // Clica no botão de "Adicionar ao Carrinho"
      cy.get('button.add-to-cart').click();
  
      // Verifica se a notificação de sucesso aparece indicando que o item foi adicionado ao carrinho
      cy.get('.message-success').should('be.visible').and('contain', 'You added');
  
      // Verifica se o botão de carrinho está visível
      cy.get('.action.showcart').should('be.visible');
  
      // Verifica se o nome do item adicionado aparece no carrinho
      cy.get('.minicart-wrapper').should('contain', 'Jacket'); // Ajuste o nome do produto conforme necessário
  
      // Captura uma imagem do carrinho após a adição do produto
      cy.screenshot('Carrinho-Produto-Jackets-Mobile');
    });
  });
  