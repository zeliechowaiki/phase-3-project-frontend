import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function ItemCard({item, isLoggedIn}) {
  const [highestBid, setHighestBid] = useState();

  useEffect(() => {
    fetch(`http://localhost:9292/highest_bid/${item.id}`)
    .then(response => response.json())
    .then(data => setHighestBid(data.bid_amount))
  },[item.id]);

  function handleItemClick() {
    alert('Log in to view');
  }

  return(
    <div>
      {
        isLoggedIn ? 
        <Link to={`items/${item.id}`}>
          <div className="item-card" >
            <h4>{item.name}</h4>
            <p>Highest bid: ${highestBid}</p>
          </div>
        </Link> : 
        <div className="item-card" onClick={handleItemClick}>
          <h4>{item.name}</h4>
          <p>Highest bid: ${highestBid}</p>
      </div>
      }
    
    </div>

  )
}

export default ItemCard