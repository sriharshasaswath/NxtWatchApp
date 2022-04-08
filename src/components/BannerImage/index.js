import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import './index.css'

class BannerImage extends Component {
  state = {close: false}

  closeBanner = () => {
    this.setState({close: true})
  }

  render() {
    const {close} = this.state

    return (
      <>
        {close ? null : (
          <div className="banner-logo-main-container">
            <div className="banner-info-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="logo"
                className="banner-logo-image"
              />
              <p>
                Buy NXT Watch premium prepaid Plans <br />
                with UPI
              </p>
              <button type="button" className="button">
                Get It Now
              </button>
            </div>
            <RiCloseLine onClick={this.closeBanner} className="close-btn" />
          </div>
        )}
      </>
    )
  }
}

export default BannerImage
