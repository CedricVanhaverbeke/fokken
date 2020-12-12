import determineRelativeOrder from './determineRelativeOrder';

describe('game order', () => {
  it('should give the relative order correctly', () => {
    const order = ['a', 'b', 'c', 'd', 'e', 'f'];

    expect(determineRelativeOrder(order, 0)).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
    ]);

    expect(determineRelativeOrder(order, 1)).toEqual([
      'b',
      'c',
      'd',
      'e',
      'f',
      'a',
    ]);

    expect(determineRelativeOrder(order, 2)).toEqual([
      'c',
      'd',
      'e',
      'f',
      'a',
      'b',
    ]);

    expect(determineRelativeOrder(order, 3)).toEqual([
      'd',
      'e',
      'f',
      'a',
      'b',
      'c',
    ]);

    expect(determineRelativeOrder(order, 4)).toEqual([
      'e',
      'f',
      'a',
      'b',
      'c',
      'd',
    ]);

    expect(determineRelativeOrder(order, 5)).toEqual([
      'f',
      'a',
      'b',
      'c',
      'd',
      'e',
    ]);
  });
});
