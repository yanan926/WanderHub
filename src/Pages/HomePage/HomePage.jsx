import ClusterMap from "../../Components/ClusterMap/ClusterMap";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
  CircularProgress
} from "@mui/material";

import { Link } from "react-router-dom";
import CircularWithValueLabel from "../../Components/CircularWithValueLabel";

function HomePage({ citiesData }) {
  return citiesData.length === 0 ? (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <Typography variant="h5">Patience, please! Our server briefly deactivates  after 15 minutes of inactivity, reactivating it upon new requests. This process, lasting a few seconds, may cause a momentary delay during initial page loads.</Typography>
      <Container sx={{mt:5}}> <CircularWithValueLabel style={{ width: "80px", height: "80px" }} /></Container>
     
    </Container>
  ) : (
    <Container maxWidth="lg">
      <ClusterMap cities={citiesData} />
      <Grid container spacing={4} sx={{ marginTop: "1rem" }}>
        {citiesData.map((card) => (
          <Grid item key={card.properties.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image={`${card.properties.image}`}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.properties.title}
                </Typography>
                <Typography>{`${card.description}`}</Typography>
              </CardContent>
              <CardActions>
                <Link to={`/${card.properties.id}`}>
                  <Button size="small">View</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
