/**
 * Internationalization (i18n) module
 * Functional Programming approach - no global state
 */

import fs from "fs";
import { I18N_EN_PATH, I18N_ID_PATH } from "../../utils/paths.js";

// Pure function to load translations
export function loadTranslations(lang = 'en') {
  let langPath;
  if (lang === 'en') {
    langPath = I18N_EN_PATH;
  } else if (lang === 'id') {
    langPath = I18N_ID_PATH;
  } else {
    // fallback to en if invalid lang
    console.error(`Invalid language code: ${lang}, falling back to English`);
    langPath = I18N_EN_PATH;
    return loadEnglishTranslations();
  }

  try {
    const translations = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    return { lang, translations };
  } catch (e) {
    console.error(`Failed to load translations for language: ${lang}, falling back to English`);
    return loadEnglishTranslations();
  }
}

// Helper function to load English as fallback
function loadEnglishTranslations() {
  try {
    const translations = JSON.parse(fs.readFileSync(I18N_EN_PATH, 'utf8'));
    return { lang: 'en', translations };
  } catch (fallbackError) {
    console.error('Failed to load fallback English translations!', fallbackError);
    // If even fallback fails, return empty translations
    return { lang: 'en', translations: {} };
  }
}

// Pure function to translate text
export function translate(translations, key, ...params) {
  let translation = translations[key] || key;

  // Replace parameters if provided
  if (params.length > 0) {
    params.forEach((param, index) => {
      translation = translation.replace(`{${index}}`, param);
    });
  }

  return translation;
}

// Convenience function to get translation for a specific language
export function getTranslationFor(lang, key, ...params) {
  const { translations } = loadTranslations(lang);
  return translate(translations, key, ...params);
}

// Export default object with functions that work with state passed as parameter
export default {
  loadTranslations,
  translate,
  getTranslationFor
};