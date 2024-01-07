import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Paper
} from '@mui/material'

import "./ImagesCarousel.scss"
import { DefaultSettingsT} from '../Settings/Settings';

const ImagesCarousel = () => {

    return (
            <Carousel
                className="SecondExample"
                {...DefaultSettingsT}
            >
                {
                    items.map((item, index) => {
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
             srcSet={`${item.href}?w=164&h=400&fit=crop&auto=format&dpr=2 2x`}
             src={`${item.href}?w=164&h=400&fit=crop&auto=format`}
            />
        </Paper>
    )
}

const items = [
    {
        name: "Lear Music Reader",
        description: "A PDF Reader specially designed for musicians.",
        color: "#64ACC8",
        href: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VHJhdmVsfGVufDB8fDB8fHww'
    },
    {
        name: "Hash Code 2019",
        description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
        color: "#7D85B1",
        href:'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
        name: "Terrio",
        description: "A exciting mobile game game made in the Unity Engine.",
        color: "#CE7E78",
        href: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
        name: "React Carousel",
        description: "A Generic carousel UI component for React using material ui.",
        color: "#C9A27E",
        href: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D'
    }
]

export default ImagesCarousel;