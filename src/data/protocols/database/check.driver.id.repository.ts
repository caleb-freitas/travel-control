export interface ICheckDriverByIdRepository {
  check(id: string): Promise<boolean>;
}
