import React from 'react'
import { Menu } from 'antd'

import '../../CSS/navigation.css'

const items = [
  {
    label: 'Search',
    key: 'searchFilm',
  },
  {
    label: 'Rated',
    key: 'addFilms',
  },
]
class Navigation extends React.PureComponent {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    key: 'searchFilm',
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  onClick = (e) => {
    this.props.rateFilms(e.key)
    this.setState({
      key: e.key,
    })
  }

  render() {
    return <Menu onClick={this.onClick} selectedKeys={this.state.key} mode="horizontal" items={items} />
  }
}
export default Navigation
