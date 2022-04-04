export interface IUpdateDriverTokenRepository {
  updateAccessToken(id: string, token: string): Promise<void>;
}
