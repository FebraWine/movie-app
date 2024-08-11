import React from 'react'
import { Pagination } from 'antd'

import '../../CSS/paginationFilms.css'

class PaginationFilms extends React.PureComponent {
  state = {
    total: null,
    page: 1,
  }

  componentDidUpdate(prevProps) {
    if (this.props.page !== prevProps.page) {
      this.setState({
        page: this.props.page,
      })
    }

    if (this.props.value !== prevProps.value || this.props.total !== prevProps.total) {
      this.setState({
        total: this.props.total,
        page: 1,
      })
    }
  }

  render() {
    const { total, page } = this.state

    return (
      <Pagination
        className="main-pagination"
        defaultCurrent={1}
        current={page}
        defaultPageSize={20}
        total={total}
        onChange={(pageNumber) => this.props.changePage(pageNumber)}
      />
    )
  }
}

export default PaginationFilms
