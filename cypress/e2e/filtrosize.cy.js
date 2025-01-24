describe('Teste de Filtro de Size - Página de Tops (Women)', () => {
  beforeEach(() => {
    // Acessa a página de Tops (Women)
    cy.visit('https://magento.softwaretestingboard.com/women/tops-women.html');
    cy.wait(5000); // Aumenta o tempo de espera para garantir que a página carregue completamente
  });

  it('Deve aplicar filtro de Size', () => {
    // Aguarda e aplica o filtro de "Size"
    cy.get('.filter-options') // Localiza a seção de filtros
      .find('div.filter-options-title') // Localiza o filtro de "Size" pela classe 'filter-options-title'
      .contains('Size') // Verifica se contém o texto "Size"
      .should('be.visible') // Espera que o filtro de "Size" esteja visível
      .click(); // Clica na seta para abrir as opções

    // Aguarda o carregamento das opções de "Size" e tenta selecionar a opção "M"
    cy.get('.filter-options')
      .find('div.swatch-option') // Localiza as opções de tamanho, incluindo a opção "M"
      .contains('M') // Seleciona a opção "M"
      .click(); // Aplica o filtro de tamanho "M"
    
    // Verifica se os produtos filtrados são visíveis
    cy.get('.products-grid').should('be.visible');
    
    // Verifica que o filtro de "Size" foi aplicado corretamente no URL
    cy.url().should('include', 'size=168'); // Valor correto para "M"
    
    // Captura uma tela após aplicar o filtro de tamanho
    cy.screenshot('Filtro-Size-Tops-Women');
  });
});
