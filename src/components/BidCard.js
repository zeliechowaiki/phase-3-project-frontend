import {React} from 'react'
import timedif from './timedif';
import {Link} from 'react-router-dom';

function BidCard({bid, currentAccount, currentPath, users, items, currentTime, bids}) {
  const user = users.find(user => user.id === bid.user_id);
  const item = items.find(item => item.id === bid.item_id);
  const compareBids = bids.filter(bid => bid.item_id === item.id)
  const isLastBid = (compareBids[compareBids.length - 1] === bid)
  let timeSince = timedif(bid, true, currentTime);

  if (!user || !item ) return null;

  if (currentPath === '/account') {
    return (
      <div>
        {
          item.open ? 
          <Link to={`items/${item.id}`}>
          <p className={`${isLastBid ? "last-bid" : "not-last-bid"} ${item.open ? "" : "closed-item" }`}>
            {timeSince} ago: You bid ${bid.bid_amount}{currentPath === "/account" ? ` on ${item.name}`: ""}
          </p>
          </Link> :
            <p className={`${isLastBid ? "last-bid" : "not-last-bid"} ${item.open ? "" : "closed-item" }`}>
            {timeSince ? timeSince : "0 seconds"} ago: You bid ${bid.bid_amount}{currentPath === "/account" ? ` on ${item.name}`: ""}
          </p>
        }
      </div>
    )
  }

  return (
    <div>
      {
        bid.user_id === currentAccount.id ?
        <p className={isLastBid ? "last-bid bid-card" : "bid-card"}>
          {timeSince ? timeSince : "0 seconds"} ago: You bid ${bid.bid_amount}{currentPath === "/account" ? ` on ${item.name}`: ""}
        </p> :
        <p className={isLastBid ? "last-bid bid-card" : "bid-card"}>
          {timeSince ? timeSince : "0 seconds"} ago: {user.name} bid ${bid.bid_amount}
        </p>
      }
    </div>
  )
}

export default BidCard