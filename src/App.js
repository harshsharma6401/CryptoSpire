import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import HomePage from './Pages/Homepage';
import CoinPage from "./Pages/CoinPage"
import { makeStyles } from '@mui/styles';
// import Banner from './components/Banner/Banner'


const useStyles = makeStyles(()=>({
  App: {
    backgroundColor: "#14161a",
    color:"#fff",
    minHeight:"100vh",
  },
}));

function App() {

  
  const classes = useStyles();

  return (
  

      <BrowserRouter>

      <div className={classes.App}>
        <Header/> 
        <Routes>
        <Route path = '/' element = {<HomePage />} exact/>
        <Route path = '/coins/:id' element = {<CoinPage />} exact/>
        {/* <Route path="/" component={HomePage} exact /> 
          has changed to  <Route path="/" element={<HomePage/>} exact /> in V6 */}
        
        {/* https://tinyurl.com/soRoute */}

        </Routes>
        
         {/* <Banner/> */}
         
      </div>

      </BrowserRouter>

  );
}

export default App;
