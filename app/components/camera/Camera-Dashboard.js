import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Icon } from 'react-native-icons';
import Dimensions from 'Dimensions';

import CameraRollView from './Camera-Roll';
import CameraLiveView from './Camera-Live';

import tips_api from '../../utils/tips.js';
import img_api from '../../utils/img.js';

import globals from '../../../globalVariables';

var window = Dimensions.get('window');

var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
} = React;

class CameraDashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tip: null
    };
  }

  getRestaurant() {
    // sent from Map-Dashboard after arrival at a restaurant
    var props = this.props.route.props;

    if( !props || !props.restaurant ) {
      return null;
    }

    return props.restaurant;
  }

  goToCameraRollScreen() {
    var restaurant = this.getRestaurant();

    this.props.navigator.push({
      title: 'Camera Roll',
      component: CameraRollView,
      props: {
        restaurant
      },
      navigationBar: (
        <NavigationBar
          title="Camera Roll" />
      )
    });
  }

  goToCameraLiveScreen() {
    var restaurant = this.getRestaurant();

    this.props.navigator.push({
      title: 'Picture Time',
      props: {
        restaurant
      },
      component:  CameraLiveView,
    })
  }

  componentWillMount() {
    this.setState({
      tip: tips_api.getRandomTip(),
      img: img_api.getRandomImg()
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={require('image!white-pattern-bg')}
          style={styles.bgImg}>
          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>Upload a photo of your meal!</Text>
          </View>

          <View style={styles.imageTipContainer}>
            <Image style={styles.img} source={this.state.img} />
            <Text style={styles.tip}>{this.state.tip}</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableHighlight
              style={styles.mainBtn}
              onPress={this.goToCameraLiveScreen.bind(this)}
              underlayColor={globals.primaryLight}>
              <View style={styles.innerBtn}>
                <Icon
                  name='ion|ios-camera-outline'
                  size={30 * window.width/375}
                  color='#ffffff'
                  style={styles.icon}
                />
                <Text style={styles.btnText}>Let's take a photo</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this.goToCameraRollScreen.bind(this)}
              underlayColor='#ffffff'>
              <Text style={styles.secondaryBtn}>Choose from my camera roll</Text>
            </TouchableHighlight>
          </View>
        </Image>
      </View>
    );
  }
}

export default CameraDashboard;
// Adjustments
var borderRadiusImgCenter;
var fontSizeBtnText;
switch(window.height) {
    case 480: // iPhone 4s
        borderRadiusImgCenter  = 65;
        break;
    case 568: // iPhone 5 and 5s
        borderRadiusImgCenter  = 65;
        break;
    case 667: // iPhone 6
        borderRadiusImgCenter  = 75;
        break;
    case 736: // iPhone 6s
        borderRadiusImgCenter  = 80;
        fontSizeBtnText = 20;
        break;
    default:
        fontSizeBtnText = null;
        break;
}
//-----

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    width: window.width,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageTipContainer: {
    flex: 5,
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  innerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 36 * window.width/375,
    textAlign: 'center',
    fontFamily: 'SanFranciscoDisplay-Light',
    color: globals.darkText,
  },
  headlineContainer: {
    flex: 2,
    paddingTop: 10 * window.width/375,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  img: {
    alignSelf: 'center',
    marginBottom: 15,
    width: 150 * window.width/375,
    height: 150 * window.width/375,
    borderRadius: borderRadiusImgCenter,
  },
  tip: {
    color: globals.mediumText,
    textAlign: 'center',
    fontSize: 18 * window.width/375,
    fontFamily: 'SanFranciscoText-Regular',
  },
  btnContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBtn: {
    width: 345 * window.width/375,
    height: 63 * window.height/667,
    marginBottom: 20,
    paddingTop: 17,
    paddingBottom: 17,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globals.primaryDark,
  },
  btnText: {
    fontSize: fontSizeBtnText  || 20 * window.width/375,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'SanFranciscoText-Semibold',
  },
  secondaryBtn: {
    width: window.width - 30,
    fontSize: 18 * window.width/375,
    textAlign: 'center',
    color: globals.primaryDark,
    fontFamily: 'SanFranciscoText-Regular',
  },
});
