export namespace LoadCompanyByEmailRepository {
  export type Result = {
    id: string;
    name: string;
    email: string;
    password: string;
    cnpj: string;
    created_at: Date;
    updated_at?: Date;
  };
}

export interface ILoadCompanyByEmailRepository {
  loadByEmail(email: string): Promise<LoadCompanyByEmailRepository.Result>;
}
