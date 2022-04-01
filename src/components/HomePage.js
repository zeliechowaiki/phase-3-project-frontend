import React from "react";
import ItemCard from "./ItemCard";

function HomePage({items, currentAccount, bids, currentTime, currentPath}) {

  return(
    <div className='home-page'>
      <img className="homepage-img" src="https://miro.medium.com/max/1400/1*orugUTTXsV1oZH1_cgCt9g.jpeg" alt="fancy"/>
      <h1 className="homepage-head">ART:</h1>
      <div className="category-container">
      {
        items.filter(item => item.category === "art").map(item => {
          return <ItemCard key={item.id} item={item} currentTime={currentTime}
          currentAccount={currentAccount} bids={bids} currentPath={currentPath}/>
        })
      }
      </div>
      <h1 className="homepage-head">HISTORICAL:</h1>
      <div className="category-container">
      {
        items.filter(item => item.category === "historical").map(item => {
          return <ItemCard key={item.id} item={item} currentTime={currentTime}
          currentAccount={currentAccount} bids={bids} currentPath={currentPath}/>
        })
      }
      </div>
      <h1 className="homepage-head">REAL ESTATE:</h1>
      <div className="category-container">
      {
        items.filter(item => item.category === "real estate").map(item => {
          return <ItemCard key={item.id} item={item} currentTime={currentTime}
          currentAccount={currentAccount} bids={bids} currentPath={currentPath}/>
        })
      }
      </div>
      <h1 className="homepage-head">MEMORABILLIA:</h1>
      <div className="category-container">
      {
        items.filter(item => item.category === "memorabilia").map(item => {
          return <ItemCard key={item.id} item={item} currentTime={currentTime}
          currentAccount={currentAccount} bids={bids} currentPath={currentPath}/>
        })
      }
      </div>
    </div>
  )
}

export default HomePage