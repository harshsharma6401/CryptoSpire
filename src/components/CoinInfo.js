import { CircularProgress, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { styled } from '@mui/system';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { CryptoState } from "../CryptoContext";
import SelectButton from './SelectButton';
Chart.register(...registerables);

const CoinInfo = ({ coin }) => {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  }

  useEffect(() => {

    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days])


  console.log('historicData', historicData);

  const darkTheme = createTheme({

    palette: {
      primary: {
        main: '#fff',

      },
      secondary: {
        main: '#FFD700'
      },
      type: 'dark'
    }
  });

  const MyContainer = styled('div')(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));



  return (
    <ThemeProvider theme={darkTheme}>

      <MyContainer>
        {/* Chart */}
        {
          !historicData ? (
            <CircularProgress style={{ color: 'gold' }}
              size={250}
              thickness={1} />

          ) : (
            <>  <Line data={{
              labels: historicData.map(coin => {
                let date = new Date(coin[0]);

                let time =
                  date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();

              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price (Past ${days} Days ) in ${currency}`,
                  borderColor: '#EEBC1D',
                },
              ],

            }}

              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}

            />
              {/* Buttons */}
              <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-around', width: '100%' }}>
                {chartDays.map(day => (
                  <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}> {day.label} </SelectButton>
                ))}
              </div>
            </>
          )}
    
      </MyContainer>
    </ThemeProvider>
  )
}

export default CoinInfo
