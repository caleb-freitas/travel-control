export interface IAccountModel {
  id: string;
  name: string;
  email: string;
  password: string;
  cnpj: string;
  created_at: Date;
  updated_at?: Date;
}
