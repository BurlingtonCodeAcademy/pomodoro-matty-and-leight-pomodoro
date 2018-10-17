describe('Reset', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/');
  })

  describe('on initial load', () => {
    it('should be enabled', () => {
      cy.get('#reset')
        .should('be.enabled')
    })

    it('clicking should do nothing', () => {
      cy.get('#reset')
        .click();
      cy.get('#clock #minutes')
        .contains('25')
      cy.get('#clock #seconds')
        .contains('00')
    })
  });

  describe('after clicking Start', () => {
    beforeEach(() => {
      cy.get('#start')
        .click();
    });

    it('should be enabled', () => {
      cy.get('#reset')
        .should('be.enabled')
    })

    describe('then clicking Reset', () => {
      beforeEach(() => {
        cy.tick(1000);
        cy.get('#reset')
          .click();
      });

      it('should reset the clock', () => {
        cy.get('#clock #minutes')
          .contains('25')
        cy.get('#clock #seconds')
          .contains('00')
      });

      it('should stop the countdown', () => {
        cy.tick(3000);
        cy.get('#clock #minutes')
          .contains('25')
        cy.get('#clock #seconds')
          .contains('00')
      });

      it('should enable the Start button', () => {
        cy.get('#start')
          .should('be.enabled')
      })
    })
  });

});
