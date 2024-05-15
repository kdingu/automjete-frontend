import ApolloClient, { httpLink } from "@/helpers/apollo-wrapper";
import { setContext } from "@apollo/client/link/context";

export const scrollToTop = () => {
  const isBrowser = () => typeof window !== 'undefined';
  if (isBrowser()) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export const noop = () => {
};

export const debounce = (func, delay = 300) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export function setCookie(name, value, days = 3) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export const updateApolloAuthHeader = (token = "") => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  ApolloClient.setLink(authLink.concat(httpLink));
};

export const DEFAULT_OPTION_MANUFACTURER = { label: "Make", value: "" };
export const DEFAULT_OPTION_MODEL = { label: "Model", value: "" };
export const PRICES = [
  { value: "1", label: "100" },
  { value: "2", label: "200" },
  { value: "3", label: "300" },
];

export const transformModels = (data = []) => {
  return data.map((model) => ({
    value: model.slug,
    label: model.name,
  }));
};

export const transformMakes = (data = []) => {
  return data.map((make) => ({
    value: make.slug,
    label: make.name,
    models: transformModels(make.models),
  }));
};

export const getMakes = (data = []) => {
  return transformMakes(data);
};

export const getModels = (selectedMake = "", makes = [], raw) => {
  const models = makes.find((make) => make.slug === selectedMake)?.models || [];

  if (raw) return models;

  return transformModels(models);
};

export const getMinPrices = (selectedMaxPrice = "", prices = []) => {
  let _prices = prices;

  if (selectedMaxPrice && Number.parseFloat(selectedMaxPrice) > 0)
    _prices = prices.filter(
      (price) => Number.parseFloat(price) < Number.parseFloat(selectedMaxPrice),
    );

  return _prices.map((price) => ({ value: price, label: `EUR ${price}` }));
};

export const getMaxPrices = (selectedMinPrice = "", prices = []) => {
  let _prices = prices;

  if (selectedMinPrice && Number.parseFloat(selectedMinPrice) > 0)
    _prices = prices.filter(
      (price) => Number.parseFloat(price) > Number.parseFloat(selectedMinPrice),
    );

  return _prices.map((price) => ({ value: price, label: `EUR ${price}` }));
};

export const getBodyTypes = (bodyTypes = []) => {
  return bodyTypes.map((type) => ({
    value: type.id,
    label: type.name,
    imageUrl: `/images/${type.id}.png`,
  }));
};

export const ALL_KM_OPTION = [
  1000, 5000, 10000, 30000, 60000, 100000, 150000, 200000,
];

export const getMinKm = (selectedMaxKm = "") => {
  let _km = [...ALL_KM_OPTION];

  if (selectedMaxKm && Number.parseFloat(selectedMaxKm) > 0)
    _km = _km.filter(
      (km) => Number.parseFloat(km) < Number.parseFloat(selectedMaxKm),
    );

  return _km.map((km) => ({ value: km, label: km }));
};

export const getMaxKm = (selectedMinKm = "") => {
  let _km = [...ALL_KM_OPTION];

  if (selectedMinKm && Number.parseFloat(selectedMinKm) > 0)
    _km = _km.filter(
      (km) => Number.parseFloat(km) > Number.parseFloat(selectedMinKm),
    );

  return _km.map((km) => ({ value: km, label: km }));
};

export const YEAR_OPTIONS = [
  1900,
  1950,
  1980,
  1990,
  2000,
  ...new Array(new Date().getFullYear() - 2000)
    .fill(1)
    .map((o, index) => 2001 + index),
].sort((a, b) => b - a);

export const SEAT_OPTIONS = ["0", "1", "2", "3", "4", "5", "7+", "12+", "20+"];

export const ENGINE_SIZE_OPTIONS = [100, 200, 300, 400, 1200, 2400, 5000, 5500];

export const ENGINE_POWER_OPTIONS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
];

export const getYearsFrom = (selectedYearTo = "") => {
  let _years = [...YEAR_OPTIONS];

  if (selectedYearTo && Number.parseFloat(selectedYearTo) > 0)
    _years = _years.filter(
      (year) => Number.parseFloat(year) <= Number.parseFloat(selectedYearTo),
    );

  return _years.map((year) => ({ value: year, label: year }));
};

export const getYearsTo = (selectedYearFrom = "") => {
  let _years = [...YEAR_OPTIONS];

  if (selectedYearFrom && Number.parseFloat(selectedYearFrom) > 0)
    _years = _years.filter(
      (year) => Number.parseFloat(year) >= Number.parseFloat(selectedYearFrom),
    );

  return _years.map((year) => ({ value: year, label: year }));
};

export const getMinSeats = (selectedMaxSeats = "") => {
  let seats = [...SEAT_OPTIONS];

  if (selectedMaxSeats && Number.parseFloat(selectedMaxSeats) > 0)
    seats = seats.filter(
      (value) => Number.parseFloat(value) <= Number.parseFloat(selectedMaxSeats),
    );

  return seats.map((value) => ({ value: value, label: value }));
};

export const getMaxSeats = (selectedMinSeats = "") => {
  let seats = [...SEAT_OPTIONS];

  if (selectedMinSeats && Number.parseFloat(selectedMinSeats) > 0)
    seats = seats.filter(
      (value) => Number.parseFloat(value) >= Number.parseFloat(selectedMinSeats),
    );

  return seats.map((value) => ({ value: value, label: value }));
};

export const getMinEngineSizes = (selectedMaxSize = "") => {
  let sizes = [...ENGINE_SIZE_OPTIONS];

  if (selectedMaxSize && Number.parseFloat(selectedMaxSize) > 0)
    sizes = sizes.filter(
      (value) => Number.parseFloat(value) <= Number.parseFloat(selectedMaxSize),
    );

  return sizes.map((value) => ({ value: value, label: value }));
};

export const getMaxEngineSizes = (selectedMinSize = "") => {
  let sizes = [...ENGINE_SIZE_OPTIONS];

  if (selectedMinSize && Number.parseFloat(selectedMinSize) > 0)
    sizes = sizes.filter(
      (value) => Number.parseFloat(value) >= Number.parseFloat(selectedMinSize),
    );

  return sizes.map((value) => ({ value: value, label: value }));
};

export const getMinEnginePowers = (selectedMax = "") => {
  let powers = [...ENGINE_POWER_OPTIONS];

  if (selectedMax && Number.parseFloat(selectedMax) > 0)
    powers = powers.filter(
      (value) => Number.parseFloat(value) <= Number.parseFloat(selectedMax),
    );

  return powers.map((value) => ({ value: value, label: value }));
};

export const getMaxEnginePowers = (selectedMin = "") => {
  let powers = [...ENGINE_POWER_OPTIONS];

  if (selectedMin && Number.parseFloat(selectedMin) > 0)
    powers = powers.filter(
      (value) => Number.parseFloat(value) >= Number.parseFloat(selectedMin),
    );

  return powers.map((value) => ({ value: value, label: value }));
};

export const isElementOffScreen = (element, buffer = 0) => {
  if (!element) return true;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  return (
    rect.bottom + buffer < 0 ||
    rect.right + buffer < 0 ||
    rect.left - buffer > windowWidth ||
    rect.top - buffer > windowHeight
  );
};

export const formatPrice = (price, locale = "eu") => {
  let EURO = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  });

  return EURO.format(price);
};
