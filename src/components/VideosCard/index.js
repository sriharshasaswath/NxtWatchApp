import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'
import {VscDebugStackframeDot} from 'react-icons/vsc'
import ThemeContext from '../../context/ThemeContext'

const VideosCard = props => {
  const {productData} = props
  const {title, thumbnailUrl, viewCount, publishedAt, id, channel} = productData

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const timeClassName = isDarkTheme ? 'time-dark' : 'time'
        const viewCountClassName = isDarkTheme ? 'viewCount-dark' : 'viewCount'
        const channelNametClassName = isDarkTheme
          ? 'channel-name-dark'
          : 'channel-name'

        const titleTextClassName = isDarkTheme ? 'title-dark' : 'title'

        return (
          <li className="videos-item">
            <Link to={`/videos/${id}`} className="link-item">
              <img src={thumbnailUrl} alt="thumbnail" className="thumbnail" />
              <div className="title-container">
                <img
                  src={channel.profileImageUrl}
                  alt="profileImageUrl"
                  className="profileImageUrl"
                />
                <p className={titleTextClassName}>{title}</p>
              </div>
              <p className={channelNametClassName}>{channel.name}</p>
              <div className="view-time-container">
                <p className={viewCountClassName}>{viewCount}</p>
                <p className={timeClassName}>
                  <VscDebugStackframeDot />
                  {formatDistanceToNow(new Date(publishedAt))}
                </p>
              </div>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default VideosCard
