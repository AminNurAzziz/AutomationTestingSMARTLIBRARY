describe('Student Authentication', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Enter Manually').click();
    });

    it('Check system behavior when student ID is entered correctly', () => {
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
        cy.contains('2141762034').should('be.visible');
    });

    it('Check system behavior when student ID is entered incorrectly', () => {
        cy.get('input[type="text"]').type('2141762034111');
        cy.contains('Submit').click();
        cy.contains('Data student not found. Please try again.').should('be.visible');
    });

    it('Check system behavior when student ID field is left empty', () => {
        cy.contains('Submit').click();
        cy.contains('Data student not found. Please try again.').should('be.visible');
    });
});
