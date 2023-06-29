import { CharacterValueTypes } from "../Interfaces/CharacterValueTypes";
import settings from "../Settings/settings";

//exported function that is called in the WebScraper.ts to create the characterValues
export function createCharacterValue(data: any): CharacterValueTypes[] {
  try {
    let increment: number = 0
    const characterValues: CharacterValueTypes[] = [];
    for (const elem in data) {
      let values = createValues(elem, data, characterValues);

      if (values.length > 1) {
        for (const value in values) {
          values[value].key = increment.toString();
          characterValues.push(values[value]);
          increment++;
        }
      } else if (values[0] !== undefined) {
        values[0].key = increment.toString();
        characterValues.push(values[0]);
        increment++;
      }
    }
    return characterValues;
  } catch {
    return [];
  }
}

// creates the values that are than pushed into characterValues
export function createValues(
  elem: string,
  data: any,
  CharacterValues: CharacterValueTypes[]
): CharacterValueTypes[] {
  //initialize constants & variables
  const values: CharacterValueTypes[] = [];
  const text = JSON.stringify(data[elem], null, 2);
  const formattedText = text.split("\\n");
  let input: string;
  const textData: string[] = [];

  //formatting the text for usage
  formattedText.forEach((value, index) => {
    if (value !== "" && value !== " ") {
      textData.push(value);
    }
  });
  // creates datasets for this Data-element
  const datasets = createDatasets(textData);

  //splits the textData into datasets for further operations
  datasets.forEach((dataset, index) => {
    const nameInput: string[] = splitName(
      dataset[checkNameDatasetIndex(dataset)]
    );

    try {
      if (nameInput[1].includes("Taunt")) {
        input = nameInput[0].split(" ")[0];
      } else {
        input = nameInput[0];
      }
    } catch {
      console.log(dataset);
      console.log("nameinput: " + nameInput);
    }
    const name = nameInput[1];

    // pushes dataset into values depending on size of the dataset and if the dataset is not a duplicate
    const duplicate = CharacterValues.some((el) => el.Input === input);
    if (dataset[18] !== undefined && !duplicate) {
      values.push({
        key: elem,
        Name: name,
        Input: input,
        Startup: dataset[11],
        Active: dataset[12],
        Recovery: dataset[13],
        Cancel: dataset[14],
        Damage: dataset[15],
        Guard: dataset[16],
        OnHit: dataset[17],
        OnBlock: dataset[18],
      });
    } else if (dataset[17] !== undefined && !duplicate) {
      values.push({
        key: elem,
        Name: name,
        Input: input,
        Startup: dataset[10],
        Active: dataset[11],
        Recovery: dataset[12],
        Cancel: dataset[13],
        Damage: dataset[14],
        Guard: dataset[15],
        OnHit: dataset[16],
        OnBlock: dataset[17],
      });
    } else if (dataset[16] !== undefined && !duplicate) {
      values.push({
        key: elem,
        Name: name,
        Input: input,
        Startup: dataset[9],
        Active: dataset[10],
        Recovery: dataset[11],
        Cancel: dataset[12],
        Damage: dataset[13],
        Guard: dataset[14],
        OnHit: dataset[15],
        OnBlock: dataset[16],
      });
    }
  });
  return values;
}

//checks which index of the dataset should be used for the splitName function
export function checkNameDatasetIndex(dataset: string[]): number {
  let index: number = 0;
  if (dataset.length >= 18) {
    if (
      !settings.possibleInputs.some((input) => dataset[1].includes(input)) // used for example for Level 3 which has CA index in dataset at 1
    ) {
      index = 2;
    } else {
      index = 1;
    }
  } else {
    index = 0;
  }
  return index;
}

/*
 * searches through the possibleInputs array and searches if the name includes the input and splits it at
 * that part and returns the name and input and if not it returns an empty array
 */
export function splitName(name: string): string[] {
  const nameArray: string[] = [];
  let found: boolean = false;
  settings.possibleInputs.forEach((input, index) => {
    if (
      name.includes(input) &&
      (name.includes("Stand") ||
        name.includes("Crouch") ||
        name.includes("Jump")) &&
      name.includes("DL")
    ) {
      const parts = name.split(input);
      nameArray.push(parts[0] + input);
      nameArray.push(checkNameForComma(parts, input, 2));
      found = true;
      return nameArray;
    }
    if (name.includes(input) && !found) {
      const parts = name.split(input);
      nameArray.push(parts[0] + input);
      nameArray.push(checkNameForComma(parts, input, 1));
      found = true;
      return nameArray;
    }
  });
  return nameArray;
}

/* creates a dataset from the textData Array therefore it travels through the textData in variable steps depending on where the last
 * neccessary variable for the dataset is and increases the bottom and top variables depinding on that. There are a lot of else if because
 * there are a lot of edge cases to check
 *
 */
export function createDatasets(textData: string[]): string[][] {
  const datasets: string[][] = [];
  let bottom = 0;
  let top = 18;
  if (textData.length === 0) {
    return [[]];
  }

  for (let i = 0; i <= Math.floor(textData.length / 18); i++) {
    if (
      i === 0 &&
      textData[bottom].includes("DL2") &&
      //if it does not include any input
      !settings.possibleInputs.some(
        (
          input // eslint-disable-next-line
        ) =>
          textData[bottom].includes(input) && textData[bottom + 2] === "Startup"
      )
    ) {
      datasets.push(textData.slice(bottom, top + 1));
      bottom = top + 1;
      top += 18;
    } else if (textData[bottom + 4] === "Startup") {
      const temp: string[] = [textData[bottom]].concat(
        textData.slice(bottom + 3, top + 3)
      );
      datasets.push(temp);
      bottom += 18 + 3;
      top = bottom + 17;
    } else if (textData[bottom + 5] === "Startup") {
      const temp: string[] = [textData[bottom]].concat(
        textData.slice(bottom + 4, top + 4)
      );
      datasets.push(temp);
      bottom += 18 + 4;
      top = bottom + 17;
    } else if (i === 0) {
      datasets.push(textData.slice(bottom, top));
      bottom = top + 1;
      top += 18;
    }
    if (i !== 0) {
      switch ("Startup") {
        case textData[bottom]: {
          datasets.push(textData.slice(bottom - 1, top - 1));
          bottom += 17;
          top = bottom + 17;
          break;
        }

        case textData[bottom + 1]: {
          datasets.push(textData.slice(bottom, top));
          bottom += 18;
          top = bottom + 17;
          break;
        }

        case textData[bottom + 2]: {
          datasets.push(textData.slice(bottom + 1, top + 1));
          bottom += 18 + 1;
          top = bottom + 17;
          break;
        }

        case textData[bottom + 3]: {
          datasets.push(textData.slice(bottom + 2, top + 2));
          bottom += 18 + 2;
          top = bottom + 17;
          break;
        }

        case textData[bottom + 4]: {
          datasets.push(textData.slice(bottom + 3, top + 3));
          bottom += 18 + 3;
          top = bottom + 17;
          break;
        }
      }
    }
  }

  return datasets;
}

function checkNameForComma(parts: string[], input: string, index: number) {
  let moveName: string = "";
  if (index === 2) {
    moveName = parts[1] + input + parts.slice(index, parts.length).toString();
  } else {
    moveName = parts.slice(index, parts.length).toString();
  }

  if (moveName.includes(", ")) {
    return moveName.split(", ")[1];
  } else {
    return moveName;
  }
}

const dataService = {
  createCharacterValue,
  createDatasets,
  splitName,
  checkNameDatasetIndex,
  createValues,
}

export default dataService;
