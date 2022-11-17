import React,{useState,useEffect} from 'react'
import SeeOffers from './seeOffers/SeeOffers'
import {axiosInstance} from '../config/axios'
import {useLocation} from 'react-router-dom'

function SeeOffersPage() {
    const mine = useLocation().state
    
    return (
        <SeeOffers></SeeOffers>
    )
}

export default SeeOffersPage