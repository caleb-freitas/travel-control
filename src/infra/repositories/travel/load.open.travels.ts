import { ILoadOpenTravelsRepository } from "@/data/protocols";
import { Travel } from "@/domain/usecases";
import { prisma } from "@/infra/repositories";

export class LoadOpenTravelsRepository implements ILoadOpenTravelsRepository {
  async load(company_id: string): Promise<Travel.Model[]> {
    const travels = await prisma.travel.findMany({
      where: {
        AND: [{ company_id }, { delivered_in: null }],
      },
    });
    return travels;
  }
}
