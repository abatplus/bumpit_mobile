import * as DE from './de/vcard.json';
import * as EN from './de/vcard.json';

export const translations = {
  de: { ...convertPontoonFormatToI18n(DE) },
  en: { ...convertPontoonFormatToI18n(EN) },
};

type ObjStringProps = { [key: string]: string };
function convertPontoonFormatToI18n(jsonObj: any): ObjStringProps {
  const result = { default: '' } as ObjStringProps; //default is always part of an object, so create it here explicitly to be TSC compatible
  for (const prop in jsonObj) {
    result[prop] = jsonObj[prop].message as string;
  }
  delete result.default;
  return result;
}
