import validMoves from './validMoves';

describe('validMoves', () => {
  it('should show all cards', () => {
    expect(validMoves([]).sort()).toMatchObject([
      1,
      10,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'J',
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 2 }]).sort()).toMatchObject([
      1,
      10,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'J',
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 3 }]).sort()).toMatchObject([
      1,
      10,
      2, // special card
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'J',
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 4 }]).sort()).toMatchObject([
      1,
      10,
      2, // special card
      4,
      5,
      6,
      7,
      8,
      9,
      'J',
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 5 }]).sort()).toMatchObject([
      1,
      10,
      2, // special card
      5,
      6,
      7,
      8,
      9,
      'J',
      'K',
      'Q',
    ]);
  });
  it('should show the correct cards', () => {
    expect(validMoves([{ number: 6 }]).sort()).toMatchObject([
      1,
      10,
      2, // special card
      6,
      7,
      8,
      9,
      'J',
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 7 }]).sort()).toMatchObject([
      10, // special card
      2,
      3,
      4,
      5,
      6,
      7,
      9, // spcial card
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 8 }]).sort()).toMatchObject([
      1,
      10,
      2, // special card
      8,
      9,
      'J',
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 9 }]).sort()).toMatchObject([
      1,
      10,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'J',
      'K',
      'Q',
    ]);

    expect(validMoves([{ number: 'K' }, { number: 9 }]).sort()).toMatchObject([
      1,
      10, // special card
      2, // special card
      9, // spcial card
      'K',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 10 }]).sort()).toMatchObject([
      1,
      10, // special card
      2, // special card
      9, // spcial card
      'J',
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 'J' }]).sort()).toMatchObject([
      1,
      10, // special card
      2, // special card
      9, // spcial card
      'J',
      'K',
      'Q',
    ]);

    expect(validMoves([{ number: 11 }]).sort()).toMatchObject([
      1,
      10, // special card,
      2, // special card
      9, // spcial card
      'J',
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 'Q' }]).sort()).toMatchObject([
      1,
      10, // special card
      2, // special card
      9, // spcial card
      'K',
      'Q',
    ]);

    expect(validMoves([{ number: 12 }]).sort()).toMatchObject([
      1,
      10, // special card
      2, // special card
      9, // spcial card
      'K',
      'Q',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 'K' }]).sort()).toMatchObject([
      1, // ace
      10, // special card
      2, // special card
      9, // spcial card
      'K',
    ]);

    expect(validMoves([{ number: 13 }]).sort()).toMatchObject([
      1, // ace
      10, // special card
      2, // special card
      9, // spcial card
      'K',
    ]);
  });

  it('should show the correct cards', () => {
    expect(validMoves([{ number: 1 }]).sort()).toMatchObject([
      1,
      10, // special card
      2, // special card
      9, // spcial card
    ]);
  });
});
