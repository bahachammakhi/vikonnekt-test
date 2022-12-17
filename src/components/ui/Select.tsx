import React from "react";

interface ISelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { name: string; value: any }[];
}

export default function Select({ options, ...props }: ISelectProps) {
  return (
    <select
      style={{
        width: 100,
        height: 30,
        borderRadius: 3,
        color: "white",
        backgroundColor: "gray",
      }}
      {...props}
    >
      {options.map((option) => (
        <option style={{ padding: 20 }} key={option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
