export namespace LoadCompanyByEmail {
  export type Result = {
    id: string;
    name: string;
    email: string;
    password: string;
    cnpj: string;
    created_at: Date;
    updated_at?: Date;
    access_token?: string;
  };
}

export interface ILoadCompanyByEmailRepository {
  loadByEmail(email: string): Promise<LoadCompanyByEmail.Result>;
}
