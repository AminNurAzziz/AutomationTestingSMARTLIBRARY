describe('Edit Regulation', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Regulation').click();
    });


    it("Check system behavior when regulation data is successfully changed", () => {
        cy.get('.MuiButtonBase-root').click();
        cy.contains('Edit Regulation').should('be.visible');
        cy.get('.modal-dialog').should('be.visible');
        cy.get('#max_loan_days').clear().type('10');
        cy.get('#max_loan_books').clear().type('60');
        cy.get('#max_reserve_books').clear().type('5');
        cy.get('#max_reserve_days').clear().type('3');
        cy.get('#fine_per_day').clear().type('1000.00');
        cy.get('button[type="submit"]').contains('Submit').click();
        cy.contains('Regulation data edited successfully').should('be.visible');
    });

    it("Check system behavior when regulation data is edited but some fields are left empty", () => {
        cy.get('.MuiButtonBase-root').click();
        cy.contains('Edit Regulation').should('be.visible');
        cy.get('.modal-dialog').should('be.visible');
        cy.get('#max_loan_days').clear();
        cy.get('#max_loan_books').clear();
        cy.get('#max_reserve_books').clear().type('5');
        cy.get('#max_reserve_days').clear().type('3');
        cy.get('#fine_per_day').clear();
        cy.get('button[type="submit"]').contains('Submit').click();
        cy.contains('Edit Regulation').should('be.visible');
        cy.contains('Failed to edit regulation data').should('be.visible');
        cy.url().should('include', '/regulation');
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
