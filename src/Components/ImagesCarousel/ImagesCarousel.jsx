import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Paper
} from '@mui/material'
import "./ImagesCarousel.scss"


const DefaultSettingsT = {
    autoPlay: true,
    animation: "fade",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: true,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true
}

const ImagesCarousel = ({imageList}) => {

    return (
            <Carousel
                className="SecondExample"
                {...DefaultSettingsT}
            >
                {
                    imageList.map((item, index) => {
                        return <Project item={item} key={index} />
                    })
                }
            </Carousel>
    )
}

function Project({item}) {
    return (
        <Paper
            className="Project"
            elevation={10}
        >
            <img  style={{height: 'auto'} }
             srcSet={`${item.url}?w=164&h=400&fit=crop&auto=format&dpr=2 2x`}
             src={`${item.url}?w=164&h=400&fit=crop&auto=format`}
            />
        </Paper>
    )
}
export default ImagesCarousel;