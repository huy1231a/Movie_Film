import React from 'react'

interface PropButton {
  contend: string
  bg?: string
  bgHover?: string
  onClick?: any
}

const Button: React.FC<PropButton> = ({ contend, bg, bgHover, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full ${bg} py-3 rounded-md text-white font-semibold hover:${bgHover} transition `}>
      {contend}
    </button>
  )
}

export default Button
