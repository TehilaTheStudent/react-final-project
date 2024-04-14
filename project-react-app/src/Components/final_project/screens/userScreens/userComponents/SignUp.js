import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InputAdornments from './eyePassword';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ setNewUser, newUser, register,login }) {

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };
    const buttons = (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
                    Top-Center
                </Button>
            </Box>
        </React.Fragment>
    );
    const handleSubmit = (event) => {
        //here to handle submit!!!!!!!
        //TODO: use error=true/false and helperText for validation
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        register()

    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
        console.log(newUser)
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                        <PersonAddIcon fontSize='large' />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        הרשמה
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} paddingBottom={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField dir='rtl'
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="שם משפחה"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                    value={newUser.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField dir='rtl'
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="שם פרטי"
                                    autoFocus
                                    onChange={handleChange}
                                    value={newUser.firstName}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="כתובת מייל"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={newUser.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* <TextField dir='rtl'
                                    required
                                    fullWidth
                                    name="password"
                                    label="סיסמא"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    value={newUser.password}
                                /> */}
                                <InputAdornments handleChange={handleChange} value={newUser.password}></InputAdornments>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField dir='rtl'
                                    autoComplete="given-name"
                                    name="houseNumber"
                                    required
                                    fullWidth
                                    id="houseNumber"
                                    label="מספר בניין"
                                    autoFocus
                                    onChange={handleChange}
                                    value={newUser.houseNumber}
                                />
                            </Grid>  <Grid item xs={12} sm={4}>
                                <TextField dir='rtl'
                                    autoComplete="given-name"
                                    name="street"
                                    required
                                    fullWidth
                                    id="street"
                                    label="רחוב"
                                    autoFocus
                                    onChange={handleChange}
                                    value={newUser.street}
                                />
                            </Grid>  <Grid item xs={12} sm={4}>
                                <TextField dir='rtl'
                                    autoComplete="given-name"
                                    name="city"
                                    required
                                    fullWidth
                                    id="city"
                                    label="עיר"
                                    autoFocus
                                    onChange={handleChange}
                                    value={newUser.city}
                                />
                            </Grid>
                            <Grid item xs={12} textAlign={'right'}>
                                <FormControlLabel dir='rtl'
                                    required
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="
                                    אני רוצה לקבל השראה, מבצעים שיווקיים ועדכונים במייל"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleClick({ vertical: 'top', horizontal: 'center' })}
                        >
                            הירשם
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                            <Button variant='text' size='large' onClick={login}>
                           !  יש לך חשבון? היכנס 
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{ width: 500 }}>
                    {/* {buttons} */}
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        key={vertical + horizontal}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                           נרשמת בהצלחה
                        </Alert>
                    </Snackbar>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}