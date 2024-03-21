import React from 'react'

interface NavbarItemProps {
  label: string
}
const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className='text-gray-200 hover:text-gray-400 cursor-pointer transition'>
      {label}
    </div>
  )
}

export default NavbarItem
