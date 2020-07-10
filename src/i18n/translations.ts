import * as germanLanguageForApp from './de/vcard.json';
import * as englishLanguageForApp from './en/vcard.json';
import { PontoonMessage } from './PontoonMessage';

export const translations = {
  de: { ...convertPontoonFormatToI18n(germanLanguageForApp) },
  en: { ...convertPontoonFormatToI18n(englishLanguageForApp) },
};

type JsonPontoonMessage = { [key: string]: PontoonMessage };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertPontoonFormatToI18n(jsonObj: JsonPontoonMessage): Record<string, string> {
  const result: Record<string, string> = { default: '' }; //default is always part of an object, so create it here explicitly to be TSC compatible

  for (const prop in jsonObj) {
    result[prop] = jsonObj[prop].message as string;
  }
  delete result.default;
  return result;
}
