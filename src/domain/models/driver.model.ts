export interface IDriverModel {
  id: string;
  company_id: string;
  name: string;
  email: string;
  password: string;
  drivers_license: string;
  created_at: Date;
  updated_at?: Date;
  access_token?: string;
}
