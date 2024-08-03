import React from 'react'
import Categorylist from '../components/Categorylist'
import Slidingwindow from '../components/Slidingwindow'
import Horizontalproductcard from '../components/Horizontalproductcard'
import Verticalproductcard from '../components/Verticalproductcard'

const Home = () => {

  return (
    <div className=' pt-20 px-10 min-h-screen'>
      <Slidingwindow/>
      <Categorylist/>

      <Horizontalproductcard category={"mobiles"} heading={"Top's Mobiles"}/>
      <Horizontalproductcard category={"watches"} heading={"Popular's Watches"}/>  
      <Verticalproductcard category={"mobiles"} heading={"Best seller"}/>  
    </div>
  )
}

export default Home