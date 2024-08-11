/* eslint-disable class-methods-use-this */

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ4MWM4ZDk0NjllYWYzNjJhMzUzMDNiOWI3YWI2NiIsInN1YiI6IjY2NmYzMzI4YTFiYzNkYjEwY2M0Y2U0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oatz3VFYU9UaT1rh2RvjgoC5C9E7AOrGYUfnHlN71fs',
  },
}

const apiKey = '0ed81c8d9469eaf362a35303b9b7ab66'

export default class ServiseApi {
  async guestSession() {
    const url = 'https://api.themoviedb.org/3/authentication/guest_session/new'
    const results = await fetch(url, options)
    const res = await results.json()
    return res
  }

  // eslint-disable-next-line default-param-last
  async filmsInfo(value, page = 1, rate) {
    let data = null

    if (value) {
      data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&page=${page}`, options)

      const res = await data.json()

      return res
    }

    return rate
  }

  async addPostRating(value, id, movieId) {
    this.addRating(value, id, movieId)
  }

  async getResource(argUrl, options3, useAPIKey = true) {
    // eslint-disable-next-line prefer-template
    const url = 'https://api.themoviedb.org/3' + argUrl + (useAPIKey ? null : '')

    const res = await fetch(url, options3)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return res.json()
  }

  async addRating(rating, id, movieId) {
    if (rating >= 1) {
      const url = `/movie/${id}/rating?guest_session_id=${movieId}`
      const options3 = {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ4MWM4ZDk0NjllYWYzNjJhMzUzMDNiOWI3YWI2NiIsIm5iZiI6MTcyMDQ1NzEwMS4xNzUxOSwic3ViIjoiNjY2ZjMzMjhhMWJjM2RiMTBjYzRjZTQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fuIviR-n-dGwgEQD8LaZ6IB3Y5Q15NzIdcX9-bdChHU',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: `${rating}` }),
      }

      const res = await this.getResource(url, options3, false)
      return res.status_message
    }
    return this.delitRating(id, movieId)
  }

  async delitRating(id, movieId) {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${movieId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
    return data
  }

  async totalPages(value, page) {
    if (page) {
      return page
    }
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&page=1`, options)

    const res = await data.json()
    return res.total_results
  }

  async rateFilmsShow(movieId, page = 1) {
    const url = `https://api.themoviedb.org/3/guest_session/${movieId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`

    return fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        return res
      })
      .catch((err) => console.error(err))
    // .then((json) => this.filmsInfo(value, page, json))
    // .catch((err) => console.error('error:' + err))
  }

  async rateFilmsPage(movieId) {
    const url = `https://api.themoviedb.org/3/guest_session/${movieId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`
    return fetch(url, options)
      .then((res) => res.json())
      .then((json) => json.total_results)
      .catch((err) => console.error(err))
  }

  async movieList() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list'

    return fetch(url, options).then((res) => res.json())
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
}
