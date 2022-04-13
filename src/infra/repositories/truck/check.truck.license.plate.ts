import { ICheckTruckLicensePlateRepository } from "@/data/protocols/database/truck";
import { prisma } from "@/infra/repositories";

// eslint-disable-next-line prettier/prettier
export class CheckTruckByLicensePlateRepository implements ICheckTruckLicensePlateRepository {
  async check(licensePlate: string): Promise<boolean> {
    const truckExists = await prisma.truck.findFirst({
      where: {
        license_plate: licensePlate,
      },
    });
    return !!truckExists;
  }
}
