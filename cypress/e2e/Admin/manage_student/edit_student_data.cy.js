describe('Edit Student Data', () => {
    beforeEach(() => {
        cy.visit('/login');
        loginWithCorrectCredentials();
        cy.contains('Manage Student').click();
        cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('svg[data-testid="EditIcon"]').parent().first().click();
        cy.contains('Edit Student').should('be.visible');
        cy.get('.modal-dialog').should('be.visible');
    });

    it("Check system behavior when student data is successfully changed", () => {
        cy.get('#formName').clear().type('Amin Nur Azziz');
        cy.get('#formEmail').clear().type('2131710034@student.polinema.ac.id');
        cy.contains('Save Changes').click();
        cy.contains('Data successfully updated').should('be.visible');
    });

    it("Check system behavior when student data is edited but some fields are left empty", () => {

        cy.get('#formName').clear()
        cy.get('#formMajor').clear()
        cy.get('#formClass').clear()
        cy.get('#formEmail').clear()

        cy.get('#formName').should('have.value', '')
        cy.get('#formMajor').should('have.value', '')
        cy.get('#formClass').should('have.value', '')
        cy.get('#formEmail').should('have.value', '')

        cy.contains('Save Changes').click();
        cy.contains('Edit Student').should('be.visible');
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
