import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';
import {
  PubCom
} from '../components/public/pub.jsx';


var data = {
  wxappid: 'wxec2401ee9a70f3d9',
  wxappsecret: 'fc2c8e7c243da9e8898516fa5da8cbbb'
}
class ZmitiShareApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',

    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

  }
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
  }
  render() {


    var s = this;

    var maskStyle = {
      background: 'url(./assets/images/arron1.png) no-repeat center  top',
      backgroundSize: 'cover'
    }



    return <div className={'zmiti-share-main-ui '+ this.state.className}>
        <div className='zmiti-share-top'>
          <img src='./assets/images/share-top.png'/>
        </div>

        <div className='zmiti-share-bottom'>
          <img src='./assets/images/share-bottom.png'/>
        </div>
        <div className='zmiti-bottom-bg'>
        </div>
        <div className='zmiti-qrcode'>
            <img src='./assets/images/qrcode.png'/>
        </div>
    </div>
  }



  componentDidMount() {


    var {
      obserable,
      wxConfig,
      log,
      nickname,
      changeURLPar,
      border,
      file,
      wish,
      transX,
      transY

    } = this.props;

    var s = this;
    var src = s.getQueryString('src');
    var nickname = s.getQueryString('nickname');
    var duration = s.getQueryString('duration');
    var gk = s.getQueryString('gk');

    if (src && duration) {
      this.setState({
        src,
        className: '',
        nickname,
        duration,
        gk
      });

    }

    obserable.on('showShare', e => {
      var state = {
        className: '',
        duration: e.duration,
        gk: e.gk,
        nickname: e.nickname
      };
      if (e.src) {
        state.src = e.src;
      }
      this.setState(state);
    });
  }

  changeURLPar(url, arg, val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + val;
    return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
  }

}

export default PubCom(ZmitiShareApp);