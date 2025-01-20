import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  createTheme,
  ThemeProvider,
  Box,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import "moment/dist/locale/ar";
import "moment/locale/en-gb";
// moment.locale('ar')
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  const {t, i18n } = useTranslation();
  const [date, setDate] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
  const [data, setData] = useState({
    temp: '',
    desc: '',
    min: '',
    max: '',
    icon: ''
  });
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    document.body.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic])

  useEffect(() => {
    let cancelAxios = null;
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=31.50161&lon=34.46672&appid=ff99272d424f10a912a593816ccfb15c';
    axios.get(url, {
      cancelToken: new axios.CancelToken(c => cancelAxios = c)
    })
    .then(res => {
      setData({
        temp: res.data.main.temp - 272.15,
        desc: res.data.weather[0].description,
        min: res.data.main.temp_min - 272.15,
        max: res.data.main.temp_max - 272.15,
        icon: res.data.weather[0].icon
      })  
    })

    return () => {
      cancelAxios();
    }
  }, [])

  const handleLanguageChange = () => {
    setIsArabic((prev) => !prev);
    i18n.changeLanguage(isArabic ? 'en' : 'ar');
    moment.locale(isArabic ? 'en' : 'ar')
    setDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="#f0f0f0"
        >
          <Container maxWidth="sm">
            <Card>
              <CardContent>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h3" fontWeight={"600"} gutterBottom>
                      {t("Gaza")}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      {date}
                    </Typography>
                  </Box>

                  <Divider variant="middle" />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h1">{Math.round(data.temp)}</Typography>
                    <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="weather-icon" />

                    <Typography variant="body1">{t(data.desc)}</Typography>
                    <Box sx={{ display: "flex", gap: "15px" }}>
                      <Typography variant="h6">{t("Min")} : {data.min}</Typography>
                      <Typography variant="h6">{t("Max")} : {data.max}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">{t("English")}</Typography>
              <FormControlLabel
                control={
                  <Switch checked={isArabic} onChange={handleLanguageChange} />
                }
                label={t("Arabic")}
                labelPlacement="end"
              />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
