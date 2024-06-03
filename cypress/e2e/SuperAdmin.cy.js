describe('Superadmin Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login') // Kunjungi halaman login
  })

  it('successfully logs in', () => {
    cy.get('input[id="email"]').type('superadmin@example.com') // Isi dengan email superadmin
    cy.get('input[id="password"]').type('password') // Isi dengan password superadmin
    cy.get('button[type="submit"]').click() // Klik tombol login

    cy.contains('Successfully logged in').should('be.visible') // Pastikan pesan berhasil login ditampilkan
    // Setelah berhasil login, pastikan pengguna diarahkan ke halaman dashboard
    cy.location('pathname').should('eq', '/dashboard')

  })

  it('displays error message on incorrect credentials', () => {
    cy.get('input[id="email"]').type('wrongemail@example.com') // Isi dengan email yang salah
    cy.get('input[id="password"]').type('wrongpassword') // Isi dengan password yang salah
    cy.get('button[type="submit"]').click() // Klik tombol login

    // Pastikan pesan kesalahan ditampilkan
    cy.contains('Email or password is incorrect').should('be.visible')
  })
})
