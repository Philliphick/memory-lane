import React from "react";

interface ButtonProps {
  buttonLabel: String;
  href: string;
}

const button: React.FC<ButtonProps> = ({ buttonLabel, href }) => {
  return (
    <a
      href={href}
      className="flex justify-center border-2 border-gray-700 m-2 p-1 bg-slate-300 hover:bg-slate-500 hover:text-gray-200 transition-colors"
    >
      {buttonLabel}
    </a>
  );
};

export default button;
