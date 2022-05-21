import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from "../CryptoContext";
import { Paper } from '@mui/material';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coinstable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();

    const fetchCoins = async () => {

        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
        console.log('Coins : ', coins);
    }

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

        //const classes = useStyles();
        const navigate = useNavigate();


    const darkTheme = createTheme({

        palette: {
            primary: {
                main: '#fff',
               
            },
            secondary:{
               main:'#FFD700'
            },
            type: 'dark'
        }
    });

    /* const useStyles = makeStyles((theme) => ({
        row: {
            backgroundColor: '#16171a',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#131111',
            },
            fontFamily: 'Montserrat',
        },
    
        pagination: {
            '& .MuiPaginationItem-root': {
                color: 'gold',
            },
        }
    }));
 */
    const handleSearch = () => {

        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search)
            || coin.symbol.toLowerCase().includes(search)
        );
    }



    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant='h4'
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    CryptoCurrency Prices by Market Cap
                </Typography>

                <TextField label="Search For a Crypto Currency.." 
                    variant="outlined"
                    sx={ {  input: { color: '#fff' }  }  }
                    style={{ marginBottom: 20, width: "100%" ,color: 'white' }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer component  ={Paper}>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table>

                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (

                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontSize: 18,
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat"
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "center" : "right"}
                                            >
                                                {head}

                                            </TableCell>

                                        ))}

                                    </TableRow>
                                </TableHead >

                                <TableBody>
                                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {

                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                // className ={}
                                                sx={{

                                                    backgroundColor: '#16171a',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: '#131111',
                                                    },
                                                    fontFamily: 'Montserrat',
                                                }}
                                                key={row.name}
                                            >

                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '15'

                                                    }}
                                                
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />

                                                    <div
                                                        style={{ display: 'flex', flexDirection: 'column' ,paddingLeft:'20px'}}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform: 'uppercase',
                                                                fontSize: 22,
                                                                color: "#fff"
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: 'darkgrey' }}>{row.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right" style={{ color: "#fff" }}>
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    align='right'
                                                    style={{
                                                        color: profit > 0 ? "rgb(14,203,129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && '+'}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>

                                                <TableCell align="right" style={{ color: "#fff" }}>
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}
                                                    M
                                                </TableCell>

                                            </TableRow>
                                        );

                                    })}

                                </TableBody>

                            </Table>
                        )
                    }
                </TableContainer>

                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: 'center',
                    }}
                    sx={
                        {
                            '& .MuiPaginationItem-root': {
                                color: 'gold',
                            },
                            
                        }
                       
                    }   
                    count={parseInt((handleSearch()?.length / 10).toFixed())}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                    color= 'secondary'
                    
                />
        
            </Container>
        </ThemeProvider>
    )
}

export default Coinstable