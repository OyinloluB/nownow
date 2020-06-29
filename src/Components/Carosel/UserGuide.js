import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel'
import "./UserGuide.css";
import  d_guide1  from "../../assets/d_guide1.JPG";
import  d_guide2  from "../../assets/d_guide2.JPG";
import  d_guide3  from "../../assets/d_guide3.JPG";
import  d_guide4  from "../../assets/d_guide4.JPG";
import  d_guide5  from "../../assets/d_guide5.JPG";
import  d_guide6  from "../../assets/d_guide6.JPG";

import  b_guide1  from "../../assets/b_guide1.jpg";
import  b_guide2  from "../../assets/b_guide2.jpg";
import  b_guide3  from "../../assets/b_guide3.jpg";
import  b_guide4  from "../../assets/b_guide4.jpg";
import  b_guide5  from "../../assets/b_guide5.jpg";
import  b_guide6  from "../../assets/b_guide6.jpg";

import  p_guide1  from "../../assets/p_guide1.jpg";
import  p_guide2  from "../../assets/p_guide2.jpg";
import  p_guide3  from "../../assets/p_guide3.jpg";
import  p_guide4  from "../../assets/p_guide4.jpg";
import  p_guide6  from "../../assets/p_guide6.jpg";
import CancelIcon from '@material-ui/icons/Cancel';

function UserGuide({props, setReadUserGuide, userType}) {

    function handleClose() {
        setReadUserGuide(false);
    }
    
    if (userType === 'distributor') {
        var items = [
            { image: d_guide1 },
            { image: d_guide2 },
            { image: d_guide3 },
            { image: d_guide4 },
            { image: d_guide5 },
            { image: d_guide6 },
        ]
    }

    else if(userType === 'bulkbreaker') {
        var items = [
            { image: b_guide1 },
            { image: b_guide2 },
            { image: b_guide3 },
            { image: b_guide4 },
            { image: b_guide5 },
            { image: b_guide6 },
        ]
    }

    else if(userType === 'poc') {
        var items = [
            { image: p_guide1 },
            { image: p_guide2 },
            { image: p_guide3 },
            { image: p_guide4 },
            { image: p_guide6 },
        ]
    }
    
 
    return (
        <div>
           <CancelIcon  onClick={handleClose}  style={{backgroundColor: "#B11917", color: "white", fontSize: "30px", position: 'relative', top: '55px', zIndex: 1, backgroundRadius: '5px', cursor: 'pointer'}} className={'float-right mr-1'}/>
            <Carousel autoPlay={false}>
                {
                    items.map( item => <Item item={item} /> )
                }
            </Carousel>
        </div>
    )
    

}

function Item(props)
{
    return (
        <img src={props.item.image} className={'image'}/>
    )
}



export default UserGuide;

