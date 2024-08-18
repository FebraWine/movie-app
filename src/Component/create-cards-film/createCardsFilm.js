import React from 'react'
import { Flex } from 'antd'

import FilmCard from '../film-card/filmCard'
import SpinLoad from '../spin-load/spinLoad'
import OnError from '../on-error/onError'
import NotFilmsResulte from '../not-films-resulte/NotFilmsResulte'

import '../../CSS/createCardsFilm.css'

class FilmCardCreate extends React.PureComponent {
  state = {
    film: [],
    filmLoading: true,
    onError: null,
    message: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.films !== prevProps.films) {
      this.upCard(this.props.films)
      this.notFilmShow(this.props.films)
    }

    // Кто писал этот дурацкий код?
    // Вы
    // А, да, точно я. Так хреново ни кто не напишет

    if (this.props.filmLoading !== prevProps.filmLoading) {
      this.filmLoading()
    }

    if (this.props.nonRateFilm !== prevProps.nonRateFilm) {
      this.nonRateFilms(this.props.nonRateFilm)
    }
  }

  nonRateFilms = (nonRateFilm) => {
    if (nonRateFilm) {
      this.setState({
        onError: true,
      })
    }
    if (!nonRateFilm) {
      this.setState({
        onError: false,
      })
    }
  }

  notFilmShow = (films) => {
    if (films && films.length < 1) {
      this.setState({
        message: true,
      })
    } else {
      this.setState({
        message: false,
      })
    }
  }

  filmLoading = () => {
    this.setState({
      filmLoading: false,
    })
  }

  upCard(film) {
    this.setState({
      film,
      filmLoading: true,
    })
  }

  render() {
    const { addRate, moviesList } = this.props
    const { film, message } = this.state
    let elements
    if (film) {
      elements = film.map((item) => {
        return (
          // <SwapiServiceConsumer>
          //   {(moviesList) => {
          //     return (
          <ul key={item.id}>
            <FilmCard moviesList={moviesList} data={item} addRate={addRate} />
          </ul>
        )
        //     }}
        //   </SwapiServiceConsumer>
        // )
      })
    }
    const notFilms = message ? <NotFilmsResulte /> : null
    const error = this.state.onError ? <OnError /> : null
    const spin = this.state.filmLoading ? elements : <SpinLoad />

    return (
      <div className="mainContent">
        <Flex wrap gap={36}>
          {notFilms || error || spin}
        </Flex>
      </div>
    )
  }
}

export default FilmCardCreate
