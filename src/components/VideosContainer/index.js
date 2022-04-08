import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'

import VideosCard from '../VideosCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideosContainer extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(video => ({
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
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getVideos()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  retry = () => {
    this.setState({searchInput: ''})
    this.getVideos()
  }

  renderVideosListView = () => {
    const {videosList, searchInput} = this.state
    const shouldShowVideosList = videosList.length > 0

    return shouldShowVideosList ? (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const searchInputClassName = isDarkTheme
            ? 'search-input-container-dark'
            : 'search-input-container'

          const videosListTheme = isDarkTheme
            ? 'videos-list-dark'
            : 'videos-list'

          const searchInputTextClassName = isDarkTheme
            ? 'search-input-dark'
            : 'search-input'

          const searchIconClassName = isDarkTheme
            ? 'search-icon-dark'
            : 'search-icon'
          const seallelementsContainer = isDarkTheme
            ? 'all-elements-container-dark'
            : 'all-elements-container'

          return (
            <div className={seallelementsContainer}>
              <div>
                <div className={searchInputClassName}>
                  <input
                    value={searchInput}
                    type="search"
                    className={searchInputTextClassName}
                    placeholder="Search"
                    onChange={this.onChangeSearchInput}
                    onKeyDown={this.onEnterSearchInput}
                  />
                  <BsSearch className={searchIconClassName} />
                </div>
                <div className="all-videos-container">
                  <ul className={videosListTheme}>
                    {videosList.map(product => (
                      <VideosCard productData={product} key={product.id} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    ) : (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
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
                onClick={this.getVideos()}
              >
                Retry
              </button>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="all-products-section">{this.renderAllVideos()}</div>
  }
}

export default VideosContainer
