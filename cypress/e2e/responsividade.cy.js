describe('Teste de Responsividade do Site', () => {
  const viewports = [
    { device: 'Desktop', width: 1366, height: 768 },
    { device: 'Tablet (Portrait)', width: 768, height: 1024 },
    { device: 'Mobile (iPhone SE)', width: 375, height: 667 },
    { device: 'Widescreen', width: 1920, height: 1080 },
  ];

  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/');
    cy.wait(3000); // Aguarda o carregamento da página
  });

  viewports.forEach((viewport) => {
    it(`Teste de responsividade no ${viewport.device}`, () => {
      // Configura a viewport
      cy.viewport(viewport.width, viewport.height);

      // Valida o layout principal
      cy.get('header').should('be.visible'); // O cabeçalho deve estar visível
      cy.get('footer').should('be.visible'); // O rodapé deve estar visível

      // Valida o menu principal
      if (viewport.width >= 768) {
        // Menu completo para telas maiores (Desktop/Tablet)
        cy.get('.nav-sections').should('be.visible');
        cy.get('input#search').should('be.visible'); // Campo de busca visível diretamente
      } else {
        // Menu hambúrguer para telas menores (Mobile)
        cy.get('.nav-toggle').should('be.visible').click(); // Abre o menu
        cy.get('.nav-sections').should('be.visible'); // Valida que o menu foi aberto

        // Não precisamos mais validar o campo de busca, focamos apenas no menu
      }

      // Valida o botão do carrinho
      cy.get('.action.showcart').should('be.visible');

      // Captura um screenshot para análise visual
      cy.screenshot(`Responsividade-${viewport.device}`);
    });
  });
});
