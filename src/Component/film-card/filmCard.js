import { Card, Flex, Typography, Rate } from 'antd'
import React from 'react'
import { format } from 'date-fns'

import '../../CSS/filmCard.css'

const posterPlug = require('../../img/poster.png')

class FilmCard extends React.PureComponent {
  state = {
    text: null,
    name: null,
    ellipsis: false,
  }

  componentDidMount() {
    this.createText(this.props.data.overview)
    this.upHeader(this.props.data.name)
  }

  movieReleseDate = () => {
    try {
      return format(Date.parse(this.props.data.date), 'PP')
    } catch {
      return 'нет даты'
    }
  }

  createText = (upText) => {
    const text = upText.split(' ').slice(0, 15).join(' ')

    this.setState({
      text,
    })
  }

  upHeader = (upName) => {
    const name = upName.split(' ').slice(0, 4).join(' ')
    const arr = upName.split(' ')

    if (arr.length <= 6) {
      this.setState({
        ellipsis: true,
      })
    }

    this.setState({
      name,
    })
  }

  render() {
    const { poster, id, rating, movieList, voteAverage } = this.props.data
    const { text, name, ellipsis } = this.state
    const { addRate, moviesList } = this.props
    const borderColor =
      voteAverage >= 7 ? '#66E900' : voteAverage >= 5 ? '#E9D100' : voteAverage >= 3 ? '#E97E00' : '#E90000'

    const noneText = 'Описание отсуствует'
    const noneElementsList = 'Жанров нет'

    const newName = `${name}...`

    const newData = this.movieReleseDate()

    let idList = 1
    const element = movieList.map((item) => moviesList.genres.filter((el) => item === el.id))

    let newElement = []
    if (element.length >= 1) {
      newElement = element && element.reduce((arr, nex) => arr.concat(nex))
      newElement = newElement.slice(0, 3)
    }

    const elements = newElement.map((item) => {
      idList += 1
      return (
        <Typography.Text key={idList} type="secondary" code>
          {item.name}
        </Typography.Text>
      )
    })

    const nonElements = (
      <Typography.Text key={idList} type="secondary" code>
        {noneElementsList}
      </Typography.Text>
    )
    return (
      <Card
        hoverable
        styles={{
          body: {
            padding: 0,
            overflow: 'hidden',
          },
        }}
      >
        <Flex>
          <img
            alt="Нет постера, денег не хватило"
            src={poster ? `https://image.tmdb.org/t/p/original/${poster}` : posterPlug}
          />
          <Flex
            vertical
            align="flex-start"
            gap={5}
            style={{
              padding: 15,
              paddingBottom: 0,
            }}
          >
            <Typography.Title level={3}>{ellipsis ? name : newName}</Typography.Title>
            <div className="vote_average" style={{ borderColor: borderColor }}>
              <span>{voteAverage}</span>
            </div>
            <Typography.Text type="secondary">{newData}</Typography.Text>
            <Flex wrap>{elements || nonElements}</Flex>
            <Flex wrap gap={5}>
              <div className="text-content">
                <Typography.Text>{text || noneText}...</Typography.Text>
              </div>
            </Flex>
            <Rate defaultValue={rating} count={10} onChange={(star) => addRate(star, id)} className="star" />
          </Flex>
        </Flex>
      </Card>
    )
  }
}

export default FilmCard
