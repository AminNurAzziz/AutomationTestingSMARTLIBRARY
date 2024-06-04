describe('Dashboard Page', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it('Displays the dashboard with correct data', () => {
        cy.get('.container-fluid').should('be.visible');

        // Verifikasi informasi dashboard
        cy.contains('Student Borrow').should('be.visible');
        cy.contains('Borrowing').should('be.visible');
        cy.contains('Book Available').should('be.visible');
        cy.contains('Fine').should('be.visible');


        // Verifikasi chart Monthly Borrowing Trend
        cy.contains('Monthly Borrowing Trend').should('be.visible');
        cy.get('.chart-area').should('be.visible');

        // Verifikasi chart Most Borrowed Books
        cy.contains('Most Borrowed Books').should('be.visible');
        cy.get('.chart-pie').should('be.visible');
    });
});

describe('Report Download', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it('Exports the dashboard data to Excel', () => {
        cy.get('.navbar').contains('Export to Excel').click();
        cy.wait(2000); // Tunggu hingga unduhan selesai

        // Verifikasi bahwa file Excel diunduh
        cy.readFile('cypress/downloads/monthly_borrowing_trend.xlsx').should('exist');
    });

    it('Exports the dashboard data to PDF', () => {
        cy.get('.navbar').contains('Export to PDF').click();
        cy.wait(2000); // Tunggu hingga unduhan selesai

        // Verifikasi bahwa file PDF diunduh
        cy.readFile('cypress/downloads/Laporan Trend Peminjaman.pdf').should('exist');
    });
});

describe('Sidebar Navigation', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it('Navigates to the Dashboard page', () => {
        cy.get('.nav-link').contains('Dashboard').click();
        // cy.url().should('include', '/dashboard');
    });

    it('Navigates to the Manage Borrowing page', () => {
        cy.contains('Manage Borrowing').click();
        // cy.url().should('include', '/
    });


    it('Navigates to the Student page', () => {
        cy.contains('Manage Student').click();
        // cy.url().should('include', '/student');
    });

    it('Navigates to the Regulation page', () => {
        cy.contains('Regulation').click();
        // cy.url().should('include', '/user');
    });

    it('Navigates to the Return page', () => {
        cy.contains('Return').click();
        // cy.url().should('include', '/user');
    });

    it('Navigates to the Borrwing page', () => {
        cy.contains('Borrowing').click();
        // cy.url().should('include', '/user');
    });
});

describe('Manage Borrowing Book', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Manage Borrowing').click();
    });

    it('Deletes a book from borrowing list', () => {
        // Tunggu hingga data berhasil diambil dan ditampilkan
        cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);

        // Klik tombol delete pada buku yang ingin dihapus
        cy.get('.btn.btn-danger.ml-2').first().click();

        // Verifikasi bahwa ikon delete terlihat
        cy.get('svg[data-testid="DeleteIcon"]').should('be.visible');

        // Klik pada ikon delete untuk menghapus buku
        cy.get('.modal-footer').contains('Yes, Delete').click();

        // Verifikasi bahwa snackbar sukses ditampilkan
        cy.contains('Borrowing record successfully deleted').should('be.visible');
    });

    it('Download the borrowing list to Excel', () => {
        cy.get('.btn.btn-success').click();
        cy.wait(2000); // Tunggu hingga unduhan selesai

        // Verifikasi bahwa file Excel diunduh
        cy.readFile('cypress/downloads/HistoryPeminjaman.xlsx').should('exist');
    });

    it('Download the borrowing list to PDF', () => {
        cy.contains('Download PDF').click();
        cy.wait(2000); // Tunggu hingga unduhan selesai

        // Verifikasi bahwa file PDF diunduh
        cy.readFile('cypress/downloads/HistoryPeminjaman.pdf').should('exist');
    });
});

describe('Manage Student', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Manage Student').click();
    });

    it('Deletes a student from the list', () => {
        // Tunggu hingga data berhasil diambil dan ditampilkan
        cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);

        // Klik tombol delete pada student yang ingin dihapus
        cy.get('.btn.btn-danger.ml-2').first().click();

        // Verifikasi bahwa ikon delete terlihat
        cy.get('svg[data-testid="DeleteIcon"]').should('be.visible');

        // Klik pada ikon delete untuk menghapus student
        cy.get('.modal-footer').contains('Yes, Delete').click();

        // Verifikasi bahwa snackbar sukses ditampilkan
        cy.contains('Student successfully deleted').should('be.visible');
    });

    it('Edits a student from the list', () => {
        // Tunggu hingga data berhasil diambil dan ditampilkan
        cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);

        // Klik tombol edit pada student yang ingin diubah
        cy.get('svg[data-testid="EditIcon"]').parent().first().click();

        // Tunggu hingga judul modal muncul
        cy.contains('Edit Student').should('be.visible');

        // Verifikasi bahwa form edit student terlihat
        cy.get('.modal-dialog').should('be.visible');

        // Ubah data student
        cy.get('#formName').clear().type('John Doe');
        cy.get('#formEmail').clear().type('edit@gmail.com');

        // Submit form edit student
        cy.contains('Save Changes').click();

        // Verifikasi bahwa snackbar sukses ditampilkan
        cy.contains('Data successfully updated').should('be.visible');
    });

    // it('Download the student list to Excel', () => {
    //     cy.get('.btn.btn-success').click();
    //     cy.wait(2000); // Tunggu hingga unduhan selesai

    //     // Verifikasi bahwa file Excel diunduh
    //     cy.readFile('cypress/downloads/StudentList.xlsx').should('exist');
    // });

    // it('Download the student list to PDF', () => {
    //     cy.contains('Download PDF').click();
    //     cy.wait(2000); // Tunggu hingga unduhan selesai

    //     // Verifikasi bahwa file PDF diunduh
    //     cy.readFile('cypress/downloads/StudentList.pdf').should('exist');
    // });
});

describe('Manage Regulation', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Regulation').click();
    });

    it('Edits the regulation', () => {
        // Tunggu hingga data berhasil diambil dan ditampilkan
        cy.get('.MuiButtonBase-root').click();

        // Tunggu hingga judul modal muncul
        cy.contains('Edit Regulation').should('be.visible');

        // Verifikasi bahwa form edit regulation terlihat
        cy.get('.modal-dialog').should('be.visible');

        // Ubah data regulation
        cy.get('#max_loan_days').clear().type('10');
        cy.get('#max_loan_books').clear().type('60');
        cy.get('#max_reserve_books').clear().type('5');
        cy.get('#max_reserve_days').clear().type('3');
        cy.get('#fine_per_day').clear().type('1000.00');

        // Submit form edit regulation
        cy.get('button[type="submit"]').contains('Submit').click();

        // Verifikasi bahwa snackbar sukses ditampilkan
        cy.contains('Regulation data edited successfully').should('be.visible');
    });
});



function loginWithCorrectCredentials() {
    cy.get('#email').clear().type('admin@example.com');
    cy.get('#password').clear().type('password');
    cy.get('form').submit();
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent the error from failing the test
    return false;
});
