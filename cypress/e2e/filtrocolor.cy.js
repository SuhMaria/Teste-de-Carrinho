describe('Teste de Filtro de Color - Página de Tops (Women)', () => {
    beforeEach(() => {
      // Acessa a página de Tops (Women)
      cy.visit('https://magento.softwaretestingboard.com/women/tops-women.html');
      cy.wait(5000); // Aumenta o tempo de espera para garantir que a página carregue completamente
    });
  
    it('Deve aplicar filtro de Color', () => {
      // Aguarda e aplica o filtro de "Color"
      cy.get('.filter-options') // Localiza a seção de filtros
        .find('div.filter-options-title') // Localiza o filtro de "Color" pela classe 'filter-options-title'
        .contains('Color') // Verifica se contém o texto "Color"
        .should('be.visible') // Espera que o filtro de "Color" esteja visível
        .click(); // Clica na seta para abrir as opções
  
      // Aguarda o carregamento das opções de "Color" e tenta selecionar a cor "Blue"
      cy.get('.filter-options')
        .find('div.swatch-option.color') // Localiza as opções de cor
        .filter('[style="background: #1857f7 no-repeat center; background-size: initial;"]') // Filtra pela cor azul no fundo
        .click(); // Aplica o filtro de cor "Blue"
      
      // Verifica se os produtos filtrados são visíveis
      cy.get('.products-grid').should('be.visible');
      
      // Verifica que o filtro de "Color" foi aplicado corretamente no URL
      cy.url().should('include', 'color=50'); // Valor correto para "Blue" no filtro
      
      // Captura uma tela após aplicar o filtro de cor
      cy.screenshot('Filtro-Color-Tops-Women');
    });
  });
  