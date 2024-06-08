describe('Search Book', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
        cy.contains('Search Book', { timeout: 10000 }).click();
    });
    it("Check system behavior when book's searched by book code", () => {
        cy.get('input[type="text"][id^=":r"]').type('5107068454');
        cy.contains('Find').click();
        cy.contains('Veritatis sint maiores aut.').should('be.visible');
    });

    it("Check system behavior when book's searched by book title", () => {
        cy.get('input[type="text"][id^=":r"]').type('Veritatis sint maiores aut.');
        cy.contains('Find').click();
        cy.contains('Book not found. Please try again.').should('be.visible');
    });
});
