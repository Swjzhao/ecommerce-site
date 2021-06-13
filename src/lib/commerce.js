import Commerce from '@chec/commerce.js';

const COMMERCE_PUBLIC_KEY = process.env.REACT_APP_COMMERCE_PUBLIC_KEY;

export const commerce = new Commerce(COMMERCE_PUBLIC_KEY, true);
