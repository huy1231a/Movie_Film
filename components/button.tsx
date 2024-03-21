import React from 'react'

interface PropButton {
  contend: string
  bg?: string
  bgHover?: string
  onClick?: any
  textCl?: string
}

const Button: React.FC<PropButton> = ({
  contend,
  bg,
  bgHover,
  onClick,
  textCl,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full ${bg} py-3 rounded-md  ${textCl} font-semibold hover:${bgHover} transition `}>
      {contend}
    </button>
  )
}

export default Button
