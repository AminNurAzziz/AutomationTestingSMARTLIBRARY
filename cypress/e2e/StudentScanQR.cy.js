describe('QRScanner Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/'); // Assuming your component is rendered at the root route
  });

  it('Scans QR Code Successfully', () => {
    cy.get('video').should('be.visible'); // Check if video element is visible
    cy.get('button').contains('Get Started').click(); // Click on Get Started button to start scanning

    // Assuming QR code scanning is successful and data is fetched
    cy.wait(2000); // Wait for data fetching

    // Check if the loading spinner disappears
    cy.get('.CircularProgress').should('not.exist');

    // Assuming scan result is displayed on the page
    cy.contains('Scan result').should('be.visible');
  });

  it('Resets QR Scanner', () => {
    cy.get('button').contains('Get Started').click(); // Start scanning
    cy.wait(1000); // Wait for scanning to start

    cy.get('button').contains('Reset').click(); // Click on Reset button

    // Check if the video element disappears after reset
    cy.get('video').should('not.exist');
  });
});
