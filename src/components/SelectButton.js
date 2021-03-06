import React from 'react'
import { styled } from '@mui/system';


const SelectButton = ({ children, selected, onClick }) => {

    const SelectBtn = styled('span')(({ theme }) => ({

        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
        },
        width: "22%",
        [theme.breakpoints.down("sm")]: {
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            textAlign: 'center'
          },  
      
    }));

    return (
        <SelectBtn onClick={onClick} >{children} </SelectBtn>
    )
}

export default SelectButton