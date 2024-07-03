import React from "react";




export default function Content({ unit}) {
  return (
    <div className="m-3">
      <h1 className="mb-4 font-semibold text-xl">{unit.title} :</h1>
    </div>
  );
}
