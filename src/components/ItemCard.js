import React from "react";
import { Link } from 'react-router-dom';
import timedif from "./timedif";

function ItemCard({item, currentAccount, bids, currentTime, currentPath}) {

  if (currentPath === '/account') {
    return(
      <div className="item-card">
          <h4>{item.name}</h4>
      </div>
    )
  }

  if (!item.open) {
    return(
      <div className="item-card closed-item">
          <h4>{item.name}</h4>
          <p>Auction closed</p>
      </div>
    )
  }

  let timeRemaining = timedif(item, false, currentTime);
  const itemBids = bids.filter(bid => bid.item_id === item.id);
  const highestBid = itemBids[itemBids.length - 1].bid_amount;

  function handleItemClick() {
    alert('Log in to view');
  }

  return(
    <div className={item.open ? "item-card" : "item-card closed-item"}>
      {
        (currentAccount && item.open) ? 
        <Link to={`items/${item.id}`}>
          <div >
            <h4>{item.name}</h4>
            <p>Highest bid: ${highestBid}</p>
            <p>{item.open ? `Auction closes in ${timeRemaining}` : "Auction closed"}</p>
          </div>
        </Link> : 
        <div onClick={item.open ? handleItemClick : null}>
          <h4>{item.name}</h4>
          <p>Highest bid: ${highestBid}</p>
          <p>{item.open ? `Auction closes in ${timeRemaining}` : "Auction closed"}</p>
      </div>
      }
    </div>

  )
}

export default ItemCard