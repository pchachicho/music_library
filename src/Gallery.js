import React from "react";
import GalleryItem from "./GalleryItem";
import { DataContext } from "./context/DataContext";
import { useContext } from "react";

const Gallery = () => {
  const data = useContext(DataContext);

  const display = data.map((item, index) => {
    return <GalleryItem key={index} item={item} />;
  });
  return <div>{display}</div>;
};

export default Gallery;
