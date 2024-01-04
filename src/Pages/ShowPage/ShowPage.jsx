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
  ImageList,
  ImageListItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import CircularWithValueLabel from "../../Components/CircularWithValueLabel";
import TravellerReview from "../../Components/TravellerReview";
import ImagesCarousel from "../../Components/ImagesCarousel/ImagesCarousel";
import { v4 as uuidv4 } from "uuid";
import imageList from "../../image";
import ImageModal from "../../Components/ImageModal";
import ImageUploadForm from "../../Components/ImageUploadForm";
import "./ShowPage.scss";

function ShowPage({ citiesData }) {
  const { cityId } = useParams();

  const cityData = citiesData.find((city) => city.properties.id === cityId);

  if (!cityData) {
    return <div>City not found!</div>;
  }

  const travelReviews = [
    {
      key: uuidv4(),
      name: "John Doe",
      reviewText: "Breathtaking views and unforgettable experiences!",
      reviewValue: 3,
    },
    {
      key: uuidv4(),
      name: "Jane Smith",
      reviewText: "The destination exceeded my expectations. A must-visit!",
      reviewValue: 4,
    },
    {
      key: uuidv4(),
      name: "Alex Johnson",
      reviewText: "Immersive cultural experience. Loved every moment.",
      reviewValue: 3,
    },
    {
      key: uuidv4(),
      name: "Emily Davis",
      reviewText:
        "Captivating landscapes and rich history. A 5-star destination.",
      reviewValue: 5,
    },
    {
      key: uuidv4(),
      name: "Michael Brown",
      reviewText: "Interesting but room for improvement. Worth exploring.",
      reviewValue: 1,
    },
  ];

  const [travelDays, setTravelDays] = useState(null);
  const [error, setError] = useState("");
  const [itinerary, setItineray] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewValue, setReviewValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewList, setReviewList] = useState(travelReviews);
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Add your logic for handling the file upload here
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // Add your file upload logic (e.g., using FormData and sending it to the server)
    }
  };

  const handleOpen = (item) => {
    setOpen(true);
    setModalImage(item);
  };
  const handleClose = () => {
    setOpen(false);
    setModalImage("");
  };

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
      setTravelDays(null)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewList([
      { key: uuidv4(), name: "Yanan Liu", reviewText, reviewValue },
      ...reviewList,
    ])
    setReviewText("")
    setReviewValue(0)
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", marginTop: "5rem" }}>
      <ImageModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        image={modalImage}
      />
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
        <Grid item xs={12} md={6} maxWidth="xs">
          <ShowPageMapView city={cityData} />
              <Box component={"form"} sx={{margin:"auto"}}>
              <Typography component="h1" variant="h6" sx={{mt: 1,mb:1, textAlign:"center"}}>
              Upload Your Travel Image
              </Typography>
              <InputLabel htmlFor="file-upload">Select a File to Upload</InputLabel>
                  <TextField
                    type="file"
                    id="image-upload"
                    onChange={handleFileChange}
                    inputProps={{
                      accept: "image/*", // Specify the accepted file types (in this case, images)
                    }}
                    fullWidth
                    sx={{mb: 1}}
                    size="small"
                  />
                  <Box sx={{display:"flex", alignItems:'center'}}>
                  <TextField type="text" placeholder="Or post your image's url Link here" size="small" sx={{width:'70%', mr:3}}/>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    size="small"
                    sx={{width:'40%', p:1}}
                  >
                    Share Your Image
                  </Button>
                  </Box>                
              </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <ImagesCarousel />
        </Grid>

        <Grid item xs={12} md={6}>
          <ImageList
            sx={{ height: 400, marginTop: "0" }}
            cols={3}
            rowHeight={164}
          >
            {imageList.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  className="image-list__img"
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  alt={item}
                  loading="lazy"
                  onClick={() => handleOpen(item)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

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
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
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
                marginTop: 2,
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
                sx={{ mt: 1, mb: 1 }}
              >
                <Rating
                  name="review"
                  value={reviewValue}
                  onChange={(event, newValue) => {
                    setReviewValue(newValue);
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  type="text"
                  name="review"
                  value={reviewText}
                  placeholder="Review Text"
                  multiline
                  rows={3}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 1 }}
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

        <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
          {reviewList.map((traveller, index) => (
            <TravellerReview
              key={index}
              name={traveller.name}
              reviewText={traveller.reviewText}
              reviewValue={traveller.reviewValue}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShowPage;
