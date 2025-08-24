import React from "react";
import './Table.css';

export default function Table() {
//
  const data = [
    { userId:1,name: "Anom", age: 19, gender: "Male",title:"No1",completed:"08-24-2025" },
    { userId:2,name: "Megha", age: 19, gender: "Female",title:"No2",completed:"08-24-2025" },
    { userId:3,name: "Subham", age: 25, gender: "Male",title:"No3",completed:"08-24-2025" },
   ]

   const dataToDisplay = data;

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(dataToDisplay[0]).map((key) => {
            if (key != "userId") return <th key={key}>{key.toUpperCase()}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataToDisplay.map((obj) => {
          return (
            <tr key={obj.id}>
              <td>{obj.name}</td>
              <td>{obj.title}</td>
              <td>{obj.completed.toString()}</td>
              <td>{obj.id}</td>
              <td>{obj.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}