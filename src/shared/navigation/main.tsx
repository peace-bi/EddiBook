import BookDetail from 'pages/BookDetail/book-detail'
import EditProfile from 'pages/EditProfile/edit-profile'
import { Home } from 'pages/Home'
import More from 'pages/More/more'
import Profile from 'pages/Profile/profile'
import { createAppContainer, createStackNavigator } from 'react-navigation'

const navigation = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Home'
      })
    },
    BookDetail: {
      screen: BookDetail
    },
    EditProfile: {
      screen: EditProfile
    },
    Profile: {
      screen: Profile
    },
    More: {
      screen: More
    }
  },
  {
    initialRouteName: 'BookDetail'
  }
)

export default createAppContainer(navigation)
