import React, { useEffect, useState } from "react";
import "./Gallery.css";

function Gallery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/gallery/`)
      .then((it) => it.json())
      .then((result) => setData(result[Object.keys(result)[0]]))
      .catch(() => "not found");
  }, []);

  return (
    <div>
      <div>[Gallery component]</div>
      <ul>
        {data.map((it, index) => {
          return (
            <li key={index}>
              <img src={it.url} alt="pic" />
            </li>
          );
        })}
        <li></li>
      </ul>
    </div>
  );
}
export default Gallery;
