describe('Zero', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/');
  });

  describe('given the timer is counting down to zero', () => {
    beforeEach(() => {
      cy.clock();
      cy.visit('/');
      cy.get('#start').click();

      cy.tick(1000 * 60 * 25 - 1); // wait until 1 msec from 00:00
    })

    it('first displays 0:01', () => {
      cy.get('#clock #minutes')
        .contains('0')
      cy.get('#clock #seconds')
        .contains('01')
    })

    describe('when it reaches 0', () => {
      beforeEach(() => {
        cy.tick(1); // finally, count down to 0
      })

      it('then displays 0:00', () => {
        cy.get('#clock #minutes')
          .contains('0')
        cy.get('#clock #seconds')
          .contains('00')
      });

      specify('disables Pause and Start', ()=>{
        cy.get('#start')
          .should('be.disabled')
        cy.get('#pause')
          .should('be.enabled')
      });
  
    });
  });
});

