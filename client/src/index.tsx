import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Layout from './layout'
import './index.css'
import dataProvider from './providers'

const provider = dataProvider('http://localhost')
console.log(provider)

ReactDOM.render(<Layout dataProvider={provider} />, document.getElementById(
  'root'
) as HTMLElement)
