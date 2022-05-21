import React from "react";
import { useParams } from "react-router-dom";

const CoinPage = () =>{
    const {id} = useParams();
    
    return (

        <div>

        Coin Page

        </div>

    )

}

export default CoinPage;