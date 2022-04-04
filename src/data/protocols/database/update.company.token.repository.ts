export interface IUpdateCompanyTokenRepository {
  updateAccessToken(id: string, token: string): Promise<void>;
}
