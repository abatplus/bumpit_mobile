import { Contacts, Contact, ContactField, ContactName, ContactOrganization, ContactAddress } from '@ionic-native/contacts';
import { IVCard } from '../interfaces/IVCard';

export default class ContactApi {
  constructor(private contacts: Contacts = new Contacts()) {}

  /**
   * Create a new contact with the given vCardFields and add it to the mobiles contacts.
   *
   * @param {IVCard} vCardFields
   * @memberof ContactApi
   */
  public createContact(vCardFields: IVCard) {
    // start creating the contact;

    let contact: Contact = this.contacts.create();
    if (vCardFields.name) {
      contact.name = new ContactName(undefined, vCardFields.name);
      contact.displayName = vCardFields.name;
    }
    if (vCardFields.company) {
      contact.organizations = [new ContactOrganization('work', vCardFields.company, undefined, vCardFields.position)];
    }
    if (vCardFields.email) {
      contact.emails = [...contact.emails, new ContactField('work', vCardFields.email)];
    }
    if (vCardFields.phone) {
      contact.phoneNumbers = [new ContactField('mobile', vCardFields.phone)];
    }
    if (vCardFields.fax) {
      contact.phoneNumbers = [...contact.phoneNumbers, new ContactField('work', vCardFields.fax)];
    }
    if (vCardFields.website) {
      contact.urls = [...contact.urls, new ContactField('work', vCardFields.website)];
    }
    contact.addresses = [
      ...contact.addresses,
      new ContactAddress(false, 'work', undefined, vCardFields.street, vCardFields.location, undefined, vCardFields.zipCode, vCardFields.country),
    ];

    contact.note = 'Added by vSwap';
    contact.categories = [...contact.categories, new ContactField('work', 'vSwap Exchanged')];

    return contact.save();
  }
}
