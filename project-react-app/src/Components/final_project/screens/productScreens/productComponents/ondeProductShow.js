import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Divider from '@mui/material/Divider';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import * as MyStyled from '../../../Styles/StyledComponents'
import { lightBlue, blueGrey, yellow } from '@mui/material/colors';
import NumberInput from './numberInput'
import EditNoteIcon from '@mui/icons-material/EditNote';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import * as statuses from '../../../features/statuses'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { textAlign } from '@mui/system';
import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '60vh',
    border: 'none',
    boxShadow: 'none',

}));

export default function OneProductShow({ product, qty, setQty, press }) {
    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)

    const [open, setOpen] = useState({
        open: false,
        Transition: Fade,
    });
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
      }

    const handleClick = (Transition) =>  {
        setOpen({
            open: true,
            Transition,
        });
    };

    const handleClose = () => {
        setOpen({
            ...open,
            open: false,
        });
    };




    return (
        <Box sx={{ flexGrow: 1 }} padding={'130px 5vw 0 5vw'}>

            <Grid container spacing={12} direction={'row-reverse'} justifyContent="center"
                alignItems="flex-start">
                <Grid item width={"80vh"}>
                    <Paper elevation={6}>
                        <Item>
                            <img style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "fill",
                                borderRadius: "4%",
                            }} src={product.imgUrl}></img>
                        </Item>
                    </Paper>
                </Grid>
                <Grid item xs={8} md={6} >

                    {/* <Paper > */}
                    <Item >
                        <Typography variant="h1" gutterBottom textAlign={'right'} marginBottom={1}>
                            {product.name}
                        </Typography>
                        <Typography variant="h3" gutterBottom textAlign={'right'} >
                            {product.price} $    ליחידה
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'flexStart',
                                flexDirection: 'row-reverse',
                                direction: "column-reverse",
                                // border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                gap: '20px',
                                bgcolor: 'background.paper',
                                color: 'text.secondary',
                                '& svg': {
                                    m: 1,
                                },
                            }}
                        >
                            <Typography gutterBottom textAlign={'right'} fontSize={'25px'}>
                                {product.company    } &nbsp;יצרן
                            </Typography>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Typography fontSize={'20px'} gutterBottom textAlign={'right'}>
                                {product.prodDate} ת. יצור
                            </Typography>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Typography fontSize={'20px'} gutterBottom textAlign={'right'}>
                                {product.content}
                            </Typography>
                        </Box>
                        <Typography fontSize={'20px'} gutterBottom textAlign={'right'} direction='rtl'>
                            {product.isCooling ? <> <MyStyled.MyStyledSpanTextSpan> דרוש קירור</MyStyled.MyStyledSpanTextSpan>
                                <MyStyled.MyStyledSpan><SevereColdIcon fontSize='large' color='primary' ></SevereColdIcon></MyStyled.MyStyledSpan>
                            </>
                                :
                                <> <MyStyled.MyStyledSpanTextSpan >לא דרוש קירור</MyStyled.MyStyledSpanTextSpan>
                                    <MyStyled.MyStyledSpan><WbSunnyIcon fontSize='large' sx={{ color: yellow[500] }}></WbSunnyIcon></MyStyled.MyStyledSpan>
                                    <MyStyled.MyStyledSpan><AcUnitIcon fontSize='large' sx={{ color: lightBlue[500] }}></AcUnitIcon></MyStyled.MyStyledSpan>
                                </>}
                        </Typography>
                        <Typography fontSize={'20px'} gutterBottom textAlign={'right'} direction='rtl'>
                            {product.description}
                        </Typography>
                        <Typography paddingTop={2} textAlign={'right'}>
                            {currentLoggedUser == statuses.manager ? <>

                                <Button size='large' variant="contained" textAlign="right" startIcon={<EditNoteIcon />} onClick={press}>
                                    ערוך
                                </Button>

                            </> : <>
                                <NumberInput qty={qty} setQty={setQty} press={press} handleClick={handleClick} SlideTransition={SlideTransition}></NumberInput>
                            </>}
                        </Typography>
                    </Item>
                    {/* </Paper> */}
                </Grid>
            </Grid>
            <Snackbar
                open={open.open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={`מוצר ${product.name} ${qty} נוסף לעגלה`}
                TransitionComponent={open.Transition}
                key={open.Transition.name}
            />

        </Box>
    );
}
