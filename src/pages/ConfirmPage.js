import React,{useEffect} from 'react';
import Confirm from '../components/confirm/Confirm'

function ConfirmPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
    return (
        <>
            <Confirm></Confirm>
        </>
    );
}

export default ConfirmPage;