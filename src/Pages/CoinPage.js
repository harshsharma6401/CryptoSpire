import { Typography } from "@mui/material";
import { styled } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from '../config/api';
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser from 'react-html-parser';
import { LinearProgress } from "@mui/material";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);

    }

    console.log(coin);

    useEffect(() => {

        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const MyContainer = styled('div')(({ theme }) => ({
        display: "flex",
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignIntems: 'center'
        }
    }));

    const Sidebar = styled('div')(({ theme }) => ({
        width: '30%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
        borderRight: '2px solid grey'
    }));

    const MarketData = styled('div')(({ theme }) => ({
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
      
    }));

    if(!coin) return   <LinearProgress style={{ backgroundColor: "gold" }} />

    return (

        <MyContainer className="container">

            <Sidebar className="sidebar">

                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height='200'
                    style={{ marginBottom: 20 }}
                />
                <Typography variant='h3'
                    sx={{
                        fontWeight: "bold",
                        marginBottom: '20px',
                        fontFamily: "Montserrat",
                    }} >
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1"
                    sx={{
                        width: "100%",
                        fontFamily: "Montserrat",
                        padding: '25px',
                        fontSize:'1.11rem',
                        paddingBottom: '15px',
                        paddingTop: 0,
                        textAlign: "justify",
                      
                    }}>
                    {ReactHtmlParser(coin?.description.en.split(". ")[0])}
                </Typography>
                <MarketData>

                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5' sx={{ fontFamily: 'Montserrat' ,fontWeight:'700',paddingBottom: '15px'}}>
                            Rank:{"  "}
                            {coin?.market_cap_rank}
                            &nbsp; &nbsp;
                        </Typography>
                    </span>

                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5' sx={{ fontFamily: 'Montserrat',fontWeight:'700',paddingBottom: '15px' }}>
                            Current Price:{"  "}
                            {symbol}{" "}
                             {numberWithCommas(
                              coin?.market_data.current_price[currency.toLowerCase()]
                              )}
                            &nbsp; &nbsp;
                        </Typography>
                    </span>

                    <span style={{ display: 'flex' }}>
                        <Typography variant='h5' sx={{ fontFamily: 'Montserrat' ,fontWeight:'700',paddingBottom: '15px'}}>
                            Market Cap:{"   "}
                            {symbol}{" "}
                             {numberWithCommas(
                             coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)
                             )}{" "}M
                        </Typography>
                    </span>

                </MarketData>
            </Sidebar>

            <CoinInfo coin={coin}></CoinInfo>
        </MyContainer>

    )

}

export default CoinPage;