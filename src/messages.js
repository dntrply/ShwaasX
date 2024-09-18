import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import messages_en from './translations/en.json';
import messages_hi_In from './translations/hi_IN.json';
import messages_kn_In from './translations/kn_IN.json';
import messages_te_In from './translations/te_IN.json';
import messages_bn_In from './translations/bn_IN.json';
import messages_ta_In from './translations/ta_IN.json';
import messages_mr from './translations/mr.json';

translations = {
  en: messages_en,
  hi_In: messages_hi_In,
  kn_In: messages_kn_In,
  te_In: messages_te_In,
  bn_In: messages_bn_In,
  ta_In: messages_ta_In,
  mr: messages_mr,
};

export const languageOptions = [
  {label: 'English', locale: 'en', labelInEnglish: 'English'},
  {label: 'हिंदी', locale: 'hi_In', labelInEnglish: 'Hindi'},
  {label: 'ಕನ್ನಡ', locale: 'kn_In', labelInEnglish: 'Kannada'},
  {label: 'తెలుగు', locale: 'te_In', labelInEnglish: 'Telugu'},
  {label: 'বাংলা', locale: 'bn_In', labelInEnglish: 'Bangla'},
  {label: 'தமிழ்', locale: 'ta_In', labelInEnglish: 'Tamil'},
  {label: 'मराठी', locale: 'mr', labelInEnglish: 'Marathi'},
];

console.log('messages.js --> about to create I18n object');
const messages = new I18n(translations);
console.log('messages.js --> created I18n object');
console.log('messages.js --> messages.locale: ', messages.locale);
messages.locale = "en";
console.log('messages.js --> messages.locale: ', messages.locale);
// console.log('messages.js --> messages: ', messages);

export const getLanguage = () => {
  const languageCode = messages.locale;
  return languageOptions.find(option => option.locale === languageCode)
    .labelInEnglish;
};

export const changeLanguage = languageKey => {
  messages.locale = languageKey;
};

export const t = str => messages.t(str) || str;

export default messages;
