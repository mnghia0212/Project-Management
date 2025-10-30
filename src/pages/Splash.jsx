import React from 'react'
import Spinner from '../components/Spinner'

const Splash = () => {
  return (
	<div  className='h-screen flex items-center justify-center bg-[var(--surface)]'>
		<Spinner/>
	</div>
  )
}

export default Splash