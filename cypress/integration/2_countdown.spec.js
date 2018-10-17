describe('Countdown', () => {
  it('starts with 25 minutes on the clock', () => {
    cy.get('#clock #minutes')
      .contains('25')
  });
  it('starts with 00 minutes on the clock', () => {
    cy.get('#clock #seconds')
      .contains('00')
  });

  describe('when the user clicks Start', () => {
    beforeEach(()=>{
      cy.clock();
      cy.visit('/');
    })
    it('begins to count down once per second', () => {
      cy.get('#start').click();
      cy.tick(1000);
      cy.get('#clock #minutes')
        .contains('24')
      cy.get('#clock #seconds')
        .contains('59')
    })
  })

});
