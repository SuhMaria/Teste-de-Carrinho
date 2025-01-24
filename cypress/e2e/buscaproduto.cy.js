describe('Teste de Busca de Produtos', () => {
    beforeEach(() => {
      cy.visit('https://magento.softwaretestingboard.com/');
      cy.wait(3000); // Aguarda a página carregar completamente
    });
  
    const produtosExistentes = ['Jackets', 'Hoodies and Sweatshirts', 'Pants', 'Tees'];
    const produtosInexistentes = ['Jaquetas', 'Saias', 'Snow', 'Calça'];
  
    produtosExistentes.forEach((produtoBusca) => {
      it(`Busca por um produto existente: ${produtoBusca} e verifica os resultados`, () => {
        cy.get('#search')  // Selecione o campo de busca pelo id
          .clear()
          .type(produtoBusca)  // Digita o nome do produto
          .should('have.value', produtoBusca);  // Verifica se o valor foi digitado corretamente
  
        // Seleciona o botão de pesquisa específico e clica nele
        cy.get('button[type="submit"]').first().click();  // Clica no primeiro botão encontrado (garante que é único)
  
        // Espera um tempo maior para a página de resultados carregar
        cy.wait(5000); // Aumenta o tempo de espera
  
        // Captura a URL real após a pesquisa
        cy.url().then((url) => {
          // Verifica se a URL inclui a parte relevante da pesquisa, aceitando o caractere '+' em vez de espaços
          const produtoBuscaFormatado = produtoBusca.toLowerCase().replace(/\s+/g, '+');
          expect(url.toLowerCase()).to.include(`catalogsearch/result/?q=${produtoBuscaFormatado}`);
        });
  
        // Verifica se a grade de produtos está visível
        cy.get('.products-grid').should('be.visible');  // Verifica se a grade de produtos está visível
        cy.get('.product-item').should('have.length.greaterThan', 0);  // Verifica se há mais de um produto nos resultados
  
        // Verifica se o título da página contém a palavra do produto buscado
        cy.get('h1').should('contain', produtoBusca);
      });
    });
  
    produtosInexistentes.forEach((produtoBusca) => {
      it(`Busca por um produto inexistente: ${produtoBusca} e verifica a ausência de resultados`, () => {
        cy.get('#search')  // Selecione o campo de busca pelo id
          .clear()
          .type(produtoBusca)  // Digita o nome do produto
          .should('have.value', produtoBusca);  // Verifica se o valor foi digitado corretamente
  
        // Seleciona o botão de pesquisa específico e clica nele
        cy.get('button[type="submit"]').first().click();  // Clica no primeiro botão encontrado (garante que é único)
  
        // Espera um tempo maior para a página de resultados carregar
        cy.wait(5000); // Aumenta o tempo de espera
  
        // Captura a URL real após a pesquisa
        cy.url().then((url) => {
          // Verifica se a URL inclui a parte relevante da pesquisa, aceitando o caractere '+' em vez de espaços
          const produtoBuscaFormatado = produtoBusca.toLowerCase().replace(/\s+/g, '+');
          expect(url.toLowerCase()).to.include(`catalogsearch/result/?q=${produtoBuscaFormatado}`);
        });
  
        // Verifica se a mensagem de "nenhum produto encontrado" está visível
        cy.get('.no-results', { timeout: 10000 }).should('be.visible');
      });
    });
  });
  