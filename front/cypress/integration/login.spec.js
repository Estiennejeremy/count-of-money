describe('Test Login', () => {
    beforeEach(() => cy.visit('http://localhost:8080/signin'));
    it('types wrong login and password', () => {
        cy.get('[data-cy=text-username]').type('fake');
        cy.get('[data-cy=text-mdp]').type('fake');
        cy.get('[data-cy=btn-connexion]').click();
        cy.get('.form-error').contains('User not found');
    });

    it('types good login and password', () => {
        cy.get('[data-cy=text-username]').type('test');
        cy.get('[data-cy=text-mdp]').type('test');
        cy.get('[data-cy=btn-connexion]').click();
        cy.url().should('include', '/cryptos');
    });
});

describe('Test Logout', () => {
    beforeEach(() => cy.visit('http://localhost:8080/signin'));

    it('types good login and password', () => {
        cy.get('[data-cy=text-username]').type('test');
        cy.get('[data-cy=text-mdp]').type('test');
        cy.get('[data-cy=btn-connexion]').click();
        cy.url().should('include', '/cryptos');
        cy.get('[data-cy=profile-name]').contains('test');
        cy.get('[data-cy=btn-logout]').click();
        cy.url().should('include', '/signin');
    });
});