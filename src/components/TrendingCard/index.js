import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'
import {VscDebugStackframeDot} from 'react-icons/vsc'
import ThemeContext from '../../context/ThemeContext'

const TrendingCard = props => {
  const {trendingData} = props
  const {
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    channel,
    id,
  } = trendingData

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const timeClassName = isDarkTheme ? 'time-dark' : 'time'
        const viewCountClassName = isDarkTheme ? 'viewCount-dark' : 'viewCount'
        const channelNameClassName = isDarkTheme
          ? 'channel-name-dark'
          : 'channel-name'

        const titleTextClassName = isDarkTheme
          ? 'trending-title-dark'
          : 'trending-title'

        const trendingBackgroundClassName = isDarkTheme
          ? 'trending-item-container-dark'
          : 'trending-item-container'

        return (
          <li className={trendingBackgroundClassName}>
            <Link to={`/videos/${id}`} className="link-item-trending">
              <img src={thumbnailUrl} alt="thumbnail" className="thumbnail" />
              <div className="trending-video-details-container">
                <p className={titleTextClassName}>
                  <strong>{title}</strong>
                </p>
                <p className={channelNameClassName}>{channel.name}</p>
                <div className="view-time-container">
                  <p className={viewCountClassName}>{viewCount}</p>
                  <p className={timeClassName}>
                    <VscDebugStackframeDot />
                    {formatDistanceToNow(new Date(publishedAt))}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default TrendingCard
