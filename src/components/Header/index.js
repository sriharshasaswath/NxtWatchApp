import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon, FaBars} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onToggleTheme = () => {
        toggleTheme()
      }

      const navHeaderClassName = isDarkTheme ? 'nav-header-dark' : 'nav-header'
      const navBarClassName = isDarkTheme ? 'bar-image-dark' : 'bar-image'

      const aboutImageURL = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const themeImageURL = isDarkTheme ? (
        <FiSun className="sun-image" />
      ) : (
        <FaMoon className="moon-image" />
      )

      const onClickLogout = () => {
        const {history} = props

        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <nav className={navHeaderClassName}>
          <div className="nav-content">
            <div className="nav-bar-mobile-logo-container">
              <Link to="/">
                <img
                  className="website-logo"
                  src={aboutImageURL}
                  alt="website logo"
                />
              </Link>
              <div>
                <button
                  testid="theme"
                  className="theme-button"
                  type="button"
                  onClick={onToggleTheme}
                >
                  {themeImageURL}
                </button>
                <FaBars className={navBarClassName} />
                <button
                  type="button"
                  className="nav-mobile-btn"
                  onClick={onClickLogout}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                    alt="nav logout"
                    className="nav-bar-img-mob"
                  />
                </button>
              </div>
            </div>

            <div className="nav-bar-large-container">
              <Link to="/">
                <img
                  className="website-logo"
                  src={aboutImageURL}
                  alt="website logo"
                />
              </Link>
              <ul className="nav-menu">
                <button
                  data-testid="theme"
                  className="theme-button"
                  type="button"
                  onClick={onToggleTheme}
                >
                  {themeImageURL}
                </button>
                <Link to="/products" className="nav-link">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                    alt="profile"
                    className="profile"
                  />
                </Link>
              </ul>

              <div className="popup-container">
                <Popup
                  modal
                  trigger={
                    <button type="button" className="logout-desktop-btn">
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div className="logout-container">
                      <div>
                        <p>Are you sure, you want to logout</p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="logout-desktop-btn"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="logout-desktop-btn"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
