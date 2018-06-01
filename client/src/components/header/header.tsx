import * as React from 'react'
import './header.css'

export default (props: any) => {
  return (
    <div className="header" onClick={props.onClick}>
      <h1>{props.name}</h1>
    </div>
  )
}
