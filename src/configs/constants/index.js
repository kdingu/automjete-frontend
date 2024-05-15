export const IS_DEV =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const SITE_NAME = "Automjete";

export const BASE_API_URI = "localhost:3000/api";

export const SESSION_KEY = "MOTORS_MARKET_USER_SESSION_TOKEN";

export const SESSION_EXPIRED_ERROR = "SessionExpiredError";

export const FALLBACK_IMAGE_URL =
  "https://placehold.co/600x400/png?text=MotorsMarket";

export const FALLBACK_IMAGE_URL_TEXT =
  text => `https://placehold.co/600x400/png?text=${text}`;

export const DEFAULT_CATEGORY_SLUG = "cars";
