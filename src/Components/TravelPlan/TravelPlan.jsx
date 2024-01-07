import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,

} from "@mui/material";
import { useState} from "react";
import axios from "axios";
import CircularWithValueLabel from "../../Components/CircularWithValueLabel";

const TravelPlan = () => {

  const [travelDays, setTravelDays] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const validCheck = () => {
    let valid = false;
    if (!travelDays || travelDays < 1) {
      setError("Please enter a valid number of days.");
    } else if (travelDays > 15) {
      setError("Please enter number less than 15");
    } else {
      setError("");
      valid = true;
    }
    return valid;
  };

  const handleBlur = () => {
    // Perform validation when the user stops typing
    validCheck();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validCheck()) {
      return;
    }
    setLoading(true);
    const data = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a tranvel assistant",
        },
        {
          role: "user",
          content: `Create an itinerary for a ${travelDays}-day trip to ${cityData.properties.title}.`,
        },
        {
          role: "user",
          content: "Include the most beautiful yet safe places to explore.",
        },
        {
          role: "user",
          content:
            "Include a moderate amount of things to do, allowing for some relaxation time.",
        },
        {
          role: "user",
          content: "Format your answer using only p and h3 as JSX tags.",
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
      const result = response.data["choices"][0]["message"]["content"];
      setItineray(result);
      setTravelDays(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  return (
    <Grid item xs={12} md={6}>
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Plan Your Itinerary
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            type="number"
            inputProps={{ min: 1 }}
            label="Number of Days Stay"
            name="Number"
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
            disabled={loading}
          >
            Generate A Travel Plan
          </Button>
          {loading && <CircularWithValueLabel />}
        </Box>
      </Box>
    </Container>
  </Grid>


  )

}

export default TravelPlan