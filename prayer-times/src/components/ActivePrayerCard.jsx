import React from 'react';

function ActivePrayerCard({ prayerName, prayerTime, counter, upcomingPrayer }) {
  return (
    <div className="active-prayer-card">
      <h4>{prayerName}</h4>
      <p>{prayerTime}</p>
      <p>{upcomingPrayer}: {counter}</p>
    </div>
  );
}

export default ActivePrayerCard;