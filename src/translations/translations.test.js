import englishTranslations from './app.en';
import dutchTranslations from './app.nl';

test('translations should contain the same keys', () => {
  const englishKeys = Object.keys(englishTranslations);
  const dutchKeys = Object.keys(dutchTranslations);

  expect(englishKeys.sort()).toEqual(dutchKeys.sort());
});
