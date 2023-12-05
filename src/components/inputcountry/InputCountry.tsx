import { useState, useRef } from "react";
import { countries } from "../../types/countries";
import "./InputCountry.css";

export default function InputCountry() {
  const [readyOptions, setReadyOptions] = useState([] as string[]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filterBySubstring = (array: string[], substring: string) => {
    return array.filter((item) =>
      item.toLowerCase().includes(substring.toLowerCase()),
    );
  };

  const updateReadyOptions = (input: string) => {
    if (!input || countries.includes(input)) {
      setReadyOptions([]);
      return;
    }
    const filteredOptions = filterBySubstring(countries, input);
    setReadyOptions(filteredOptions);
  };

  const handleChange = (newInput: string) => {
    if (inputRef.current) {
      inputRef.current.value = newInput;
    }
    updateReadyOptions(newInput);
  };

  return (
    <div className="form1-country-input-wrapper">
      <label htmlFor="country">Select country:</label>
      <div className="options-wrapper" onBlur={() => setReadyOptions([])}>
        <input
          ref={inputRef}
          className="input-text"
          id="country"
          name="country"
          type="text"
          autoComplete="off"
          onChange={(e) => handleChange(e.target.value)}
        />
        {readyOptions
          ? readyOptions.map((item, index) => {
              return (
                <button
                  className="option-button"
                  key={index}
                  onMouseDown={() => handleChange(item)}
                >
                  {item}
                </button>
              );
            })
          : null}
      </div>
    </div>
  );
}
