import React from "react";
import ItemCard from "./ItemCard";

function HomePage({items, currentAccount, bids, currentTime, currentPath}) {

  return(
    <div>
      <h1>Items:</h1>
      {
        items.sort((a,b) => a.auction_end - b.auction_end).map(item => {
          return <ItemCard key={item.id} item={item} currentTime={currentTime}
          currentAccount={currentAccount} bids={bids} currentPath={currentPath}/>
        })
      }
    </div>
  )
}

export default HomePage