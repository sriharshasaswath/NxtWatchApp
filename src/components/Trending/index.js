import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillFire} from 'react-icons/ai'
import TrendingCard from '../TrendingCard'
import LeftSideNav from '../LeftSideNav'
import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingItemList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideosItem()
  }

  getVideosItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))

      this.setState({
        trendingItemList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderTrendingItemDetails = () => {
    const {trendingItemList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const BarClassName = isDarkTheme ? 'dark' : 'light'
          const BackgroundClassName = isDarkTheme ? 'dark-icon' : 'light-icon'
          return (
            <div className="trending-item-container1">
              <LeftSideNav />
              <div>
                <div className={BarClassName}>
                  <div className={BackgroundClassName}>
                    <AiFillFire size={40} className="trend-icon" />
                  </div>
                  <h1>Trending</h1>
                </div>
                <ul className="each-trending-item-container">
                  {trendingItemList.map(each => (
                    <TrendingCard trendingData={each} key={each.id} />
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderFailureView = () => (
    <div className="render-loading-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong </h1>
      <p className="failure-desc">
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button
        type="button"
        testid="button"
        className="job-item-failure-button"
        onClick={this.getVideosItem}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTrendingItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="get-products-details-container">
          {this.renderTrendingItem()}
        </div>
      </>
    )
  }
}

export default Trending
