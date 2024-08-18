import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

import ServiseApi from '../../service/serviceApi'
import '../../CSS/searchFilms.css'

class SearchFilm extends React.PureComponent {
  serviseApi = new ServiseApi()

  handleClick = debounce((value) => {
    this.props.onFilmLoading(value, false)
    this.requestFilms(value)
    this.props.changeValue(value)
  }, 1800)

  requestFilms = (value) => {
    if (value.trim()) {
      this.serviseApi
        .filmsInfo(value)
        .then((res) => {
          this.props.onTotalPages(res.total_results)
          return res.results.map(this.props.filmComponent)
        })
        .then((res) => {
          this.props.onRequest(res)
        })
        .catch((err) => {
          console.log(err)
          this.props.onErrorFilmsStatus(err)
        })
    }
  }

  render() {
    return (
      <div className="main-search">
        <Input onChange={(e) => this.handleClick(e.target.value)} placeholder="Type to search" />
      </div>
    )
  }
}

export default SearchFilm
