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
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import TravellerReview from "../../Components/TravellerReview";
import ImagesCarousel from "../../Components/ImagesCarousel/ImagesCarousel";
import ImageModal from "../../Components/ImageModal";
import "./ShowPage.scss";
import travelReviews from "../../data/reviews";
import UploadForm from "../../Components/UploadForm/UploadForm";
("../../data/travelReviews");
import TravelPlan from "../../Components/TravelPlan/TravelPlan";

function ShowPage() {
  const { cityId } = useParams();
  const [cityData, setCityData] = useState(null);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [itinerary, setItineray] = useState("");
  const [reviewValue, setReviewValue] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewList, setReviewList] = useState(travelReviews);
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://wanderhubserver.onrender.com/destinations/${cityId}/`
      );
      // console.log(response.data)
      const data = response.data
      setCityData({
        properties: {
          id: data._id,
          title: `${data.city}, ${data.state}`,
          image: data.image.url,
          imageList: data.imageList,
          reviews: data.reviews
        },
        description: data.description,
        geometry: data.geometry,
      });
        const reviewData = data.reviews.map((data)=>{return { username: data.author.username, reviewText: data.reviewText, reviewValue: data.reviewValue,}})
        setReviewList([...reviewData,...travelReviews])
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (item) => {
    setOpen(true);
    setModalImage(item.url);
  };
  const handleClose = () => {
    setOpen(false);
    setModalImage("");
  };


  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const postReview = async () => {
      try {
        const response = await axios.post(
          `https://wanderhubserver.onrender.com/destinations/reviews/${cityId}`,
          {reviewText, reviewValue, userId}
        );
        const data = response.data;
        console.log(data)
        fetchData()
      } catch (err) {
        console.log(err);
      }
    };
    postReview()
    setReviewText("");
    setReviewValue(0);
  };

  return !cityData ? (
    <div>loading</div>
  ) : (
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
              <Typography>{cityData.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} maxWidth="xs">
          <ShowPageMapView city={cityData} />
            <UploadForm cityId={cityId} fetchData={fetchData}/>
        </Grid>

        <Grid item xs={12} md={6}>
          <ImagesCarousel imageList={cityData.properties.imageList}/>
        </Grid>

        <Grid item xs={12} md={6}>
          <ImageList
            sx={{ height: 400, marginTop: "0" }}
            cols={3}
            rowHeight={164}
          >
            {cityData.properties.imageList.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  className="image-list__img"
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  alt={"travel image"}
                  loading="lazy"
                  onClick={() => handleOpen(item)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <TravelPlan cityData={cityData} setItineray={setItineray}/>

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
              name={traveller.username}
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
