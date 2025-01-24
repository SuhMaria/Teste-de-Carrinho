describe('Teste de Navegação pelo Menu "What\'s New"', () => {
    // A URL do site será carregada antes de cada teste
    beforeEach(() => {
      cy.visit('https://magento.softwaretestingboard.com/');
      cy.wait(3000); // Aguarda a página carregar completamente
    });
  
    it('Abre o menu "What\'s New" e navega para a página', () => {
      // Selecione o link "What\'s New" diretamente
      cy.get('a[href="https://magento.softwaretestingboard.com/what-is-new.html"]')
        .click({ force: true }); // Clica no link para abrir a página de "What\'s New"
  
      // Verifica se a URL foi alterada corretamente para a página de "What\'s New"
      cy.url().should('include', '/what-is-new.html');
      
      // Verifica se a página contém o título esperado "What\'s New"
      cy.get('h1').should('contain', 'What\'s New');
    });
  });
  