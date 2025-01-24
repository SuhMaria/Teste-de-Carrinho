describe('Teste de Navegação pelo Menu "Training" e Submenu "Video Download"', () => {
    // A URL do site será carregada antes de cada teste
    beforeEach(() => {
      cy.visit('https://magento.softwaretestingboard.com/');
      cy.wait(3000); // Aguarda a página carregar completamente
    });
  
    it('Abre o menu "Training" e navega pelo submenu "Video Download"', () => {
      // Selecione o menu "Training" e force o hover
      cy.get('a[href="https://magento.softwaretestingboard.com/training.html"]')
        .trigger('mouseover', { force: true });
  
      // Aguarda o submenu aparecer e garante que ele está visível
      cy.get('.submenu').should('be.visible');
  
      // Clique no link do menu "Training" para ir à página de treinamento
      cy.get('a[href="https://magento.softwaretestingboard.com/training.html"]')
        .click({ force: true });
  
      // Verifica se a URL mudou corretamente para a página de "Training"
      cy.url().should('include', '/training.html');
      cy.get('h1').should('contain', 'Training');
  
      // Agora, interage com o submenu "Video Download"
      cy.get('.submenu').contains('Video Download').click({ force: true });
  
      // Verifica se a URL mudou para a página do "Video Download"
      cy.url().should('include', '/training/training-video.html');
      cy.get('h1').should('contain', 'Training Video');
    });
  });
  