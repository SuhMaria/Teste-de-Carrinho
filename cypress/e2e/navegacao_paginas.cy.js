describe('Teste de Navegação pelas Páginas do Site com Menus e Submenus', () => {
  // A URL do site será carregada antes de cada teste
  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/');
    cy.wait(3000); // Aguarda a página carregar completamente
  });

  it('Abre o menu "Women" e navega pelos submenus', () => {
    // Selecione o menu "Women" de forma mais específica e force o hover
    cy.get('a[href="https://magento.softwaretestingboard.com/women.html"]').trigger('mouseover', { force: true });

    // Força o submenu a ser exibido se estiver oculto
    cy.get('.submenu').should('be.visible').and('not.have.css', 'display', 'none'); // Verifica se o submenu está visível

    // Agora interage com o submenu "Tops"
    cy.get('.submenu').contains('Tops').click({ force: true }); // Garante que o submenu "Tops" esteja visível
    cy.url().should('include', '/women/tops'); // Verifica a URL correta para a página "Tops"
    cy.get('h1').should('contain', 'Tops'); // Verifica que a página "Tops" foi carregada

    // Agora navega pelos submenus de "Tops"
    const submenusTops = ['Jackets', 'Hoodies & Sweatshirts', 'Tees', 'Bras', 'Tanks'];
    submenusTops.forEach((submenu) => {
      // Garante que o submenu esteja visível
      cy.get('.submenu').contains(submenu).click({ force: true });

      // Ajuste para garantir que a navegação para "Hoodies & Sweatshirts" seja feita corretamente
      if (submenu === 'Hoodies & Sweatshirts') {
        cy.url().should('include', 'hoodies-and-sweatshirts'); // Verifica que a URL inclui "hoodies-and-sweatshirts"
      }
      // Para "Bras" e "Tanks" (que têm a mesma URL)
      else if (submenu === 'Bras' || submenu === 'Tanks') {
        cy.url().should('include', 'tanks'); // Verifica que a URL inclui "tanks", pois "Bras" e "Tanks" têm a mesma URL
      }
      else {
        const submenuUrlPart = submenu.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
        cy.url().should('include', submenuUrlPart); // Verifica que a URL contém a parte relevante do submenu
      }

      cy.get('h1').should('contain', submenu); // Verifica que a página foi carregada corretamente
      cy.go('back'); // Volta para a página "Tops" para continuar o loop
    });
    // Agora interage com o submenu "Bottoms"
    cy.get('.submenu').contains('Bottoms').click({ force: true }); // Garante que o submenu "Bottoms" esteja visível
    cy.url().should('include', '/women/bottoms'); // Verifica a URL correta para a página "Bottoms"
    cy.get('h1').should('contain', 'Bottoms'); // Verifica que a página "Bottoms" foi carregada

    // Agora navega pelos submenus de "Bottoms" - "Pants" e "Shorts"
    const submenusBottomsWomen = ['Pants', 'Shorts'];
    submenusBottomsWomen.forEach((submenu) => {
      // Garante que o submenu esteja visível
      cy.get('.submenu').contains(submenu).click({ force: true });

      const submenuUrlPart = submenu.toLowerCase().replace(/ /g, '-');
      cy.url().should('include', submenuUrlPart); // Verifica que a URL contém a parte relevante do submenu

      cy.get('h1').should('contain', submenu); // Verifica que a página foi carregada corretamente
      cy.go('back'); // Volta para a página "Bottoms" para continuar o loop
    });
  });

  
});