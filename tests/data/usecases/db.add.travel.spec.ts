import { dbAddTravelSut } from "@/tests/data/sut";
import { mockTravelParams } from "@/tests/domain/mocks";

describe("DbAddTravel", () => {
  test("should call AddTravelRepository with correct values", async () => {
    const { sut, addTravelSpy } = dbAddTravelSut();
    const addSpy = jest.spyOn(addTravelSpy, "add");
    await sut.add(mockTravelParams());
    expect(addSpy).toHaveBeenCalledWith(mockTravelParams());
  });
});
