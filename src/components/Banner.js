import React from 'react'

const Banner = props => {
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : 'bg-light-blue'
  const icon = props.icon ? props.icon : 'fa fa-info-circle'

  return (
    <header
      className={`flex flex-row justify-between items-center ${backgroundColor} h3`}
    >

      <div className="ml2">
        <i className={`${icon} fa-2x`} />
        <div className="ml2">{props.message}</div>
      </div>
    </header>
  )
}

export default Banner
