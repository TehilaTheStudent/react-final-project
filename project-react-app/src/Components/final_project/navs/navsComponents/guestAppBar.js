import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
export default function ButtonAppBar(props) {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" >
                <Toolbar>
                    <Button color="inherit" onClick={props.pressRegister}>הירשם</Button>
                    <Button color="inherit" onClick={props.pressLogin}>היכנס</Button>


                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign={'center'}>
                        {/* אתר הקניות */}
                    </Typography>
                    <Button color="inherit" onClick={props.pressAbout} sx={{ marginRight: 3.5 }}>אודות</Button>

                    <IconButton onClick={props.pressViewCart}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCartCheckoutIcon />
                    </IconButton>
                    <Button color="inherit" onClick={props.pressAllProducts}>מוצרים</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}