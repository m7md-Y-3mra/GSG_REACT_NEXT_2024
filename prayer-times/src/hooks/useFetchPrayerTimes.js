/*import { useState, useEffect } from 'react';
import axios from 'axios';
import { determineUpcomingPrayer } from '../utils/momentSetup';

export const useFetchPrayerTimes = (selectedCountry, selectedCity, i18n) => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?country=${selectedCountry}&city=${selectedCity}`
        );
        const athanData = response.data.data.timings;
        const translatedAthanData = translatePrayerTimes(athanData, i18n.language);
        setPrayerTimes(translatedAthanData);
        determineUpcomingPrayer(translatedAthanData, setPrayerTimes);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPrayerTimes();
  }, [selectedCountry, selectedCity, i18n.language]);

  return { prayerTimes, loading, error };
};

const translatePrayerTimes = (athanData, lang) => {
  const translatedAthanData = [];
  for (const key in athanData) {
    translatedAthanData.push({
      [key]: athanData[key],
      displayName: lang === 'ar' ? translateToArabic(key) : key,
    });
  }
  return translatedAthanData;
};*/

import { useState, useEffect, useRef } from "react";
import { determineUpcomingPrayer as determineNextPrayerTime } from "../utils/momentSetup";
import { fetchPrayerTimesByCity } from "../services/api";
import axios from "axios";
import moment from "moment";

const prayers = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

export const useFetchPrayerTimes = (selectedCountry, selectedCity) => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upcomingPrayer, setUpcomingPrayer] = useState("");
  const [countdown, setCountdown] = useState("");
  
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPrayerTimesByCity(
          selectedCountry,
          selectedCity
        );

        const res = response.data.timings;

        const athanData = {};
        prayers.forEach((prayer) => {
          athanData[prayer] = res[prayer];
        });

        const translatedAthanData = await translatePrayerTimes(athanData);

        setPrayerTimes(translatedAthanData);
        determineUpcomingPrayer(translatedAthanData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();

    // Cleanup on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [selectedCountry, selectedCity]);

  const startCountdown = (nextPrayerTime, prayerTimesArray) => {
    // Clear previous timer if it exists
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      const currentTime = moment();
      const duration = moment.duration(nextPrayerTime.diff(currentTime));

      if (duration.asSeconds() <= 0) {
        clearInterval(timerRef.current);
        determineUpcomingPrayer(prayerTimesArray); // Update to the next prayer
      } else {
        const hours = String(duration.hours()).padStart(2, "0");
        const minutes = String(duration.minutes()).padStart(2, "0");
        const seconds = String(duration.seconds()).padStart(2, "0");
        setCountdown(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);
  };

  const determineUpcomingPrayer = (timings) => {
    const currentTime = moment();

    // Convert the prayer times to moment object for comparison
    const prayerTimesMoment = prayers.map((prayer, index) => ({
      prayer,
      time: moment(timings[index].time, "HH:mm"),
    }));

    const nextPrayer = prayerTimesMoment.find(({ time }) =>
      time.isAfter(currentTime)
    );

    if (nextPrayer) {
      setUpcomingPrayer(nextPrayer.prayer);
      startCountdown(nextPrayer.time, prayerTimesMoment);
    } else {
      // If all prayers for the day have passed, reset to the first prayer of the next day
      setUpcomingPrayer(prayerTimesMoment[0].prayer);
      startCountdown(
        prayerTimesMoment[0].time.add(1, "days"),
        prayerTimesMoment
      );
    }
  };

  return { prayerTimes, loading, error, upcomingPrayer, countdown };
};

const translatePrayerTimes = async (athanData) => {
  const corsProxyUrl = "https://cors-anywhere-rqwp.onrender.com";
  const googleTranslateUrl = `${corsProxyUrl}/https://translate.googleapis.com/translate_a/single`;

  try {
    const translatedAthanData = await Promise.all(
      Object.keys(athanData).map(async (key) => {
        const response = await axios.get(googleTranslateUrl, {
          params: {
            client: "gtx",
            sl: "en",
            tl: "ar",
            dt: "t",
            q: key,
          },
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        });

        const translation = response.data[0][0][0];

        return {
          key,
          time: athanData[key],
          displayName: {
            nameEnglish: key,
            nameArabic: translation,
          },
        };
      })
    );

    return translatedAthanData;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

