import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div
      className='bg-discord-navbar h-14 flex  items-center gap-3 border-b-2 border-black'
    >
      <Link className='ms-72 p-2 rounded hover:bg-discord-hover' href='/homepage'> Online </Link>
      <Link className='p-2 rounded hover:bg-discord-hover' href='/homepage/all-friend'> All </Link>
      <Link className='p-2 rounded hover:bg-discord-hover' href='/homepage/pending'> Pending </Link>
      <Link className='p-2 rounded text-white bg-discord-button' href='/homepage/add-friend'> Add friend </Link>

    </div>
  )
}

export default Navbar