import moment from 'moment';
import momentHijri from 'moment-hijri';

export const setupMomentLocale = (language) => {
  momentHijri.locale(language === 'ar' ? 'ar-sa' : 'en');
  moment.locale(language === 'ar' ? 'ar-ly' : 'en');
};

export const determineUpcomingPrayer = (prayerTimes, setUpcomingPrayer) => {
  const currentTime = moment();
  const prayerTimesMoment = prayerTimes.map((prayerTime, index) => ({
    prayer: prayerTime.displayName,
    time: moment(prayerTime[prayerTimes[index]], "HH:mm"),
  }));

  const nextPrayer = prayerTimesMoment.find(({ time }) => time.isAfter(currentTime));
  if (nextPrayer) {
    setUpcomingPrayer(nextPrayer.prayer);
    return nextPrayer;
  } else {
    setUpcomingPrayer(prayerTimesMoment[0].prayer);
    return prayerTimesMoment[0];
  }
};
