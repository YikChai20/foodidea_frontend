export default class User {
  phone_code: string;
  contact_number: string;
  password: string;
  username: string;
  gender?: string;
  birthday?: string;

  constructor(phone_code: string, contact_number: string, password: string, username: string, gender?: string, birthday?: string) {
    this.phone_code = phone_code;
    this.contact_number = contact_number;
    this.password = password;
    this.username = username;
    this.gender = gender;
    this.birthday = birthday;
  }

  isValid(): boolean {
    return !!this.contact_number && !!this.password;
  }

  isSignupValid(): boolean {
    return this.isValid() && !!this.username && !!this.gender && !!this.birthday;
  }
}