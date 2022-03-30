import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "./ItemCard";
import Clock from './Clock'

function HomePage({items, onPathChange, isLoggedIn}) {
  let location = useLocation();
  
  useEffect(() => {
    onPathChange(location.pathname);
  },[location.pathname, onPathChange]);

  return(
    <div>
      <Clock></Clock>
      <h1 className="homepage-head">LOTS:</h1>
      {
        items.map(item => {
          return <ItemCard key={item.id} item={item} isLoggedIn={isLoggedIn}/>
        })
      }
    </div>
  )
}

export default HomePage