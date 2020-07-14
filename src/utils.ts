/**
 * get the name of a property of type T
 *
 * @template T type to work on
 * @param {keyof T} name property name
 * @returns {string}
 */
export const nameof = <T>(name: keyof T): string => {
  return name as string;
};

export const getProfileId = (location: string): string => {
  return location.split('/').reverse()[0];
};
