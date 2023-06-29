import React, { useState } from "react";
import "./App.css";
import CharacterData from "./webScraper";
import { Button, Space, Input, Typography } from "antd";

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [showCharacterData, setShowCharacterData] = useState<boolean>(false);
  const [parameter, setParameter] = useState<string>("");
  

  const {Title} = Typography

  function refreshPage() {
    window.location.reload();
  }

  const handleClick = (): void => {
    // Pass the inputValue to the CharacterData component or perform any other action
    setShowCharacterData(true);
    setParameter(inputValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      if (inputValue.length <= 20) {
        setShowCharacterData(true);
        setParameter(inputValue)
      }
  }};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 20) {
      setInputValue(event.target.value);
    }}

  return (
    <div id="app">
      <Title>Framedata</Title>
      <Space.Compact style={{ width: '100%' }}>
      <Input defaultValue="Character Name" value={inputValue} onChange={handleChange} onKeyPress={handleKeyPress}/>
      <Button type="primary" onClick={handleClick}>Submit</Button>
    </Space.Compact>

      {showCharacterData && <CharacterData parameter={parameter} />}

      <Button type="primary" onClick={refreshPage}>
        Click to reload!
      </Button>
    </div>
  );
}

export default App;
