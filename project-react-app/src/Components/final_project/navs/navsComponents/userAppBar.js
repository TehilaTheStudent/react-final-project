import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';

export default function ButtonAppBar(props) {
    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" >
                <Toolbar>
                    <Button color="inherit" onClick={props.pressLogout}>יציאה</Button>


                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign={'center'}>
                        {/* אתר הקניות */}
                    </Typography>
                    <Button color="inherit" onClick={props.pressAbout}>אודות</Button>
                    <Button color="inherit" onClick={props.pressMyOrders} sx={{ marginRight: 3.5 }}>הזמנות שלי</Button>

                    <IconButton onClick={props.pressViewCart}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCartCheckoutIcon />
                    </IconButton>
                    <Button color="inherit" onClick={props.pressAllProducts} sx={{ marginRight: 2 }}>מוצרים</Button>
                    <Tooltip title={`${currentLoggedUser.firstName} ${currentLoggedUser.lastName}`    }placement="left">
                        <AccountCircleIcon></AccountCircleIcon>

                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    );
}