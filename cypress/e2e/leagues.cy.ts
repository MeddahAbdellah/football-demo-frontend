describe('Team Selection', () => {
  it('should select English league and Arsenal team, then verify players are displayed', () => {
    cy.visit('/');
    cy.get('input[data-cy="leagues-input"]').click();
    cy.get('input[data-cy="leagues-input"]').type('English');
    cy.get('[data-cy="league-option"]').contains('English').click();
    cy.get('[data-cy="team-card"]').contains('Arsenal').click();
    cy.get('[data-cy="player-card"]').should('have.length.at.least', 1);
  });
});
