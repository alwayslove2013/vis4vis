import React from "react";
import './index.scss'

export const Header = ({title, affliation}) => {
  return (
    <div className="header">
      <div className="title">{title}</div>
      <div className="title">{affliation}</div>
    </div>
  )
}

export default Header