const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ4MWM4ZDk0NjllYWYzNjJhMzUzMDNiOWI3YWI2NiIsInN1YiI6IjY2NmYzMzI4YTFiYzNkYjEwY2M0Y2U0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oatz3VFYU9UaT1rh2RvjgoC5C9E7AOrGYUfnHlN71fs',
  },
}

const apiKey = '0ed81c8d9469eaf362a35303b9b7ab66'
const baseUrl = 'https://api.themoviedb.org/3'

export default class ServiseApi {
  async guestSession() {
    if (JSON.parse(localStorage.getItem('getGuestSession'))) {
      return JSON.parse(localStorage.getItem('getGuestSession'))
    }
    const url = `${baseUrl}/authentication/guest_session/new`
    const results = await fetch(url, options)
    const res = await results.json()
    localStorage.setItem('getGuestSession', JSON.stringify(res))

    return res
  }

  async filmsInfo(value = false, page = 1, rate = false) {
    let data = null

    if (value) {
      data = await fetch(`${baseUrl}/search/movie?query=${value}&page=${page}`, options)
        .then((res) => {
          if (!res.ok) {
            throw new Error(JSON.stringify(res.status))
          }
          return res.json()
        })
        .catch((err) => {
          return err
        })
        .then((res) => {
          return res
        })

      const res = await data

      return res
    }

    return rate
  }

  async addPostRating(value, id, movieId) {
    return this.addRating(value, id, movieId)
      .then((res) => {
        if (res === 404) {
          throw new Error('not deleted')
        }
      })
      .catch((res) => {
        throw new Error(res)
      })
  }

  async getResource(argUrl, options3, useAPIKey = true) {
    try {
      const url = baseUrl + argUrl + (useAPIKey ? null : '')

      const res = await fetch(url, options3)

      return res.json()
    } catch (error) {
      return error
    }
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
      if (!res.success) {
        throw new Error(JSON.stringify(res))
      }
      return res
    }

    return this.delitRating(id, movieId)
  }

  async delitRating(id, movieId) {
    const data = await fetch(`${baseUrl}/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })

    if (!data.ok) {
      return data.status
    }
    return data
  }

  async rateFilmsShow(movieId, page = 1) {
    const url = `${baseUrl}/guest_session/${movieId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`

    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(JSON.stringify(res.status))
        }
        return res.json()
      })
      .catch((err) => {
        throw new Error(JSON.stringify(err))
      })
  }

  async movieList() {
    const url = `${baseUrl}/genre/movie/list`

    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(JSON.stringify(res.status))
        }
        return res.json()
      })
      .catch((err) => {
        throw new Error(JSON.stringify(err))
      })
  }
}
