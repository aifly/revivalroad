import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IScroll from 'iscroll';
import './assets/css/index.css';

import {
  PubCom
} from '../components/public/pub.jsx';



class ZmitiIndexApp extends Component {
  constructor(props) {
    super(props);


    this.state = {
      className: '',
      fuxinClass: '',
      textClass: ''

    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;
    window.s = this;
  }
  render() {

    var mainStyle = {
      background: '#56c6ff url(./assets/images/index-bottom.png) no-repeat center bottom',
      backgroundSize: 'contain'
    }

    return <div style={mainStyle} className={'zmiti-index-main-ui '+this.state.className}>

          <div className={'zmiti-fuxin '+this.state.fuxinClass}>
            <img src='./assets/images/fuxin.png'/>
          </div>        

          <div className={'zmiti-ar1 '+this.state.fuxinClass}>
            <img src='./assets/images/ar1.png'/>
          </div>   
          <div className={'zmiti-ar2 '+this.state.fuxinClass}>
            <img src='./assets/images/ar2.png'/>
          </div>

          <footer className='zmiti-index-footer'>
            <div onClick={this.beginGame.bind(this)}>
              <img src='./assets/images/index-begin-btn.png'/>
            </div>
            <section className={'zmiti-index-text '+this.state.textClass}>
              中国共产党第十九次全国代表大会召开啦！快跟小新一起迈进十九大会场，一睹现场全景，还有中央政治局新一届常委见面会直播哦！请将六个历史事件按时间顺序依次点亮，即可通过“复兴之路”迈入十九大会场！
            </section>
            
          </footer>
          
    </div>

  }

  beginGame() {
    this.setState({
      className: 'hide'
    });
    var {
      obserable
    } = this.props;
    obserable.trigger({
      type: 'stageAnimate'
    })
  }

  animate() {
    this.setState({
      fuxinClass: 'active',
      textClass: 'active'
    });


  }



  showToast(msg) {
    this.setState({
      toast: msg
    });

    setTimeout(() => {
      this.setState({
        toast: ''
      });
    }, 2000)
  }



  componentDidMount() {

    setTimeout(() => {
      this.animate();
    }, 1000)

    var {
      obserable
    } = this.props;

    obserable.on('toggleIndex', e => {
      this.setState({
        className: e
      })
    })
  }

}

export default PubCom(ZmitiIndexApp);