describe('Borrowing Feature', () => {
    beforeEach(() => {
        cy.visit('/'); // Ganti '/scan-ktm' dengan URL halaman Scan KTM Anda
    });

    it('TC_SCANKTM_001: Test Basic Scan Button Functionality', () => {
        cy.contains('Get Started').click(); // Klik tombol 'Get Started'
        cy.contains('Reset').should('be.visible'); // Pastikan tombol 'Reset' terlihat setelah mengklik 'Get Started'
    });

    it('TC_SCANKTM_002: Test Reset Button Functionality', () => {
        cy.contains('Get Started').click(); // Klik tombol 'Get Started' untuk memulai pemindaian
        cy.contains('Reset').should('be.visible'); // Pastikan tombol 'Reset' terlihat setelah mengklik 'Get Started'
        cy.contains('Reset').click(); // Klik tombol 'Reset'
        cy.contains('Get Started').should('be.visible'); // Pastikan tombol 'Get Started' terlihat setelah mengklik 'Reset'
    });

    it('TC_SCANKTM_003: Test Manual Input and Submit', () => {
        cy.contains('Enter Manually').click(); // Klik tombol 'Enter Manually'
        cy.get('input[type="text"]').type('2141762034'); // Masukkan NIM secara manual
        cy.contains('Submit').click(); // Klik tombol 'Submit'
        cy.contains('2141762034').should('be.visible'); // Pastikan NIM yang dimasukkan muncul di halaman
    });

    it('TC_IFOSTUDENT_001: Verify Correct Data Display After Successful Scan', () => {
        // Pre-condition
        cy.contains('Get Started').click(); // Klik tombol 'Get Started' untuk memulai pemindaian
        cy.contains('Enter Manually').click(); // Klik tombol 'Enter Manually'

        // Test Steps
        cy.get('input[type="text"]').type('2141762034'); // Masukkan NIM secara manual
        cy.contains('Submit').click(); // Klik tombol 'Submit'

        // Test Data
        const studentData = {
            nim: '2141762034',
            name: 'Amin Nur Azziz',
            class: 'quam',
            major: 'quas'
        };

        // Expected Result
        cy.contains(studentData.nim).should('be.visible'); // Pastikan NIM yang dimasukkan muncul di halaman
        cy.contains(studentData.name).should('be.visible'); // Pastikan nama mahasiswa muncul di halaman
        cy.contains(studentData.class).should('be.visible'); // Pastikan kelas mahasiswa muncul di halaman
        cy.contains(studentData.major).should('be.visible'); // Pastikan jurusan mahasiswa muncul di halaman
    });
});

