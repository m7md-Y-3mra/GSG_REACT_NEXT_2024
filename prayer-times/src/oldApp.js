import { useEffect, useState, useRef, useCallback } from "react";
import PrayerCard from "./components/PrayerCard";
import ActivePrayerCard from "./components/ActivePrayerCard";
import Loading from "./components/Loading";
import DropdownMenu from "./components/DropdownMenu";
import moment from "moment";
import "moment/locale/en-gb";
import "moment/dist/locale/ar-ly";
import momentHijri from "moment-hijri";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

// momentHijri.locale("en");
// moment.locale("en");

const countries = [
  { code: "PS", name: "Palestine" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
];

const cities = {
  PS: [
    "Gaza",
    "Hebron",
    "Jenin",
    "Nablus",
    "Ramallah",
    "Bethlehem",
    "Khan Yunis",
    "Rafah",
  ],
  SA: ["Jeddah", "Mecca", "Medina", "Riyadh", "Tabuk", "Hail", "Jizan"],
  AE: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Fujairah"],
};

const prayers = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
function App() {
  const gregorianDate = moment().format("D MMMM, YYYY");
  const hijriDate = momentHijri().format("iD iMMMM, iYYYY");
  const day = moment().format("dddd");
  const time = moment().format("h:mm A");

  const [selectedCountry, setSelectedCountry] = useState("PS");
  const [selectedCity, setSelectedCity] = useState("Gaza");
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upcomingPrayer, setUpcomingPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const lng = Cookies.get("i18next") || "en";

  const { i18n, t } = useTranslation();

  const timerRef = useRef(null);

  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4784d9dab48844958f5230653b4d5317&language=en
      );
      const { country_code, _normalized_city } =
        response.data.results[0].components;
      console.log(response.data.results[0].components);

      setSelectedCountry(country_code.toUpperCase());
      setSelectedCity(_normalized_city);
    } catch (error) {
      console.error("Error fetching location details: ", error);
    }
  };

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
        setCountdown(${hours}:${minutes}:${seconds});
      }
    }, 1000);
  };

  const determineUpcomingPrayer = (timings) => {
    const currentTime = moment();

    // Convert the prayer times to moment object for comparison
    // const prayerTimesMoment = prayers.map((prayer) => ({
    //   prayer,
    //   time: moment(timings[prayer], "HH:mm"),
    // }));

    const prayerTimesMoment = prayers.map((prayer, index) => ({
      prayer,
      time: moment(timings[index][prayer], "HH:mm"),
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

  const translatedAthanData = useCallback(
    (prayerTimes) => {
      const newPrayerTimes = prayerTimes.map((prayerTime, index) => {
        i18n.language === "ar"
          ? (prayerTime.displayName = translateToArabic(prayers[index]))
          : (prayerTime.displayName = prayers[index]);

        return prayerTime;
      });
      setPrayerTimes(newPrayerTimes);
    },
    [i18n.language]
  );

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  function handleCityChange(city) {
    setSelectedCity(city);
  }

  function handleCountryChange(country) {
    setSelectedCountry(country);
    setSelectedCity(cities[countries.find((c) => c.name === country).code][0]);
  }

  const handleUseCurrentLocationClick = () => {
    setUseCurrentLocation(true);
  };

  useEffect(() => {
    const fetchPrayerTimes = () => {
      setLoading(true);
      setError(null);
      axios
        .get(
          https://api.aladhan.com/v1/timingsByCity?country=${selectedCountry}&city=${selectedCity}
        )
        .then((response) => {
          const athanData = response.data.data.timings;
          const translatedAthanData = [];
          for (const key in athanData) {
            translateToArabic(key) !== key &&
              translatedAthanData.push({
                [key]: athanData[key],
                displayName:
                  i18n.language === "ar" ? translateToArabic(key) : key,
              });
          }
          setPrayerTimes(translatedAthanData);
          determineUpcomingPrayer(translatedAthanData);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };

    fetchPrayerTimes();
  }, [selectedCountry, selectedCity]);

  useEffect(() => {
    // Cleanup timer when component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (useCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationDetails(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
          setUseCurrentLocation(false);
        }
      );
    }
  }, [useCurrentLocation]);

  useEffect(() => {
    window.document.dir = i18n.dir();
    translatedAthanData(prayerTimes);
    // console.log(lng);

    // if (lng === "ar") {
    //   console.log("ar");

    //   momentHijri.locale("ar-ly");
    //   moment.locale("ar-ly");

    //   console.log(moment().format("YYYY-MMMM-dddd"));
    // } else {
    //   console.log("en");

    //   momentHijri.locale("en");
    //   moment.locale("en");
    //   console.log(moment().format("YYYY-MMMM-dddd"));
    // }
  }, [lng, translatedAthanData]);

  useEffect(() => {
    momentHijri.locale(lng === "ar" ? "ar-sa" : "en");
    moment.locale(lng === "ar" ? "ar-ly" : "en");
  }, [lng]);

  function translateToArabic(text) {
    const translations = {
      Fajr: "الفجر",
      Sunrise: "الشروق",
      Dhuhr: "الظهر",
      Asr: "العصر",
      Maghrib: "المغرب",
      Isha: "العشاء",
    };

    return translations[text] || text;
  }

  return (
    <div className="bg-custom-background min-h-screen overflow-hidden center-flex-col">
      <div className="container center-flex-col gap-2 md:gap-3">
        <div className="flex gap-5 items-end">
          <h1 className="font-extrabold text-4xl md:text-5xl text-white">
            {t("title")}
          </h1>
          {/* toggle: Arabic or English */}
          <div>
            <DropdownMenu
              entities={["ar", "en"]}
              selectedEntity={i18n.language}
              handleEntityChange={changeLanguage}
            />
          </div>
        </div>
        <p className="max-w-[500px] w-full text-sm lg:text-[16px] text-center text-black/70 tracking-[0.5px] leading-5">
          {t("description")}
        </p>

        {/* Dropdown Menu */}
        <div className="flex gap-1 sm:gap-3 w-[95%] lg:w-[70%] my-1 lg:my-2">
          <DropdownMenu
            entities={countries.map((country) => country.name)}
            handleEntityChange={handleCountryChange}
            selectedEntity={selectedCountry}
          />
          <DropdownMenu
            entities={
              cities[
                useCurrentLocation
                  ? [selectedCity]
                  : countries.find(
                      (country) => country.code === selectedCountry
                    ).code
              ]
            }
            handleEntityChange={handleCityChange}
            selectedEntity={selectedCity}
          />
          <div className="m-auto">
            <button
              onClick={handleUseCurrentLocationClick}
              className="label center-flex-row"
            >
              location
            </button>
          </div>
        </div>

        {/* prayer time cards */}
        <div className="px-6 relative rounded-lg w-full shadow-lg bg-[url('./assets/images/mosque-bg.png')] bg-contain bg-center bg-no-repeat sm:bg-repeat">
          <div className="relative z-10 flex flex-col ">
            <div className="p-3 center-flex-col sm:center-flex-row border-primary border-b ">
              <div className="date ">
                <p>{day}</p>
                <p>{time}</p>
              </div>
              <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl text-primary">
                {selectedCountry} - {selectedCity}
              </h3>

              <div className="date">
                <p>{gregorianDate}</p>
                <p>{hijriDate}</p>
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : error ? (
              <p className="text-center text-red-500 text-xl sm:text-2xl font-extrabold tracking-widest m-auto p-10">
                Error loading prayer times!
              </p>
            ) : (
              prayerTimes && (
                <div className="center-flex-row  flex-wrap gap-2 md:gap-3 py-4">
                  {prayerTimes.map((prayerTime, index) =>
                    upcomingPrayer === prayers[index] ? (
                      <ActivePrayerCard
                        key={index}
                        prayerName={prayerTime.displayName}
                        prayerTime={moment(
                          prayerTime[prayers[index]],
                          "HH:mm"
                        ).format("hh:mm A")}
                        counter={countdown}
                        upcomingPrayer={t("Upcoming Prayer")}
                      />
                    ) : (
                      <PrayerCard
                        key={index}
                        prayerName={prayerTime.displayName}
                        prayerTime={moment(
                          prayerTime[prayers[index]],
                          "HH:mm"
                        ).format("hh:mm A")}
                      />
                    )
                  )}
                </div>
              )
            )}
          </div>
          <div className="absolute top-0 right-0 w-full h-full bg-gray-100/85 rounded-lg z-1"></div>
        </div>
      </div>
    </div>
  );
}