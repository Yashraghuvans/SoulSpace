import React from 'react'
import NavBar from './Components/NavBar'
import Main from './Components/Main'
import Services from './Components/Services'
import Card from './Components/Cards'
import Footer from './Components/footer'

const page = () => {
  return (
    <>
      <div className='bg-black/70' id='home'>
        <NavBar />
        <div className='h-full'>
          <Main />
        </div>
        <Card />
        <Services/>
        <Footer/>
      </div>
    </>
  )
}

export default page