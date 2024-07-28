document.addEventListener("DOMContentLoaded", function () {
  // Function to set up language switcher
  function setupLanguageSwitcher(
    switcherId,
    currentLangSelector,
    optionSelector
  ) {
    const switcher = document.getElementById(switcherId);
    if (!switcher) return; // Exit if the element doesn't exist

    const currentLanguageElement = switcher.querySelector(currentLangSelector);
    const languageOption = switcher.querySelector(optionSelector);

    // Determine current language based on the URL
    const isEnglish = window.location.href.includes("Eng.html");

    // Set the current language text
    currentLanguageElement.textContent = isEnglish ? "Eng" : "ქარ";

    // Set the language option text (the language to switch to)
    languageOption.textContent = isEnglish ? "ქარ" : "Eng";

    languageOption.addEventListener("click", function (event) {
      event.stopPropagation();

      if (isEnglish) {
        // Switch to Georgian
        window.location.href = window.location.href.replace(
          "Eng.html",
          ".html"
        );
      } else {
        // Switch to English
        window.location.href = window.location.href.replace(
          ".html",
          "Eng.html"
        );
      }
    });
  }

  // Set up header language switcher
  setupLanguageSwitcher(
    "languageSwitcher",
    ".currentLanguage p",
    ".languageOption"
  );

  // Set up footer language switcher
  setupLanguageSwitcher(
    "footerLanguageSwitcher",
    ".currentLanguage p",
    ".languageOption"
  );
});
