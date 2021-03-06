export namespace LoadDriverByEmail {
  export type Result = {
    id: string;
    company_id: string;
    name: string;
    email: string;
    password: string;
    drivers_license: string;
    created_at: Date;
    updated_at?: Date;
    access_token?: string;
  };
}

export interface ILoadDriverByEmailRepository {
  loadByEmail(email: string): Promise<LoadDriverByEmail.Result>;
}
