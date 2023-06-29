 
import {createDatasets} from "../../Services/DataService"

describe("createDatasets", () => {

    test("create Dataset with data", () => {
    const input = ['"Standing Light Punch5LP ',"5LPStanding Light Punch","Startup","Active","Recovery","Cancel","Damage","Guard","On Hit","On Block","4","3","7","ch sp su","300","LH","+5","-2","Basic and dependable pressure tool. Functionally interchangeable with 2LP, the main difference between them being the height that they connect at.",
'"']
    const expected = [
      '"Standing Light Punch5LP ',
      "5LPStanding Light Punch",
      "Startup",
      "Active",
      "Recovery",
      "Cancel",
      "Damage",
      "Guard",
      "On Hit",
      "On Block",
      "4",
      "3",
      "7",
      "ch sp su",
      "300",
      "LH",
      "+5",
      "-2",
    ];
        const result = createDatasets(input);
        expect(result[0]).toEqual(expected);
      });

    test("create dataset with empty data", () =>{
        const result = createDatasets([])
        expect(result[0].length).toBe(0)
    });
    
  });

  export {};
