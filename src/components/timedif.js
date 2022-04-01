export default function timedif(item, ago, currentTime) {

  if (!item) return null;

  const itemTime = ago ? item.created_at.split(/T|\./)[1] : item.auction_end.split(/T|\./)[1];

  const currentTimeSecs = parseInt(currentTime.split(':')[0] * 3600) + parseInt(currentTime.split(':')[1] * 60) + parseInt(currentTime.split(':')[2]);
  const itemTimeSecs = parseInt(itemTime.split(':')[0] * 3600) + parseInt(itemTime.split(':')[1] * 60) + parseInt(itemTime.split(':')[2]);
  const timeDifSecs = ago ? currentTimeSecs - itemTimeSecs : itemTimeSecs - currentTimeSecs;
  
  if (timeDifSecs >= 7200) {
      return `${Math.floor(timeDifSecs / 3600)} hours`;
    }
    else if (timeDifSecs >= 3600) {
      return "1 hour";
    }
    else if (timeDifSecs >= 120) {
      return `${Math.floor(timeDifSecs / 60)} minutes`;
    }
    else if (timeDifSecs >= 60) {
      return "1 minute";
    }
    else if (timeDifSecs > 1) {
      return `${timeDifSecs} seconds`;
    }
    else if (timeDifSecs > 0) {
      return "1 second";
    }
    else if (timeDifSecs === 0) {
      return "0 seconds";
    }
    else return "closed";
}