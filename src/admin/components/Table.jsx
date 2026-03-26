import React from "react";

const Table = ({ columns, data }) => {
  return (
    <table border="1" width="100%" cellPadding="10">

      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>

      <tbody>

        {data.map((item, index) => (
          <tr key={index}>

            {Object.values(item).map((value, i) => (
              <td key={i}>{value}</td>
            ))}

          </tr>
        ))}

      </tbody>

    </table>
  );
};

export default Table;