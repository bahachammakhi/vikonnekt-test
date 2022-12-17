import React from "react";

interface ICheckBoxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export default function CheckBox({ label, ...props }: ICheckBoxProps) {
  return (
    <div>
      <span>{label}</span>
      <input type="checkbox" {...props} />
    </div>
  );
}
