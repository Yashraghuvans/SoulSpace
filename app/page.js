import React from 'react'
import NavBar from './Components/NavBar'
import Main from './Components/Main'

const page = () => {
  return (
    <>
      <div className='bg-black/70'>
        <NavBar/>
        <Main/>
      </div>
    </>
  )
}

export default page