describe('Teste de Navegação pelo Menu "Gear" e seus Submenus', () => {
    // A URL do site será carregada antes de cada teste
    beforeEach(() => {
      cy.visit('https://magento.softwaretestingboard.com/');
      cy.wait(3000); // Aguarda a página carregar completamente
    });
  
    it('Abre o menu "Gear" e navega pelos submenus', () => {
      // Selecione o menu "Gear" e force o hover
      cy.get('a[href="https://magento.softwaretestingboard.com/gear.html"]')
        .trigger('mouseover', { force: true });
  
      // Aguarda o submenu aparecer e garante que ele está visível
      cy.get('.submenu').should('be.visible');
  
      // Clique no link do menu "Gear" para ir à página de Gear
      cy.get('a[href="https://magento.softwaretestingboard.com/gear.html"]')
        .click({ force: true });
  
      // Verifica se a URL mudou corretamente para a página de "Gear"
      cy.url().should('include', '/gear.html');
      cy.get('h1').should('contain', 'Gear');
  
      // Submenus do Gear
      const submenusGear = ['Bags', 'Fitness Equipment', 'Watches'];
      submenusGear.forEach((submenu) => {
        // Garante que o submenu esteja visível
        cy.get('.submenu').contains(submenu).click({ force: true });
  
        // Converte o submenu para a URL esperada
        const submenuUrlPart = submenu.toLowerCase().replace(/ /g, '-');
  
        // Verifica se a URL contém a parte relevante do submenu
        cy.url().should('include', submenuUrlPart);
  
        // Verifica que a página foi carregada corretamente
        cy.get('h1').should('contain', submenu);
  
        // Volta para a página "Gear" para continuar o loop
        cy.go('back');
      });
    });
  });
  
