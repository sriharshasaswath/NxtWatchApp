import {Component} from 'react'

import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideosItemDetails from './components/VideosItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import ThemeContext from './context/ThemeContext'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addSavedVideos = async data => {
    const {savedVideosList} = this.state
    if (savedVideosList.length > 0) {
      const checkSavedVideos = savedVideosList.filter(
        item => item.id === data.id,
      )
      if (checkSavedVideos.length === 0) {
        await this.setState({
          savedVideosList: [...savedVideosList, data],
        })
      }
    } else {
      await this.setState({
        savedVideosList: [...savedVideosList, data],
      })
    }
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state
    console.log(savedVideosList)

    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          savedVideosList,
          toggleTheme: this.toggleTheme,
          addSavedVideos: this.addSavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideosItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
