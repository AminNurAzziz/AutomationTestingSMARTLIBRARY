const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front-end-smart-library.vercel.app/",
    video: true,
    downloadsFolder: "cypress/downloads",
  },
});
