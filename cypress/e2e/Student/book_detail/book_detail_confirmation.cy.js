describe('Book Detail Confirmation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
        cy.contains('Search Book', { timeout: 10000 }).click();
    });

    it("Check system behavior when book's stock is available and borrowing book is confirmed", () => {
        cy.get('input[type="text"][id^=":r"]').type('2663854991');
        cy.contains('Find').click();
        cy.contains('Quia aut autem.').should('be.visible');
        cy.get('.MuiBox-root.css-kl1xo3').contains('Pinjam').click();
        cy.get('tr.MuiTableRow-root.css-f4jir').should('contain', 'Quia aut autem.')
            .and('contain', '2024-06-09')
            .and('contain', '2024-06-19')
            .and('contain', 'Available');
        cy.get('tr.MuiTableRow-root.css-f4jir').within(() => {
            cy.contains('Remove').should('be.visible');
            cy.contains('Extend').should('be.visible');
        });
    });

    it("Check system behavior when book's stock is not available and book reservation is confirmed", () => {
        cy.get('input[type="text"][id^=":r"]').type('5107068454');
        cy.contains('Find').click();
        cy.contains('Veritatis sint maiores aut.', { timeout: 10000 }).should('be.visible');
        cy.get('.MuiBox-root.css-kl1xo3').contains('Reservasi').click();
        cy.get('tr.MuiTableRow-root.css-f4jir').should('contain', 'Veritatis sint maiores aut.')
            .and('contain', '2024-06-09')
            .and('contain', '2024-06-19')
            .and('contain', 'Available');

        cy.get('tr.MuiTableRow-root.css-f4jir').within(() => {
            cy.contains('Remove').should('be.visible');
            cy.contains('Extend').should('be.visible').and('be.disabled');
        });
    });
});
