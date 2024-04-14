import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Tooltip from '@mui/material/Tooltip';

export default function ButtonAppBar(props) {
    console.log(props)
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" >
                <Toolbar>
                    <Button color="inherit" onClick={props.pressLogout}>יציאה</Button>


                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign={'center'}>
                        {/* אתר הקניות */}
                    </Typography>
                    <Button color="inherit" onClick={props.pressAbout}>אודות</Button>
                    <Button color="inherit" onClick={props.pressAddProduct}>הוספת מוצר</Button>
                    <Button color="inherit" onClick={props.pressAllUsers}>משתמשים</Button>
                    <Button color="inherit" onClick={props.pressAllOrders}>הזמנות</Button>

                    <Button color="inherit" onClick={props.pressAllProducts} sx={{ marginRight: 2 }}>מוצרים</Button>
                    <Tooltip title="מנהל האתר" placement="left">
                        <AdminPanelSettingsIcon></AdminPanelSettingsIcon>

                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    );
}