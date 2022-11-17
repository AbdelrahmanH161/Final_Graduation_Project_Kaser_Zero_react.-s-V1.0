import {useEffect} from 'react'
import About_section from '../components/home/About_section'
import Choose_us_section from '../components/home/Choose_us_section'
import Downlode_App from '../components/home/Downlode_App'
import Slider_section from '../components/home/Slider_section'
import Top_cat_section from '../components/home/Top_cat_section'
import "./Home.css"
function Home() {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  return (
    <>
    <About_section/>
    <Top_cat_section/>
    <Choose_us_section/>
    <Slider_section />
    <Downlode_App/>
    </>
  )
}

export default Home
