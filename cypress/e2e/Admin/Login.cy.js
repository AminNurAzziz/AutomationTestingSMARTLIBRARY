describe('Login Feature', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('TC_LOGIN_001: Enter the correct username and password', () => {
        cy.get('#email').type('admin@example.com');
        cy.get('#password').type('password');
        cy.get('form').submit();
    });

    it('TC_LOGIN_002: Enter an incorrect username and the correct password', () => {
        cy.get('#email').type('incorrect@example.com');
        cy.get('#password').type('password');
        cy.get('form').submit();
    });

    it('TC_LOGIN_003: Enter the correct username and the wrong password', () => {
        cy.get('#email').type('admin@example.com');
        cy.get('#password').type('wrongpassword');
        cy.get('form').submit();
    });

    it('TC_LOGIN_004: Enter an incorrect username and an incorrect password', () => {
        cy.get('#email').type('incorrect@example.com');
        cy.get('#password').type('wrongpassword');
        cy.get('form').submit();
    });

    it('TC_LOGIN_005: Leave the username and password fields empty', () => {
        cy.get('form').submit();
    });
});
