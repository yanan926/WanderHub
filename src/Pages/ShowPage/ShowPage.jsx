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
  Rating,
  CardActions,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import CircularWithValueLabel from "../../Components/CircularWithValueLabel";

function ShowPage({ citiesData }) {
  const { cityId } = useParams();

  const cityData = citiesData.find((city) => city.properties.id === cityId);

  if (!cityData) {
    return <div>City not found!</div>;
  }

  const travelReviews = [
    {
      name: "John Doe",
      reviewText: "Breathtaking views and unforgettable experiences!",
      reviewValue: 5,
    },
    {
      name: "Jane Smith",
      reviewText: "The destination exceeded my expectations. A must-visit!",
      reviewValue: 4,
    },
    {
      name: "Alex Johnson",
      reviewText: "Immersive cultural experience. Loved every moment.",
      reviewValue: 5,
    },
    {
      name: "Emily Davis",
      reviewText:
        "Captivating landscapes and rich history. A 5-star destination.",
      reviewValue: 5,
    },
    {
      name: "Michael Brown",
      reviewText: "Interesting but room for improvement. Worth exploring.",
      reviewValue: 3,
    },
  ];

  const [travelDays, setTravelDays] = useState(null);
  const [error, setError] = useState("");
  const [itinerary, setItineray] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(0);

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
    console.log(travelDays);
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
      console.log(response.data["choices"][0]["message"]["content"]);
      const result = response.data["choices"][0]["message"]["content"];
      setItineray(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  const handleReviewSubmit = () => {
    e.preventDefault();
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

        <Grid item xs={12} md={6}>
          <Container maxWidth="xs">
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
                sx={{ mt: 1, mb: 5 }}
              >
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

        <Grid item xs={12} md={6}>
          <Container maxWidth="xs">
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
                Leave a Review
              </Typography>

              <Box
                component="form"
                onSubmit={handleReviewSubmit}
                sx={{ mt: 1, mb: 5 }}
              >
                <Rating
                  name="review"
                  value={review}
                  onChange={(event, newValue) => {
                    setReview(newValue);
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  type="text"
                  name="review"
                  placeholder="Review Text"
                  multiline
                  rows={3}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit your review
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>

        <Grid item xs={12} md={6}>
          <Container
            dangerouslySetInnerHTML={{ __html: itinerary }}
            maxWidth="sm"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 200, width:'80%', margin:"auto", marginBottom:"1rem"}}>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="text.secondary"
              >
                Yanan Liu
              </Typography>
              <Rating
                  name="review"
                  value={3}
                />
              <Typography variant="body2">
                well meaning and kindly.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Delete</Button>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShowPage;
