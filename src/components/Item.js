import {React, useState} from 'react'
import {useParams, useHistory} from "react-router-dom";
import BidCard from './BidCard';
import timedif from './timedif';

function Item({currentAccount, spendableMoney, 
  items, bids, loadBids, currentPath, users, currentTime}) {
  const {id} = useParams();
  let history = useHistory();
  const item = items.find(item => item.id === parseInt(id));
  const itemBids = bids.filter(bid => bid.item_id === item.id);
  const highestBid = itemBids[itemBids.length - 1].bid_amount;
  const [bidFormIsHidden, setBidFormIsHidden] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  let timeRemaining = timedif(item, false, currentTime);

  if (!item.open) {
    history.push('/');
  }

  function createBid() {
    const newBid = parseInt(bidAmount);
    fetch('http://localhost:9292/bids', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        bid_amount: newBid,
        user_id: currentAccount.id,
        item_id: id
        })
    })
    .then(response => response.json())
    .then(() => loadBids());
  }

  function onBidClick() {
    if (spendableMoney > highestBid) {
      setBidFormIsHidden(false);
    }
    else {
      alert("Not enough money to bid");
    }
  }

  function handleBidSubmit(e) {
    e.preventDefault();
    if ((bidAmount <= spendableMoney) && (bidAmount > highestBid)) {
      createBid()
      setBidAmount("");
      setBidFormIsHidden(true);
    }
  }

  if (!currentAccount) return null;

  return (
    <div>
      <h1>{item.name}</h1>
      <p>Category: {item.category}</p>
      <p>Condition: {item.condition}</p>
      <p>Starting price: ${item.starting_price}</p>
      <p>Current highest bid: ${highestBid}</p>
      {
        bidFormIsHidden ? <button onClick={onBidClick}>Bid</button>
        : <button onClick={() => setBidFormIsHidden(true)}>Exit form</button>
      }
      <div className={bidFormIsHidden ? "hidden" : ""}>
        <form onSubmit={handleBidSubmit}>
          <label htmlFor="amount">Choose amount</label>
          <input type="number" id="amount-dropdown" name="amount" min={highestBid+1} max={currentAccount.money} 
          required onChange={(e) => setBidAmount(e.target.value)} value={bidAmount}></input><br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <p>Bids:</p>
        {
          itemBids.reverse().map(bid => {
            return <BidCard key={bid.id} bid={bid} items={items} currentPath={currentPath} 
            currentAccount={currentAccount} users={users} currentTime={currentTime} bids={bids} ></BidCard>
          })
        }
      </div>
      <p>Auction closes in {timeRemaining}</p>
    </div>
  )
}

export default Item;