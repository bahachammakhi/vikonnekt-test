import React from "react";

export interface Header<T> {
  title: string | JSX.Element;
  key?: string;
  dataIndex?: keyof T;
  render?: (record: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  headers: Header<T>[];
  data: T[];
}

export default function Table<T>({ headers, data }: TableProps<T>) {
  return (
    <div>
      <table style={{ border: "1px solid black" }}>
        <tr style={{ border: "1px solid black" }}>
          {headers.map((header) => (
            <th style={{ borderBottom: "1px solid black" }}>{header.title}</th>
          ))}
        </tr>
        {data.map((row) => {
          return (
            <tr style={{ border: "1px solid black" }}>
              {headers.map((header, i) => {
                let value: any = header.dataIndex
                  ? row[header.dataIndex]
                  : null;
                if (header.render) {
                  value = header.render(row, i);
                }
                return (
                  <td style={{ borderBottom: "1px solid black" }}>{value}</td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}
