describe('Teste de Navegação pelo Menu "Sale"', () => {
    beforeEach(() => {
      cy.visit('https://magento.softwaretestingboard.com/');
      cy.wait(3000); // Aguarda a página carregar completamente
    });
  
    it('Abre o menu "Sale" e valida a navegação', () => {
      // Verifica se o link "Sale" está visível antes de interagir com ele
      cy.get('a[href="https://magento.softwaretestingboard.com/sale.html"]')
        .should('be.visible') // Verifica se o link "Sale" está visível
        .trigger('mouseover', { force: true }) // Força o hover sobre o menu "Sale"
        .click({ force: true }); // Força o clique no menu "Sale"
  
      // Verifica se a URL mudou para a página de "Sale"
      cy.url().should('include', '/sale.html');
  
      // Verifica se a página de "Sale" foi carregada corretamente, com o título esperado
      cy.get('h1').should('contain', 'Sale');
    });
  });
  