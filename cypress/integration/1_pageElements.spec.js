describe('The page', function () {
  before(function () {
    cy.visit('/');
  });

  it('has a tomato', function () {
    cy.get('#tomato')
      .should('be.visible')
  });

  it('has a clock', function () {
    cy.get('#clock')
      .should('be.visible');

    cy.get('#clock #minutes')
      .should('be.visible');

    cy.get('#clock #seconds')
      .should('be.visible');
  });

  it('has buttons', function () {
    cy.get('#buttons').should('be.visible');
    cy.get('#buttons #start').should('be.visible');
    cy.get('#buttons #pause').should('be.visible');
    cy.get('#buttons #reset').should('be.visible');
  });

});

