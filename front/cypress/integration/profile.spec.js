describe('Test profile', () => {
    beforeEach(() => cy.visit('http://localhost:8080/signin'));

    it('logs and changes email profile', () => {
        cy.get('[data-cy=text-username]').type('test');
        cy.get('[data-cy=text-mdp]').type('test');
        cy.get('[data-cy=btn-connexion]').click();
        cy.url().should('include', '/cryptos');

        cy.get('[data-cy=menu-profile]').click();
        cy.url().should('include', '/user');
        cy.get('[data-cy=text-username]').contains('test');
        cy.get('[data-cy=text-email]').contains('test@test.fr');
        cy.get('[data-cy=text-username]').clear().type('test2');
        cy.get('[data-cy=text-email]').clear().type('test2@test2.fr');
        cy.get('[data-cy=btn-edit-profile]').click();

        cy.get('[data-cy=text-username]').contains('test2');
        cy.get('[data-cy=text-email]').contains('test2@test2.fr');
        cy.get('[data-cy=text-username]').clear().type('test');
        cy.get('[data-cy=text-email]').clear().type('test@test.fr');
        cy.get('[data-cy=btn-edit-profile]').click();

    });
});
