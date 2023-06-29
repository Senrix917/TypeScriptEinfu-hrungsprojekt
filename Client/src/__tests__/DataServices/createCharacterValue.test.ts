import {
  createCharacterValue,
} from "../../Services/DataService";

describe("createCharacterValue", () => {
  test("create Values with empty data", () => {
    const result = createCharacterValue([]);
    expect(result.length).toBe(0);
  });
});

export {};
