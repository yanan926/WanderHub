import ShowPageMapView from "../../Components/MapView/ShowPageMapView";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function ShowPage({ citiesData }) {
  const { cityId } = useParams();

  const cityData = citiesData.find((city) => city.properties.id === cityId);

  if (!cityData) {
    return <div>City not found!</div>;
  }

  const [travelDays, setTravelDays] = useState(null);
  const [error, setError] = useState("");
  const [itinerary, setItineray] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(travelDays);
    let data = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a tranvel assistant",
        },
        {
          role: "user",
          content: `Create an Itinerary for a ${travelDays}-day trip to ${cityData.properties.title}. Make sure to include the most beautiful yet safe places I can explore. Include a moderate amount of things to do since I also want some time to relax. Please format your answer only in p and h3 as JSX tags.`,
        },
      ],
    });

    let config = {
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        config
      );
      console.log(response.data["choices"][0]["message"]["content"]);
      const result = response.data["choices"][0]["message"]["content"];
      setItineray(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlur = () => {
    // Perform validation when the user stops typing
    if (!travelDays || travelDays < 1) {
      setError("Please enter a valid number of days.");
    } else if (travelDays > 7) {
      setError("Please enter number less than 7");
    } else {
      setError("");
    }
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", marginTop: "3rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: "56.25%",
              }}
              image={`${cityData.properties.image}`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {cityData.properties.title}
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam dolores vero perferendis laudantium, consequuntur
                voluptatibus nulla architecto.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <ShowPageMapView city={cityData} />
        </Grid>

        <Grid item xs={12}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Enter the days of your itinerary
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, mb: 5 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  type="number"
                  inputProps={{ min: 1 }}
                  label="Number of Days Stay"
                  name="Number"
                  autoFocus
                  required
                  error={Boolean(error)}
                  helperText={error}
                  onChange={(e) => setTravelDays(e.target.value)}
                  onBlur={handleBlur}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Click to generate a travel plan
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <div dangerouslySetInnerHTML={{ __html: itinerary }} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShowPage;
