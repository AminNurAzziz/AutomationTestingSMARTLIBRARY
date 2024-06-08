describe('Logout', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
    });
    it('Check system behavior when user logout successfully', () => {
        cy.contains('Logout').click();
        cy.url().should('include', '/');
    });
});
