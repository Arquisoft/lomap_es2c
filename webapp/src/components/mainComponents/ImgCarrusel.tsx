import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styled from '@emotion/styled';
import { Box, IconButton, ImageListItemBar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';

export default function StandardImageList() {

    const showImg = (img: string, title: string) => {
        Swal.fire({
            html:
                '<img alt="' + title + '"src="' + img + '"></img',
            width: '90vw',
            confirmButtonColor: '#81c784'
        })
    }

    return (
        <ImageList cols={1}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                                onClick={() => showImg(item.img, item.title)}
                            >
                                <VisibilityIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: '/fotosCarrusel/1.png',
        title: 'Crea tus propios mapas',
    },
    {
        img: '/fotosCarrusel/2.png',
        title: 'Guarda tus lugares favoritos',
    },
    {
        img: '/fotosCarrusel/4.png',
        title: 'Ve los mapas de tus amigos',
    }
];