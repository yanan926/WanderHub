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
} from "@mui/material";

import { Link} from "react-router-dom";

function HomePage({citiesData}) {
  return (
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
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/city/${card.properties.id}`}>
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
