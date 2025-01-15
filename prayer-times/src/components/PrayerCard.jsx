import React from 'react';

function PrayerCard({ prayerName, prayerTime }) {
  return (
    <div className="prayer-card">
      <h4>{prayerName}</h4>
      <p>{prayerTime}</p>
    </div>
  );
}

export default PrayerCard;