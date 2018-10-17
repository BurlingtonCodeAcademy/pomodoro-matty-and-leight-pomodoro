describe("Countdown", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("starts", () => {
    it("starts with 25 minutes on the clock", () => {
      cy.get("#clock #minutes").contains("25");
    });

    it("starts with 00 seconds on the clock", () => {
      cy.get("#clock #seconds").contains("00");
    });

    specify("with Start enabled and Pause disabled", () => {
      cy.get("#start").should("be.enabled");
      cy.get("#pause").should("be.disabled");
    });
  });

  describe("when the user clicks Start", () => {
    beforeEach(() => {
      cy.clock();
      cy.visit("/");
      cy.get("#start").click();
    });

    it("begins to count down once per second", () => {
      cy.tick(1000);
      cy.get("#clock #minutes").contains("24");
      cy.get("#clock #seconds").contains("59");
    });

    it("keeps counting a few more seconds", () => {
      cy.tick(1000);
      cy.get("#clock #minutes").contains("24");
      cy.get("#clock #seconds").contains("59");

      cy.tick(1000);
      cy.get("#clock #minutes").contains("24");
      cy.get("#clock #seconds").contains("58");

      cy.tick(1000);
      cy.get("#clock #minutes").contains("24");
      cy.get("#clock #seconds").contains("57");
    });

    it("catches up after a few seconds of lag", () => {
      cy.tick(5000);
      cy.get("#clock #minutes").contains("24");
      cy.get("#clock #seconds").contains("55");
    });

    it("rolls over the minutes and seconds after 60 ticks", () => {
      cy.tick(61 * 1000);
      cy.get("#clock #minutes").contains("23");
      cy.get("#clock #seconds").contains("59");
    });

    specify("enables Pause and disables Start", () => {
      cy.get("#start").should("be.disabled");
      cy.get("#pause").should("be.enabled");
    });
  });
});
