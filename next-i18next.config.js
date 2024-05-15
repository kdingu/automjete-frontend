module.exports = {
  i18n: {
    defaultLocale: "al",
    locales: ["al", "en"],
    localeDetection: false, // without this the root url will default to url/browser-default-language so most probably url/en
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
};
