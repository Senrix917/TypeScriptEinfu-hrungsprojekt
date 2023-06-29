import NameNotFoundError from "../Errors/NameNotFoundError";

export const nameRecognition = (str: string): { name: string; distance: number; } => {
  const matrix: number[][] = [];
  const distances: number[] = [];
  let actualName: string = "";
  const names = [
    "Cammy",
    "Lily",
    "Zangief",
    "JP",
    "Dee_Jay",
    "Blanka",
    "E.Honda",
    "Juri",
    "Ken",
    "Ryu",
    "Kimberly",
    "Luke",
    "Chun-Li",
    "Guile",
    "Marisa",
    "Manon",
    "Dhalsim",
    "Jamie",
  ];
  /*
   * goes through the list of names and calculates the distance between each name and the input String
   * and returns the name that is closest to the input
   */
  if(str.length > 20){
    throw new NameNotFoundError(str);
  } else{
  names.forEach((name) => {
    // creates a matrix for the Levenshtein-Distance
    for (let i = 0; i <= name.length; i++) {
      matrix[i] = [];
      for (let j = 0; j <= str.length; j++) {
        if (i === 0 && j === 0) {
          matrix[i][j] = 0;
        } else if (i === 0) {
          matrix[i][j] = j;
        } else if (j === 0) {
          matrix[i][j] = i;
        } else {
          matrix[i][j] = 0;
        }
      }
    }

    //calculates the distance and push to distances
    for (let i = 1; i <= name.length; i++) {
      for (let j = 1; j <= str.length; j++) {
        let substitutionCost = 1;
        if (name[i - 1] === str[j - 1]) {
          substitutionCost = 0;
        }

        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + substitutionCost
        );
      }
    }

    distances.push(matrix[name.length][str.length]);
  });
  const minDistance: number = Math.min(...distances);
  actualName = names[distances.indexOf(minDistance)]
  const returnVal = {
    name: (minDistance <= 3)? actualName : str,
    distance: minDistance
  }
  return returnVal;}
};

export default nameRecognition;
