import * as React from 'react'
import './app.css'

const bear = require('./bear.jpg')
const logo = require('./logo.svg')

class App extends React.Component<any, any> {
  render() {
    console.log(this.props)
    const myImg = <img src={bear} />
    return (
      <div className="App">
        <header className="App-header">
          {myImg}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
