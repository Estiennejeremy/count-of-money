describe('Test profile', () => {
    beforeEach(() => cy.visit('http://localhost:8080/signin'));

    it('logs and changes email profile', () => {
        cy.get('[data-cy=text-username]').type('test');
        cy.get('[data-cy=text-mdp]').type('test');
        cy.get('[data-cy=btn-connexion]').click();
        cy.url().should('include', '/cryptos');

        cy.get('[data-cy=menu-profile]').click();
        cy.wait(1000);
        cy.url().should('include', '/user');

        cy.get('[data-cy=menu-articles]').click();
        cy.wait(1000);
        cy.url().should('include', '/articles');


    });
});
