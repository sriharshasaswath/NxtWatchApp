import Header from '../Header'
import LeftSideNav from '../LeftSideNav'
import BannerImage from '../BannerImage'
import VideosContainer from '../VideosContainer'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="left-nav-container-alignment">
      <LeftSideNav />
      <div className="right-side-container">
        <BannerImage />
        <VideosContainer />
      </div>
    </div>
  </>
)
export default Home
