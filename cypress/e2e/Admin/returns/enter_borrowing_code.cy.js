describe('Enter Borrowing Code in Returns', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Return', { timeout: 10000 }).should('be.visible').click();
    });

    it("Check system behavior when borrowing-code is entered correctly", () => {
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"][id^=":r"]').type('KD-P2663854991tvR');
        cy.contains('Submit').click();

        cy.contains('KD-P2663854991tvR', { timeout: 10000 }).should('be.visible');
        cy.contains('dipinjam').should('be.visible');
    });

    it("Check system behavior when borrowing-code is entered incorrectly", () => {
        cy.contains('Get Started').click();
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"][id^=":r"]').type('InvalidCode');
        cy.contains('Submit').click();

        cy.contains('Data not found. Please try again.', { timeout: 10000 }).should('be.visible');
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
