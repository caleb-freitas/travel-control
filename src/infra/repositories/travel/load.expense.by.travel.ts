import { ILoadExpensesByTravelRepository } from "@/data/protocols";
import { Expense } from "@/domain/models";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class LoadExpenseByTravelRepository implements ILoadExpensesByTravelRepository {
  async load(travel_id: string): Promise<Expense.Model[]> {
    const expenses = await prisma.expense.findMany({
      where: {
        travel_id,
      },
    });
    return expenses;
  }
}
