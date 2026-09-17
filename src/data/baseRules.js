export const BASE_RULES = {
  draft: {
    availableCharacters: 15,
    reveal: 5,
    choose: 3,
  },

  deployment: {
    startsOnBoard: true,
    playCost: 0,
  },

  combat: {
    actionsPerTurn: 1,
    speedDeterminesTurnOrder: true,
    dodgeSystem: false,
    criticalHits: false,
    knockedOutAtHp: 0,
    primaryWinCondition: 'knock_out_all_enemy_characters',
  },

  inheritance: {
    baseStatsRemainFoundation: true,
    passivesPersistThroughEvolution: true,
    activeAbilityPersistsThroughEvolution: true,
  },
}
