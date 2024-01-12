const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

const detectBrowserLanguage = () => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    // El navegador devuelve el código de idioma en minúsculas, así que asegurémonos de que esté en minúsculas
    return browserLanguage.toLowerCase();
};

const changeLanguage = async (language) => {
const requestJson = await fetch(`./javascript/translations/${language}.json`);
const texts = await requestJson.json();

for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
}
};

// Detectar el idioma del navegador al cargar la página y cambiar el idioma
document.addEventListener("DOMContentLoaded", () => {
    const browserLanguage = detectBrowserLanguage();

  // Verificar si el idioma del navegador es compatible con los idiomas disponibles
    const supportedLanguages = ["en", "es"];
    const defaultLanguage = "en"; // Idioma por defecto si no se encuentra un idioma compatible

    const initialLanguage = supportedLanguages.includes(browserLanguage)
    ? browserLanguage
    : defaultLanguage;

  // Cambiar el idioma al cargar la página
    changeLanguage(initialLanguage);
});

flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.dataset.language);
});
