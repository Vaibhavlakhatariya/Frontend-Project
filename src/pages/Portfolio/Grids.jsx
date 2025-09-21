import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Grid from '../../Components/Portfolio/Grid/Grid'

const Grids = () => {
  return (
    <>
      <Navbar/>
      <div className='relative'>
        <Grid/>
      </div>
      <Footer/>
    </>
  )
}

export default Grids
