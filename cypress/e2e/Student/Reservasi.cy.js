describe('Borrowing Feature', () => {
    beforeEach(() => {
        cy.visit('/'); // Ganti '/' dengan URL halaman utama Anda
    });

    it('TC_SCANKTM_001: Test Basic Scan Button Functionality', () => {
        cy.contains('Get Started').click();
        cy.contains('Reset').should('be.visible');
    });

    it('TC_SCANKTM_002: Test Reset Button Functionality', () => {
        cy.contains('Get Started').click();
        cy.contains('Reset').should('be.visible');
        cy.contains('Reset').click();
        cy.contains('Get Started').should('be.visible');
    });

    it('TC_SCANKTM_003: Test Manual Input and Submit', () => {
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
        cy.contains('2141762034').should('be.visible');
    });

    it('TC_IFOSTUDENT_001: Verify Correct Data Display After Successful Input', () => {
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();

        const studentData = {
            nim: '2141762034',
            name: 'Amin Nur Azziz',
            class: 'quam',
            major: 'quas'
        };

        cy.contains(studentData.nim).should('be.visible');
        cy.contains(studentData.name).should('be.visible');
        cy.contains(studentData.class).should('be.visible');
        cy.contains(studentData.major).should('be.visible');
    });

    it('TC_IFOSTUDENT_002: Search for a book and Reserve it', () => {
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
        cy.contains('Search Book', { timeout: 10000 }).click();
        cy.get('input[type="text"][id^=":r"]').type('2663854991');
        cy.contains('Find').click();
        cy.contains('Reservasi', { timeout: 10000 }).click();
        cy.get('tr.MuiTableRow-root.css-f4jir').should('contain', 'Quia aut autem.')
            .and('contain', '2024-06-05')
            .and('contain', '2024-06-15')
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


});
