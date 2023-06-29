import axios from "axios";
import React, { useEffect, useState } from "react";
import NameNotFoundError from "./Errors/NameNotFoundError";
import { nameRecognition } from "./Services/NameRecognition";
import { CharacterValueTypes } from "./Interfaces/CharacterValueTypes";
import settings from "./Settings/settings";
import { Table } from "antd";
import { CharacterDataProps } from "./Interfaces/CharacterDataProps";
import { createCharacterValue } from "./Services/DataService";

function throwNameNotFoundError(name: string): never {
  throw new NameNotFoundError(name);
}

const CharacterData: React.FC<CharacterDataProps> = ({ parameter }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [formatedName, setFormatedName] = useState<{
    name: string;
    distance: number;
  }>({ name: "", distance: 0 });
  const name = parameter;
  let characterValues: CharacterValueTypes[];


  /*
   * calls on the second Server for the data inside the HTML document of the targeted site for webscraping
   * if the distance is greater than 3 it sets the error to NameNotFoundError else it creates the
   * Framedata-List
   */
  useEffect(() => {
    /*
     * const to format the name that was inputted so that it can be found in the URL by the Web Scraper
     * and if the distance is greater than 3 it is not acknowledged
     */
    const newFormatedName = nameRecognition(parameter);
    setFormatedName(newFormatedName);
    setError(null);

    if (newFormatedName.distance <= 3 && name !== "") {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3009/api/framedata?name=" + newFormatedName.name
          );
          setData(response.data);
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    } else {
      try {
        throwNameNotFoundError(parameter);
      } catch (error) {
        setError(error);
      }
    } // eslint-disable-next-line
  }, [parameter]);

  characterValues = createCharacterValue(data);
  return (
    <div>
      {error ? (
        <div>
          <h2>Error:</h2>
          <p>{error.message}</p>
        </div>
      ) : data ? (
        <div>
          <h2>{formatedName["name"]}</h2>
          <Table<CharacterValueTypes>
            dataSource={characterValues}
            columns={settings.column}
          />
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
export default CharacterData;

/* characterValues.sort((a, b) => {
    if (a.OnBlock !== "-" && b.OnBlock !== "-") {
      return parseInt(a.OnBlock) > parseInt(b.OnBlock) ? -1 : 1;
    } else if (a.OnBlock !== "-" && b.OnBlock === "-") {
      return -1;
    } else if (a.OnBlock === "-" && b.OnBlock !== "-") {
      return 1;
    } else {
      return 1;
    }
  });*/
