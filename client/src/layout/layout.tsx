import * as React from 'react'
import Header from '../components/header/header'
import './layout.css'

class Layout extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      name: 'Q',
      isLoading: true
    }
    setTimeout(() => {
      this.setState({
        name: 'Q v2',
        isLoading: false
      })
    }, 5000)
  }

  render() {
    this.props.dataProvider.hello()
    const { name } = this.state
    const yo = () => {
      console.log('yo')
    }
    const content = <Header name={name} onClick={yo} />
    return <div className="App">{content}</div>
  }
}

export default Layout
