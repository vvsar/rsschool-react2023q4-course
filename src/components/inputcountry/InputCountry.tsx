import { useState } from "react";
import "./AutoComplete.css";

export default function InputCountry() {
  const [readyOptions] = useState([] as string[]);

  return (
    <>
      <label htmlFor="country">Select country:</label>
      <input></input>
      {readyOptions.map((item) => {
        <button>{item}</button>;
      })}
    </>
  );
}
