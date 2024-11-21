import React from "react";

interface TextInputProps {
    labelText: String;
    inputType: String;
    inputName: String;
}

const labelText = "input here"

const TextInput: React.FC<TextInputProps> = ({labelText, inputType, inputName}) => {
  return (
    <div className="flex flex-col m-2 gap-2 w-fill">
      <label className="text-xl">{labelText}</label>
      <input className="border-slate-600 border-2 p-1 focus:outline-none focus:ring focus:ring-gray-300" type={`${inputType}`} name={`${inputName}`} />
    </div>
  );
};

export default TextInput;
