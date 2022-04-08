import {Link} from 'react-router-dom'

import './index.css'
import ThemeContext from '../../context/ThemeContext'

const GamingCard = props => {
  const {GamingData} = props
  const {title, thumbnailUrl, viewCount, id} = GamingData

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const viewCountClassName = isDarkTheme ? 'viewCount-dark' : 'viewCount'

        const titleTextClassName = isDarkTheme
          ? 'trending-title-dark'
          : 'trending-title'

        const gamingBackgroundClassName = isDarkTheme
          ? 'gaming-item-container-dark'
          : 'gaming-item-container'

        return (
          <li className={gamingBackgroundClassName}>
            <Link to={`/videos/${id}`} className="link-item-gaming">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="game-thumbnail"
              />
              <div className="trending-video-details-container">
                <p className={titleTextClassName}>
                  <strong>{title}</strong>
                </p>
                <div className="view-time-container">
                  <p className={viewCountClassName}>
                    {viewCount} Watching Worldwide
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
export default GamingCard
