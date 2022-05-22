import React from "react";
import { AppBar, Container, Select, Toolbar, Typography, MenuItem, createTheme } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
//import {BrowserRouter} from 'react-router-dom';
//import {useHistory} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import {MenuItem} from "@mui/icons-material";
import { CryptoState } from "../CryptoContext";


const useStyles = makeStyles(() => ({

    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },

}));

const darkTheme = createTheme({

    palette: {
        primary: {
            main: '#fff',
        },
        type: 'dark'
    },

});

const Header = () => {

    const classes = useStyles();
    const navigate = useNavigate();

    //const history = useHistory();
    //History replaced by navigate
    //https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom
    const { currency, setCurrency } = CryptoState();
    console.log(currency);


    return (

        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static' >
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate("/")} variant="h5" className={classes.title}
                            sx={{
                                flex: 1,
                                color: "gold",
                                fontFamily: "Montserrat",
                                fontWeight: "bolder",
                                cursor: "pointer",
                            }}
                        >Crypto Spire</Typography>

                        <Select variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            style={{
                                width: 100,
                                height: 40,
                                marginLeft: 15,
                                color: 'white'
                            }}

                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            
                            
                        >
                            <MenuItem value={"USD"}> USD</MenuItem>
                            <MenuItem value={"INR"}> INR</MenuItem>

                        </Select>

                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )

};

export default Header;