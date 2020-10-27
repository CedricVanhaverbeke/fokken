import { useLayoutEffect, useEffect } from 'react';

export const useIsoMorphicEffect = process.browser
  ? useEffect
  : useLayoutEffect;
