import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {VscDebugStackframeDot} from 'react-icons/vsc'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd, MdPlaylistAddCheck} from 'react-icons/md'
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

class VideosItemDetails extends Component {
  state = {
    videosItemList: {},
    apiStatus: apiStatusConstants.initial,
    like: false,
    dislike: false,
    save: false,
  }

  componentDidMount() {
    this.getVideosItem()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    thumbnailUrl: data.thumbnail_url,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
      subscriberCount: data.channel.subscriber_count,
    },
    viewCount: data.view_count,
    publishedAt: data.published_at,
    description: data.description,
  })

  getVideosItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.video_details)
      this.setState({
        videosItemList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({like: !prevState.like}))
    const {like} = this.state
    if (!like) {
      this.setState({dislike: false})
    }
    if (like) {
      this.setState({like: false})
    }
  }

  onClickDislike = () => {
    this.setState(prevState => ({dislike: !prevState.dislike}))
    const {dislike} = this.state
    if (!dislike) {
      this.setState({like: false})
    }
    if (dislike) {
      this.setState({dislike: false})
    }
  }

  renderVideosItemDetails = () => {
    const {videosItemList} = this.state
    const {
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videosItemList

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, addSavedVideos} = value

          const onSave = () => {
            addSavedVideos(videosItemList)
            this.setState(prevState => ({save: !prevState.save}))
          }

          const videoContainerClassName = isDarkTheme
            ? 'videos-item-container-dark'
            : 'videos-item-container'

          const titleTextClassName = isDarkTheme ? 'title-dark' : 'title'

          const iconSizeClassName = isDarkTheme ? 'icon-size-dark' : 'icon-size'

          const {like, dislike, save} = this.state

          return (
            <div className={videoContainerClassName}>
              <LeftSideNav />
              <div className="video-container">
                <div className="video-wrapper">
                  <ReactPlayer
                    url={videoUrl}
                    controls
                    playbackRate={2}
                    width="100%"
                    height="100%"
                    className="react-player"
                  />
                </div>

                <p className={titleTextClassName}>{title}</p>
                <div className="video-time-alignment-container">
                  <div className="view-item-time-container">
                    <p className={titleTextClassName}>{viewCount}</p>
                    <div>
                      <p className={titleTextClassName}>
                        <VscDebugStackframeDot />
                        {formatDistanceToNow(new Date(publishedAt))}
                      </p>
                    </div>
                  </div>
                  <div className="video-time-alignment-container-main">
                    <div className="like-alignment-container">
                      {like ? (
                        <AiOutlineLike
                          className="icon-size-active"
                          onClick={this.onClickLike}
                        />
                      ) : (
                        <AiOutlineLike
                          className={iconSizeClassName}
                          onClick={this.onClickLike}
                        />
                      )}
                      {like ? (
                        <p className="icon-size-active-after">Like</p>
                      ) : (
                        <p className={titleTextClassName}>Like</p>
                      )}
                    </div>
                    <div className="like-alignment-container">
                      {dislike ? (
                        <AiOutlineDislike
                          className="icon-size-active"
                          onClick={this.onClickDislike}
                        />
                      ) : (
                        <AiOutlineDislike
                          className={iconSizeClassName}
                          onClick={this.onClickDislike}
                        />
                      )}
                      {dislike ? (
                        <p className="icon-size-active-after">Dislike</p>
                      ) : (
                        <p className={titleTextClassName}>Dislike</p>
                      )}
                    </div>
                    <div className="like-alignment-container">
                      {save ? (
                        <MdPlaylistAddCheck
                          className="icon-size-active"
                          onClick={onSave}
                        />
                      ) : (
                        <MdPlaylistAdd
                          className={iconSizeClassName}
                          onClick={onSave}
                        />
                      )}
                      {save ? (
                        <p className="icon-size-active-after">Save</p>
                      ) : (
                        <p className={titleTextClassName}>Save</p>
                      )}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="video-item-alignment">
                  <img
                    src={channel.profileImageUrl}
                    alt="img"
                    className="profileImageUrl-new"
                  />
                  <div>
                    <p className={titleTextClassName}>{channel.name}</p>
                    <p className={titleTextClassName}>
                      {channel.subscriberCount} subscribers
                    </p>
                    <p className={titleTextClassName}>{description}</p>
                  </div>
                </div>
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
        We are having some trouble to complete your request. Please try again.
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

  renderVideosItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosItemDetails()
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
          {this.renderVideosItem()}
        </div>
      </>
    )
  }
}

export default VideosItemDetails
