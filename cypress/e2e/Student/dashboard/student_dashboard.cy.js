describe('Student Dashboard', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Enter Manually').click();
        cy.get('input[type="text"]').type('2141762034');
        cy.contains('Submit').click();
    });

    it('Check system behavior when displayed data is correct', () => {
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
});
