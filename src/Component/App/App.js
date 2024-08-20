import React from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import Navigation from '../navigation/navigation'
import ServiseApi from '../../service/serviceApi'
import SearchFilm from '../search-films/searchFilms'
import FilmCardCreate from '../create-cards-film/createCardsFilm'
import PaginationFilms from '../pagination-films/paginationFilms'
import OnErrorFilms from '../on-error-films/onErrorFilms'
import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context'

import '../../CSS/app.css'

export default class App extends React.PureComponent {
  state = {
    films: [],
    filmLoading: null,
    total: null,
    page: null,
    guestSessionId: null,
    value: null,
    moviesList: null,
    movieAdd: null,
    nonRateFilm: null,
    serarchShow: null,
    error: false,
  }

  serviseApi = new ServiseApi()

  componentDidMount() {
    this.serviseApi.guestSession().then((res) => {
      this.setState({
        guestSessionId: res.guest_session_id,
      })
    })
    this.getMovieList()
  }

  filmComponent(item) {
    return {
      id: item.id,
      name: item.title,
      date: item.release_date,
      overview: item.overview,
      poster: item.poster_path,
      rating: item.rating,
      voteAverage: item.vote_average.toFixed(1),
      movieList: item.genre_ids,
    }
  }

  addRate = (value, id) => {
    this.serviseApi.addPostRating(value, id, this.state.guestSessionId).catch((err) => {
      console.log(err)
      this.setState({
        error: true,
      })
    })
  }

  onFilmLoading = (value) => {
    this.setState({
      filmLoading: value,
      value,
    })
  }

  changeValue = (value) => {
    this.setState({
      value,
    })
  }

  onRequest = (films) => {
    this.setState({
      films,
    })
  }

  onTotalPages = (total) => {
    this.setState({
      total,
    })
  }

  getMovieList = () => {
    this.serviseApi
      .movieList()
      .then((res) => {
        this.setState({
          moviesList: res,
        })
      })
      .catch(() => {
        this.setState({
          error: true,
        })
      })
  }

  changePage = (page) => {
    this.setState({
      filmLoading: page,
    })
    if (this.state.movieAdd) {
      this.rateFilmsChange(page)
    } else {
      this.serviseApi
        .filmsInfo(this.state.value, page)
        .then((res) => {
          return res.results.map(this.filmComponent)
        })
        .then((res) => {
          this.onRequest(res)
        })
    }

    this.setState({
      page,
    })
  }

  nonRate = () => {
    this.setState({
      nonRateFilm: true,
    })
  }

  onErrorFilmsStatus = () => {
    this.setState({
      error: true,
    })
  }

  rateFilms = (value) => {
    if (value === 'addFilms') {
      this.serviseApi
        .rateFilmsShow(this.state.guestSessionId)
        .then((res) => {
          this.onTotalPages(res.total_results)
          this.setState({
            movieAdd: true,
            serarchShow: true,
          })
          return res.results.map(this.filmComponent)
        })
        .then((res) => this.onRequest(res))
        .catch((error) => this.nonRate(error))
    } else {
      this.serviseApi
        .filmsInfo(this.state.value, 1, null)
        .then((res) => {
          this.setState({
            nonRateFilm: false,
            serarchShow: false,
          })
          if (res) {
            this.onTotalPages(res.total_results)
            this.setState({
              movieAdd: null,
            })
            return res.results.map(this.filmComponent)
          }
          return null
        })
        .then((res) => {
          this.onRequest(res)
          this.setState({
            error: false,
          })
        })
    }
  }

  rateFilmsChange = (page) => {
    this.serviseApi
      .rateFilmsShow(this.state.guestSessionId, page)
      .then((res) => {
        this.onTotalPages(res.total_results)
        this.setState({
          page: res.page,
        })
        return res.results.map(this.filmComponent)
      })
      .then((res) => this.onRequest(res))
  }

  render() {
    const { films, filmLoading, total, moviesList, page, value, nonRateFilm, serarchShow, error } = this.state
    const errorStatus = error && <OnErrorFilms />

    return (
      <>
        <Online>
          <SwapiServiceProvider value={moviesList}>
            <div>
              <div className="main-navigation">
                <div className="main-navigation_element">
                  <Navigation rateFilms={this.rateFilms} />
                </div>
              </div>
              {serarchShow || (
                <SearchFilm
                  movieAdd={this.state.movieAdd}
                  page={this.state.page}
                  onTotalPages={this.onTotalPages}
                  onRequest={this.onRequest}
                  onFilmLoading={this.onFilmLoading}
                  changeValue={this.changeValue}
                  filmComponent={this.filmComponent}
                  onErrorFilmsStatus={this.onErrorFilmsStatus}
                />
              )}
              {errorStatus || (
                <FilmCardCreate
                  nonRateFilm={nonRateFilm}
                  moviesList={moviesList}
                  addRate={this.addRate}
                  data={this.elements}
                  films={films}
                  filmLoading={filmLoading}
                />
              )}

              <div>
                <PaginationFilms total={total} value={value} page={page} changePage={this.changePage} />
              </div>
            </div>
          </SwapiServiceProvider>
        </Online>
        <Offline>
          <Alert message="Чел, у тебя в 21 веке нет интернета?" type="error" />
        </Offline>
      </>
    )
  }
}
