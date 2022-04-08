import {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'

import './index.css'
import {AiFillFire} from 'react-icons/ai'
import {HiHome} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../context/ThemeContext'

import {DivContainer, ListContainer, ListItems} from './styledComponents'

class LeftSideNav extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const leftNavBgClassName = isDarkTheme
            ? 'left-nav-header-dark'
            : 'left-nav-header'

          const color = !isDarkTheme ? '#000000' : '#ffffff'
          const hoverBgColor = isDarkTheme ? '#383838' : '#e2e8f0'
          const textColor = isDarkTheme ? 'para-dark' : 'para'
          const linkStyleClassName = isDarkTheme
            ? 'link-style-dark'
            : 'link-style'

          const leftNavContactTextClassName = isDarkTheme
            ? 'contact-us-dark'
            : 'contact-us'

          return (
            <nav className={leftNavBgClassName}>
              <DivContainer>
                <ListContainer>
                  <NavLink exact to="/" className={linkStyleClassName}>
                    <ListItems color={`${color}`} bgColor={`${hoverBgColor}`}>
                      <span className="nav-icons">
                        <HiHome size={20} />
                      </span>
                      <p className={textColor}>Home</p>
                    </ListItems>
                  </NavLink>
                  <NavLink to="/trending" className={linkStyleClassName}>
                    <ListItems color={`${color}`} bgColor={`${hoverBgColor}`}>
                      <span className="nav-icons">
                        <AiFillFire size={20} />
                      </span>
                      <p className={textColor}>Trending</p>
                    </ListItems>
                  </NavLink>
                  <NavLink to="/gaming" className={linkStyleClassName}>
                    <ListItems color={`${color}`} bgColor={`${hoverBgColor}`}>
                      <span className="nav-icons">
                        <SiYoutubegaming size={20} />
                      </span>
                      <p className={textColor}>Gaming</p>
                    </ListItems>
                  </NavLink>
                  <NavLink to="/saved-videos" className={linkStyleClassName}>
                    <ListItems color={`${color}`} bgColor={`${hoverBgColor}`}>
                      <span className="nav-icons">
                        <MdPlaylistAdd size={20} />
                      </span>
                      <p className={textColor}>Saved Videos</p>
                    </ListItems>
                  </NavLink>
                </ListContainer>
              </DivContainer>
              <div className="social-media-container">
                <p className={leftNavContactTextClassName}>CONTACT US</p>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                    alt="facebook logo"
                    className="social-media-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="social-media-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="social-media-logo"
                  />
                </div>
                <p className={leftNavContactTextClassName}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </nav>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(LeftSideNav)
