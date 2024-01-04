import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  CardActions,
} from "@mui/material";

const TravellerReview =({name, reviewText, reviewValue})=>{
  return (
    <Card sx={{ minWidth: 200, width:'80%', margin:"auto", marginBottom:"1rem"}}>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="text.secondary"
              >
                {name}
              </Typography>
              <Rating
                  name="review"
                  value={reviewValue}
                />
              <Typography variant="body2">
                {reviewText}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Delete</Button>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
  )
}

export default TravellerReview;