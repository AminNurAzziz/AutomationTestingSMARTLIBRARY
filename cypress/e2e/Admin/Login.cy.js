describe('Login Feature', () => {
    beforeEach(() => {
        cy.visit('/login'); // Visit the login page
    });

    it('TC_LOGIN_001: Enter the correct username and password', () => {
        cy.get('#email').type('admin@example.com'); // Enter the correct username
        cy.get('#password').type('password'); // Enter the correct password
        cy.get('form').submit(); // Submit the login form
        // Add assertion for successful login
    });

    it('TC_LOGIN_002: Enter an incorrect username and the correct password', () => {
        cy.get('#email').type('incorrect@example.com'); // Enter an incorrect username
        cy.get('#password').type('password'); // Enter the correct password
        cy.get('form').submit(); // Submit the login form
        // Add assertion for error message
    });

    it('TC_LOGIN_003: Enter the correct username and the wrong password', () => {
        cy.get('#email').type('admin@example.com'); // Enter the correct username
        cy.get('#password').type('wrongpassword'); // Enter the wrong password
        cy.get('form').submit(); // Submit the login form
        // Add assertion for error message
    });

    it('TC_LOGIN_004: Enter an incorrect username and an incorrect password', () => {
        cy.get('#email').type('incorrect@example.com'); // Enter an incorrect username
        cy.get('#password').type('wrongpassword'); // Enter the wrong password
        cy.get('form').submit(); // Submit the login form
        // Add assertion for error message
    });

    it('TC_LOGIN_005: Leave the username and password fields empty', () => {
        cy.get('form').submit(); // Submit the login form without entering username and password
        // Add assertion for error message
    });
});
