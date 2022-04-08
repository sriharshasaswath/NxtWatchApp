import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import LeftSideNav from '../LeftSideNav'
import AppTheme from '../../context/ThemeContext'
import TrendingCard from '../TrendingCard'

import {SavedVideosMainDiv} from './styledComponents'

class SavedVideos extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <AppTheme.Consumer>
        {values => {
          const {isDarkTheme, savedVideosList} = values
          const bgColor = !isDarkTheme ? '#ffffff' : '#000000'
          const color = !isDarkTheme ? '#000000' : '#ffffff'
          const BarClassName = isDarkTheme ? 'dark' : 'light'
          const BackgroundClassName = isDarkTheme ? 'dark-icon' : 'light-icon'
          const noImageClassName = isDarkTheme
            ? 'no-videos-img-dark'
            : 'no-videos-img'

          const headingTextClassName = isDarkTheme
            ? 'no-videos-heading-dark'
            : 'no-videos-heading'
          return (
            <SavedVideosMainDiv bgColor={bgColor} color={color}>
              {savedVideosList.length === 0 ? (
                <div>
                  <Header />
                  <div className="trending-item-container1">
                    <LeftSideNav />
                    <div className="no-videos-view-saved">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        className={noImageClassName}
                        alt="no videos"
                      />
                      <h1 className={headingTextClassName}>
                        No saved videos found
                      </h1>
                      <p className={headingTextClassName}>
                        You can save your videos while watching them
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Header />
                  <div className="trending-item-container1">
                    <LeftSideNav />
                    <div>
                      <div className={BarClassName}>
                        <div className={BackgroundClassName}>
                          <MdPlaylistAdd size={40} className="trend-icon" />
                        </div>
                        <h1>Saved Videos</h1>
                      </div>
                      <ul className="each-trending-item-container">
                        {savedVideosList.map(each => (
                          <TrendingCard trendingData={each} key={each.id} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </SavedVideosMainDiv>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default SavedVideos
