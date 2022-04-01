import React from 'react';
import timedif from './timedif';

function Ticker({bids, currentTime, users, items}) {

  if (!bids || !items || !users) return null;

  return (
    <div className="hwrap">
      <div className="hmove">
        {
          bids.slice(-4).map(bid => {
            return (
              <div className="hitem" key={bid.id}>
                {timedif(bid, true, currentTime)} ago: {users.find(user => user.id === bid.user_id).name} bid ${bid.bid_amount} on {items.find(item => item.id === bid.item_id).name}
              </div>
          )})
        }
      </div>
    </div>
  )
}

export default Ticker