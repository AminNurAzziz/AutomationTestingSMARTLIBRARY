describe('Return Book Feature', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
    });

    it('TC_RETURNBOOK_01: Test Basic Scan Button Functionality', () => {
        cy.contains('Return', { timeout: 10000 }).should('be.visible').click();
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"][id^=":r"]').type('KD-P51070684543Lj');
        cy.contains('Submit').click();

        cy.contains('KD-P51070684543Lj', { timeout: 10000 }).should('be.visible');
        cy.contains('dipinjam').should('be.visible');

        cy.get('.MuiButtonBase-root').contains('Return').click();

        cy.contains('Go Back', { timeout: 10000 }).should('be.visible').click();
    });

    it('TC_RETURNBOOK_02: Test Return Invalid Borrowed Code', () => {
        cy.contains('Return', { timeout: 10000 }).should('be.visible').click();
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"][id^=":r"]').type('KD-P51070684543LjA');
        cy.contains('Submit').click();

        cy.contains('Data borrowed books not found. Please try again.', { timeout: 10000 }).should('be.visible');
    });

});

function loginWithCorrectCredentials() {
    cy.get('#email').clear().type('admin@example.com');
    cy.get('#password').clear().type('password');
    cy.get('form').submit();
}

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


