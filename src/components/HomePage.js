import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "./ItemCard";

function HomePage({items, onPathChange, isLoggedIn}) {
  let location = useLocation();
  
  useEffect(() => {
    onPathChange(location.pathname);
  },[location.pathname, onPathChange]);

  return(
    <div>
      <h1>Items:</h1>
      {
        items.map(item => {
          return <ItemCard key={item.id} item={item} isLoggedIn={isLoggedIn}/>
        })
      }
    </div>
  )
}

export default HomePage