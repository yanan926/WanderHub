import ShowPageMapView from "../../Components/MapView/ShowPageMapView";
import { useParams, useNavigate } from "react-router-dom";
import {Box, Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ShowPage({ citiesData }) {
  const { cityId } = useParams();
  console.log(cityId)

  const cityData = citiesData.find((city) => city.properties.id=== cityId);

  if (!cityData) {
    return <div>City not found!</div>;
  }
  return(
    <Box sx={{ width: "90%", margin:'auto' }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
      <Card
            >
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
    </Grid>
  </Box>
  );
}


export default ShowPage;
