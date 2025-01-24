describe('Teste de Navegação no Menu "Men" e seus Submenus', () => {
    beforeEach(() => {
      cy.visit('https://magento.softwaretestingboard.com/');
      cy.wait(3000); // Aguarda a página carregar completamente
    });
  
    it('Abre o menu "Men" e navega pelos submenus', () => {
      // Passo 1: Navegar para o menu "Men"
      cy.visit('https://magento.softwaretestingboard.com/men.html');
      cy.url().should('include', '/men.html'); // Verifica que a URL é a correta
      cy.get('h1').should('contain', 'Men'); // Verifica que a página "Men" foi carregada
  
      // Passo 2: Navegar para o submenu "Tops"
      cy.visit('https://magento.softwaretestingboard.com/men/tops-men.html');
      cy.url().should('include', '/tops-men'); // Verifica que a URL é a correta
      cy.get('h1').should('contain', 'Tops'); // Verifica que a página "Tops" foi carregada
  
      // Passo 3: Navegar pelos submenus de "Tops"
      const submenusTops = [
        { name: 'Jackets', url: 'https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html' },
        { name: 'Hoodies & Sweatshirts', url: 'https://magento.softwaretestingboard.com/men/tops-men/hoodies-and-sweatshirts-men.html' },
        { name: 'Tees', url: 'https://magento.softwaretestingboard.com/men/tops-men/tees-men.html' },
        { name: 'Tanks', url: 'https://magento.softwaretestingboard.com/men/tops-men/tanks-men.html' }
      ];
  
      submenusTops.forEach((submenu) => {
        cy.visit(submenu.url); // Navega para o submenu
        cy.url().should('include', submenu.url.split('.com/')[1]); // Verifica que a URL é a correta
        cy.get('h1').should('contain', submenu.name); // Verifica que a página foi carregada
      });
  
      // Passo 4: Navegar para o submenu "Bottoms"
      cy.visit('https://magento.softwaretestingboard.com/men/bottoms-men.html');
      cy.url().should('include', '/bottoms-men'); // Verifica que a URL é a correta
      cy.get('h1').should('contain', 'Bottoms'); // Verifica que a página "Bottoms" foi carregada
  
      // Passo 5: Navegar pelos submenus de "Bottoms"
      const submenusBottoms = [
        { name: 'Pants', url: 'https://magento.softwaretestingboard.com/men/bottoms-men/pants-men.html' },
        { name: 'Shorts', url: 'https://magento.softwaretestingboard.com/men/bottoms-men/shorts-men.html' }
      ];
  
      submenusBottoms.forEach((submenu) => {
        cy.visit(submenu.url); // Navega para o submenu
        cy.url().should('include', submenu.url.split('.com/')[1]); // Verifica que a URL é a correta
        cy.get('h1').should('contain', submenu.name); // Verifica que a página foi carregada
      });
    });
  });
  