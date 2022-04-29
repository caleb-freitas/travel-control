import { ILoadBillingBetweenDatesRepository } from "@/data/protocols/database";
import { Billing } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class LoadBillingBetweenDatesRepository implements ILoadBillingBetweenDatesRepository {
  async load(startDate: string, endDate: string): Promise<Billing.Model[]> {
    const billing = await prisma.travel.findMany({
      where: {
        AND: [
          {
            created_at: {
              gte: new Date(startDate),
            },
          },
          {
            created_at: {
              lte: new Date(endDate),
            },
          },
        ],
      },
      select: {
        id: true,
        driver_id: true,
        truck_id: true,
        client: true,
        created_at: true,
        freight_value: true,
      },
    });
    return billing;
  }
}
