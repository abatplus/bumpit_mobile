export interface Vcard {
    name: CardField;
    surname: CardField;
    nickname: CardField;
    street: CardField;
    location: CardField;
    country: CardField;
    postalcode: CardField;
    tel: CardField;
    companyTel: CardField
    email:CardField;
    company: CardField;
  }

  export interface CardField {
    value: string;
    share: boolean
  }