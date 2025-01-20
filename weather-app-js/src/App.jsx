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

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
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
                    <Typography variant="h1">28</Typography>
                    {/* TODO: TEMP IMAGE */}

                    <Typography variant="body1">borden clouds</Typography>
                    <Box sx={{ display: "flex", gap: "15px" }}>
                      <Typography variant="h6">Min : 24</Typography>
                      <Typography variant="h6">Max : 24</Typography>
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
