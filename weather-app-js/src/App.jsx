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

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  const [data, setData] = useState({
    temp: '',
    desc: '',
    min: '',
    max: '',
    icon: ''
  });
  useEffect(() => {
    let cancelAxios = null;
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=31.50161&lon=34.46672&appid=ff99272d424f10a912a593816ccfb15c';
    axios.get(url, {
      cancelToken: new axios.CancelToken(c => cancelAxios = c)
    })
    .then(res => {
      // console.log(res.data.main.temp - 272.15);
      setData({
        temp: res.data.main.temp - 272.15,
        desc: res.data.weather[0].description,
        min: res.data.main.temp_min - 272.15,
        max: res.data.main.temp_max - 272.15,
        icon: res.data.weather[0].icon
      })  
      console.log(res.data.main.temp - 272.15)  
    })

    return () => {
      cancelAxios();
    }
  }, [])
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
                      Gaza
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Tuesday - 22 / 10
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
                    {/* TODO: TEMP IMAGE */}
                    <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="weather-icon" />

                    <Typography variant="body1">{data.desc}</Typography>
                    <Box sx={{ display: "flex", gap: "15px" }}>
                      <Typography variant="h6">Min : {data.min}</Typography>
                      <Typography variant="h6">Max : {data.max}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">English</Typography>
              <FormControlLabel
                control={
                  // <Switch checked={isArabic} onChange={handleLanguageChange} />
                  <Switch />
                }
                label="Arabic"
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
