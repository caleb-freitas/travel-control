export interface IDriverModel {
  id: string;
  company_id: string;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  driversLicense: string;
  created_at: Date;
  updated_at?: Date;
}
