import {React, useEffect, useState} from 'react'
import {useParams, useLocation} from "react-router-dom";

function Item({onPathChange, account, changeMyBids, spendableMoney}) {
  const {id} = useParams();
  const [item, setItem] = useState();
  const [highestBid, setHighestBid] = useState();
  const [bidFormIsHidden, setBidFormIsHidden] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  let location = useLocation();
  
  useEffect(() => {
    onPathChange(location.pathname);
  },[location.pathname, onPathChange]);
  
  useEffect(() => {
    fetch(`http://localhost:9292/items/${id}`)
    .then(response => response.json())
    .then(data => setItem(data))
  },[id]);

  useEffect(() => {
      fetch(`http://localhost:9292/highest_bid/${id}`)
      .then(response => response.json())
      .then(data => setHighestBid(data.bid_amount))
    },[id]);

    function createBid() {
      const newBid = parseInt(bidAmount);
      fetch('http://localhost:9292/bids', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        bid_amount: newBid,
        user_id: account.id,
        item_id: id
        })
      })
      .then(response => response.json())
      .then(bid => setHighestBid(bid.bid_amount));
    }

  function onBidClick() {
    if (spendableMoney > highestBid) {
      setBidFormIsHidden(false);
    }
    else {
      alert("Not enough money to bid");
    }
  }

  function onExitClick() {
    setBidFormIsHidden(true);
  }

  function handleBidChange(e) {
    setBidAmount(e.target.value);
  }

  function handleBidSubmit(e) {
    e.preventDefault();
    createBid()
    changeMyBids(account.id);
    setBidAmount("");
    setBidFormIsHidden(true);
  }

  if (!item) return null;

  return (
    <div>
      <h1 className='item-name'>{item.name}</h1>
      <img className= "item-image"src={item.image} alt={item.name}/>
      <p>Category: {item.category}</p>
      <p>Condition: {item.condition}</p>
      <p>Starting price: ${item.starting_price}</p>
      <p>Current highest bid: ${highestBid}</p>
      {
        bidFormIsHidden ? <button onClick={onBidClick}>Bid</button>
        : <button onClick={onExitClick}>Exit form</button>
      }
      <div className={bidFormIsHidden ? "hidden" : ""}>
        <form onSubmit={handleBidSubmit}>
          <label htmlFor="amount">Choose amount</label>
          <input type="number" id="amount-dropdown" name="amount" min={highestBid+1} max={account.money} 
          required onChange={handleBidChange} value={bidAmount}></input><br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Item;