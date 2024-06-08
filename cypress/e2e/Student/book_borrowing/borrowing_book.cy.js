describe('Borrowing Book', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
        cy.contains('Search Book', { timeout: 10000 }).click();
        cy.get('input[type="text"][id^=":r"]').type('2663854991');
        cy.contains('Find').click();
        cy.contains('Quia aut autem.').should('be.visible');
        cy.get('.MuiBox-root.css-kl1xo3').contains('Pinjam').click();
    });

    it('Check system when book is confirmed to borrow', () => {
        cy.get('tr.MuiTableRow-root.css-f4jir').eq(0)
            .should('contain', 'Quia aut autem.')
            .and('contain', '2024-06-08')
            .and('contain', '2024-06-18')
            .and('contain', 'Available');
        cy.get('tr.MuiTableRow-root.css-f4jir').eq(0)
            .within(() => {
                cy.contains('Remove').should('be.visible');
                cy.contains('Extend').should('be.visible');
            });
        cy.contains('Pinjam Buku').click();
        cy.contains('STRUK PEMINJAMAN', { timeout: 10000 }).should('be.visible');
        cy.contains('Selesai').click();
        cy.contains('Go Back').click();
    });

    it('Check system behavior when borrowing book is canceled', () => {
        cy.get('tr.MuiTableRow-root.css-f4jir').eq(1)
            .should('contain', 'Quia aut autem.')
            .and('contain', '2024-06-08')
            .and('contain', '2024-06-18')
            .and('contain', 'Available');
        cy.get('tr.MuiTableRow-root.css-f4jir').eq(1)
            .within(() => {
                cy.contains('Remove').should('be.visible');
                cy.contains('Extend').should('be.visible');
            });
        cy.contains('Remove').click();
        cy.get('tr.MuiTableRow-root.css-f4jir').eq(1).should('not.exist');
    });
});
