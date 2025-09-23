// models/Country.ts

export default class Country {
  id?: number; // optional since it's usually auto-incremented
  code: string;
  name: string;
  slug: string;
  phone_code?: string;
  image_url: string;
  status: 'ACTIVE' | 'INACTIVE';

  constructor(
    code: string,
    name: string,
    slug: string,
    image_url: string,
    status: 'ACTIVE' | 'INACTIVE' = 'ACTIVE',
    phone_code?: string,
    id?: number
  ) {
    this.code = code;
    this.name = name;
    this.slug = slug;
    this.image_url = image_url;
    this.status = status;
    this.phone_code = phone_code;
    this.id = id;
  }
}
