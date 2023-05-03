import { Box } from '@mui/material';

export default function StandardImageList() {
/*
    const showImg = (img: string, title: string) => {
        Swal.fire({
            html:
                '<img data-testid="carruselImg" alt="' + title + '"src="' + img + '"></img',
            width: '90vw',
            confirmButtonColor: '#81c784'
        }).then(() => { }).catch((e) => {
            showError("Error al mostrar fotografías", "Error inesperado mostrando la fotografía, vuelva a probar.", Swal.close)
        })
    }*/

    return (/*
        <ImageList cols={1} data-testid="imgCarruselComp">
            <ImageListItem key="1.png">
                <img
                    src="1.png?w=164&h=164&fit=crop&auto=format"
                    srcSet="1.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
                    alt="Crea tus propios mapas"
                    loading="lazy"
                />
                <ImageListItemBar
                    title="Crea tus propios mapas"
                    actionIcon={
                        <IconButton
                            data-testid="imgButton0"
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label="info about Crea tus propios mapas"
                            onClick={() => showImg("1.png", "Crea tus propios mapas")}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    }
                />
            </ImageListItem>
            <ImageListItem key="2.png">
                <img
                    src="2.png?w=164&h=164&fit=crop&auto=format"
                    srcSet="2.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
                    alt="Guarda tus lugares favoritos"
                    loading="lazy"
                />
                <ImageListItemBar
                    title="Guarda tus lugares favoritos"
                    actionIcon={
                        <IconButton
                            data-testid="imgButton1"
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label="info about Guarda tus lugares favoritos"
                            onClick={() => showImg("2.png", "Guarda tus lugares favoritos")}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    }
                />
            </ImageListItem>
            <ImageListItem key="3.png">
                <img
                    src="3.png?w=164&h=164&fit=crop&auto=format"
                    srcSet="3.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
                    alt="Ve los mapas de tus amigos"
                    loading="lazy"
                />
                <ImageListItemBar
                    title="Añade a tus amigos"
                    actionIcon={
                        <IconButton
                            data-testid="imgButton2"
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label="info about Añade a tus amigos"
                            onClick={() => showImg("3.png", "Añade a tus amigos")}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    }
                />
            </ImageListItem>
            <ImageListItem key="4.png">
                <img
                    src="4.png?w=164&h=164&fit=crop&auto=format"
                    srcSet="4.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x"
                    alt="Ve los mapas de tus amigos"
                    loading="lazy"
                />
                <ImageListItemBar
                    title="Ve los mapas de tus amigos"
                    actionIcon={
                        <IconButton
                            data-testid="imgButton3"
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label="info about Ve los mapas de tus amigos"
                            onClick={() => showImg("4.png", "Ve los mapas de tus amigos")}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    }
                />
            </ImageListItem>
        </ImageList>*/
        <Box data-testid="imgCarruselComp">
            <img    className="imgCarrusel"
                    src="img1.png"
                    alt="Crea tus propios mapas"
            />
            <img    className="imgCarrusel"
                    src="img2.png"
                    alt="Guarda tus lugares favoritos" 
             />
             <img   className="imgCarrusel"
                    src="img3.png"
                    alt="Ve los mapas de tus amigos"
            />
            
        </Box>
    );
}