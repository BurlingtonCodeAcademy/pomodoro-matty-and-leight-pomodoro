describe('Zero', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/');
  });

  describe('given the timer is counting down', () => {
    beforeEach(() => {
      cy.clock();
      cy.visit('/');
      cy.get('#start').click();
    })

    describe('when it reaches 00:00', () => {
      beforeEach(() => {
        cy.tick(1000 * 60 * 25 - 1); // 1 msec until 00:00
      })

      it('first displays 0:01', () => {
        cy.get('#clock #minutes')
          .contains('0')
        cy.get('#clock #seconds')
          .contains('01')
      })

      it('then displays 0:00', () => {
        cy.tick(1);
        cy.get('#clock #minutes')
          .contains('0')
        cy.get('#clock #seconds')
          .contains('00')
      });

    });
  });
});

