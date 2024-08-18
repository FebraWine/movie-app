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
  state = {
    key: 'searchFilm',
  }

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
