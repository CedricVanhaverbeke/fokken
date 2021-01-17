import hasMoves from './hasMoves';

describe('hasMoves', () => {
  //const mockHand = [];
  //const table = [[], [], []];
  describe('Moves from the hand', () => {
    it('should have a move from the hand', () => {
      const mockHand = [{ number: 8, suit: 0 }];
      const mockTable = [[], [], []];
      const mockPlayedCards = [{ number: 2, suit: 0 }];

      expect(
        hasMoves({
          canPlayFromTable: false,
          canPlayHiddenFromTable: false,
          hand: mockHand,
          table: mockTable,
          playedCards: mockPlayedCards,
        }),
      ).toBeTruthy();
    });

    it('should not have any moves from the hand', () => {
      const mockHand = [{ number: 3, suit: 0 }];
      const mockTable = [[], [], []];
      const mockPlayedCards = [{ number: 8, suit: 0 }];

      expect(
        hasMoves({
          canPlayFromTable: false,
          canPlayHiddenFromTable: false,
          hand: mockHand,
          table: mockTable,
          playedCards: mockPlayedCards,
        }),
      ).toBeFalsy();
    });

    describe('Moves from the table first row', () => {
      it('should have a move from the table first row', () => {
        const mockHand = [];
        const mockTable = [
          [{ number: 1 }, { number: 3 }],
          [{ number: 2 }, { number: 3 }],
          [{ number: 3 }, { number: 4 }],
        ];
        const mockPlayedCards = [{ number: 2, suit: 0 }];

        expect(
          hasMoves({
            canPlayFromTable: true,
            canPlayHiddenFromTable: false,
            hand: mockHand,
            table: mockTable,
            playedCards: mockPlayedCards,
          }),
        ).toBeTruthy();
      });

      it('should not have any moves from the table first row', () => {
        const mockHand = [];
        const mockTable = [
          [{ number: 1 }, { number: 3 }],
          [{ number: 2 }, { number: 3 }],
          [{ number: 3 }, { number: 4 }],
        ];
        const mockPlayedCards = [{ number: 'K', suit: 0 }];

        expect(
          hasMoves({
            canPlayFromTable: false,
            canPlayHiddenFromTable: false,
            hand: mockHand,
            table: mockTable,
            playedCards: mockPlayedCards,
          }),
        ).toBeFalsy();
      });

      it('should not have any moves from the table first row', () => {
        const mockHand = [];
        const mockTable = [
          [{ number: 1 }, { number: 3 }],
          [{ number: 'K' }],
          [{ number: 3 }],
        ];
        const mockPlayedCards = [{ number: 'Q', suit: 0 }];

        expect(
          hasMoves({
            canPlayFromTable: false,
            canPlayHiddenFromTable: false,
            hand: mockHand,
            table: mockTable,
            playedCards: mockPlayedCards,
          }),
        ).toBeFalsy();
      });
    });
  });

  describe('Moves from the hidden cards', () => {
    it('should always return undefined since we do not know', () => {
      const mockHand = [];
      const mockTable = [[{ number: 3 }], [{ number: 3 }], [{ number: 4 }]];
      const mockPlayedCards = [{ number: 'K', suit: 0 }];

      expect(
        hasMoves({
          canPlayFromTable: true,
          canPlayHiddenFromTable: true,
          hand: mockHand,
          table: mockTable,
          playedCards: mockPlayedCards,
        }),
      ).toBeUndefined();
    });
  });
});
