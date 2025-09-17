import React from 'react'
import Navbar from '../../Components/Navbar'
import Themebar from '../../Components/Themebar'
import Main2 from '../../Components/Basic-Elements/blockquotes/Main2'
import Footer from '../../Components/Footer'

const Blockquotes = () => {
  return (
    <>
      <Navbar/>
      <Themebar/> 
      <div className='relative'>
        <Main2/>
      </div>
      <Footer/>
    </>
  )
}

export default Blockquotes
