import { useState, useEffect } from "react";
import PrayerCard from "./components/PrayerCard";
import ActivePrayerCard from "./components/ActivePrayerCard";
import Loading from "./components/Loading";
import DropdownMenu from "./components/DropdownMenu";
import moment from "moment";
import momentHijri from "moment-hijri";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useFetchPrayerTimes } from "./hooks/useFetchPrayerTimes";
import { useCurrentLocation } from "./hooks/useCurrentLocation";
import { setupMomentLocale } from "./utils/momentSetup";
import "./assets/images/mosque-bg.png";

const countries = [
  { code: "PS", name: "Palestine" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
];

const cities = {
  PS: ["Gaza", "Hebron", "Jenin", "Nablus", "Ramallah", "Bethlehem", "Khan Yunis", "Rafah"],
  SA: ["Jeddah", "Mecca", "Medina", "Riyadh", "Tabuk", "Hail", "Jizan"],
  AE: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Fujairah"],
};

function App() {
  const { i18n, t } = useTranslation();
  const lng = Cookies.get("i18next") || "en";

  const [selectedCountry, setSelectedCountry] = useState("PS");
  const [selectedCity, setSelectedCity] = useState("Gaza");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const { prayerTimes, loading, error } = useFetchPrayerTimes(selectedCountry, selectedCity, i18n);

  setupMomentLocale(lng);
  const gregorianDate = moment().format("D MMMM, YYYY");
  const hijriDate = momentHijri().format("iD iMMMM, iYYYY");
  const day = moment().format("dddd");
  const time = moment().format("h:mm A");

  useCurrentLocation(useCurrentLocation, setSelectedCountry, setSelectedCity);

  const handleCityChange = (city) => setSelectedCity(city);
  const handleCountryChange = (country) => setSelectedCountry(country);
  const handleUseCurrentLocationClick = () => setUseCurrentLocation(true);

  return (
    <div className="bg-custom-background min-h-screen overflow-hidden center-flex-col">
      <div className="container center-flex-col gap-2 md:gap-3">
        <div className="flex gap-5 items-end">
          <h1 className="font-extrabold text-4xl md:text-5xl text-white">
            {t("title")}
          </h1>
          <DropdownMenu
            entities={["ar", "en"]}
            selectedEntity={i18n.language}
            handleEntityChange={(lang) => i18n.changeLanguage(lang)}
          />
        </div>
        <p className="max-w-[500px] w-full text-sm lg:text-[16px] text-center text-black/70 tracking-[0.5px] leading-5">
          {t("description")}
        </p>
        <div className="flex gap-1 sm:gap-3 w-[95%] lg:w-[70%] my-1 lg:my-2">
          <DropdownMenu
            entities={countries.map((country) => country.name)}
            handleEntityChange={handleCountryChange}
            selectedEntity={selectedCountry}
          />
          <DropdownMenu
            entities={cities[selectedCountry]}
            handleEntityChange={handleCityChange}
            selectedEntity={selectedCity}
          />
          <div className="m-auto">
            <button onClick={handleUseCurrentLocationClick} className="label center-flex-row">
              location
            </button>
          </div>
        </div>
        <div className="px-6 relative rounded-lg w-full shadow-lg bg-[url('./assets/images/mosque-bg.png')] bg-contain bg-center bg-no-repeat sm:bg-repeat">
          <div className="relative z-10 flex flex-col">
            <div className="p-3 center-flex-col sm:center-flex-row border-primary border-b">
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
              <div className="center-flex-row  flex-wrap gap-2 md:gap-3 py-4">
                {prayerTimes.map((prayerTime, index) =>
                  prayerTime.isActive ? (
                    <ActivePrayerCard
                      key={index}
                      prayerName={prayerTime.displayName}
                      prayerTime={moment(prayerTime.time, "HH:mm").format("hh:mm A")}
                      counter={prayerTime.countdown}
                      upcomingPrayer={t("Upcoming Prayer")}
                    />
                  ) : (
                    <PrayerCard
                      key={index}
                      prayerName={prayerTime.displayName}
                      prayerTime={moment(prayerTime.time, "HH:mm").format("hh:mm A")}
                    />
                  )
                )}
              </div>
            )}
          </div>
          <div className="absolute top-0 right-0 w-full h-full bg-gray-100/85 rounded-lg z-1"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
