import { ButtonType } from '../Reusable/Button/type';
import { TextType } from '../Reusable/Text/type';

export interface FooterConfig {
  logo: {
    img: string;
    alt: string;
  };
  main: {
    title: string;
    desc: TextType;
    socialIconLinks: Array<ButtonType>;
  };
  links: Array<ButtonType>;
  contactInfo: {
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    email?: string;
    phone?: string;
  };
}
