describe('Book Reservation Code', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
        cy.contains('Search Book', { timeout: 10000 }).click();
    });

    it('Check system behavior when book reservation code is entered correctly', () => {
        cy.get('input[type="text"][id^=":r"]').type('5107068454');
        cy.contains('Find').click();
        cy.contains('Veritatis sint maiores aut.', { timeout: 10000 }).should('be.visible');
        cy.get('.MuiBox-root.css-kl1xo3').contains('Reservasi').click();
        cy.get('tr.MuiTableRow-root.css-f4jir').should('contain', 'Veritatis sint maiores aut.')
            .and('contain', '2024-06-08')
            .and('contain', '2024-06-18')
            .and('contain', 'Available');

        cy.get('tr.MuiTableRow-root.css-f4jir').within(() => {
            cy.contains('Remove').should('be.visible');
            cy.contains('Extend').should('be.visible').and('be.disabled');
        });

        cy.contains('Pinjam Buku').click();
        cy.contains('STRUK PEMINJAMAN', { timeout: 10000 }).should('be.visible');
        cy.contains('Selesai').click();
        cy.contains('Go Back').click();
    });

    it('Check system behavior when book reservation code is entered incorrectly', () => {
        cy.get('input[type="text"][id^=":r"]').type('5107068455ss');
        cy.contains('Find').click();
        cy.contains('Book not found. Please try again.', { timeout: 10000 }).should('be.visible');
    });
});
