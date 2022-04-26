import { DbLoadExpensesByTravel } from "@/data/usecases";
import { ILoadExpensesByTravel } from "@/domain/usecases";
import { CheckTravelByIdRepository } from "@/infra";
import { LoadExpenseByTravelRepository } from "@/infra/repositories/expense";

export function makeDbLoadExpenseByTravel(): ILoadExpensesByTravel {
  const checkTravelByIdRepository = new CheckTravelByIdRepository();
  const loadExpensesByTravelTravelRepository =
    new LoadExpenseByTravelRepository();
  return new DbLoadExpensesByTravel(
    checkTravelByIdRepository,
    loadExpensesByTravelTravelRepository
  );
}
