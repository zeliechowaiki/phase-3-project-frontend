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

  // if (!item.open) {
  //   return(
  //     <div className="item-card closed-item">
  //       <img className= "item-image" src={item.image} alt={item.name}/>
  //         <h4>{item.name}</h4>
  //         <p>Auction closed</p>
  //     </div>
  //   )
  // }

  let timeRemaining = timedif(item, false, currentTime);
  const itemBids = bids.filter(bid => bid.item_id === item.id);
  const highestBid = itemBids[itemBids.length - 1].bid_amount;

  function handleItemClick() {
    alert('Log in to view');
  }

  return(
    <div className={item.open ? "item-card" : "item-card closed-item"}>
      { currentAccount && item.open ? 
        <Link to={`items/${item.id}`}>
          <div className="image-container">
            <img className={item.open ? "item-image" : "item-image closed-item"} src={item.image} alt={item.name}/>
            <p className={item.open ? "item-bid" : "hidden"}>${highestBid}</p>
            <p className="item-time">{item.open ? `Auction closes in ${timeRemaining}` : "Auction closed"}</p> 
          </div>
            <h4 className="item-name">{item.name}</h4>
            {/* <p className="item-bid">Highest bid: ${highestBid}</p> */}
            {/* <p>{item.open ? `Auction closes in ${timeRemaining}` : "Auction closed"}</p> */}
        </Link> : 
        <div onClick={item.open ? handleItemClick : null} >
          <div className="image-container">
            <img className={item.open ? "item-image" : "item-image closed-item"} src={item.image} alt={item.name}/>
            <p className={item.open ? "item-bid" : "item-bid"}>${highestBid}</p>
            <p className="item-time">{item.open ? `Auction closes in ${timeRemaining}` : "Auction closed"}</p> 
          </div>
          <h4 className="item-name">{item.name}</h4>
          {/* <p className="item-bid">Highest bid: ${highestBid}</p> */}
          {/* <p>{item.open ? `Auction closes in ${timeRemaining}` : "Auction closed"}</p> */}
        </div>
      }
    </div>
  )
}

export default ItemCard