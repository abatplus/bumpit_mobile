import * as germanLanguageForApp from './de/vcard.json';
import * as englishLanguageForApp from './en/vcard.json';
import { MessageFormatElement } from 'intl-messageformat-parser';

type ObjStringProps = { [key: string]: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertPontoonFormatToI18n(jsonObj: any): ObjStringProps {
  const result = { default: '' } as ObjStringProps; //default is always part of an object, so create it here explicitly to be TSC compatible
  for (const prop in jsonObj.default) {
    result[prop] = jsonObj.default[prop].message as string;
  }
  delete result.default;

  console.log(result);
  return result;
}

export const Translations = {
  de: { ...convertPontoonFormatToI18n(germanLanguageForApp) } as Record<string, string> | Record<string, MessageFormatElement[]>,
  en: { ...convertPontoonFormatToI18n(englishLanguageForApp) } as Record<string, string> | Record<string, MessageFormatElement[]>,
};
