import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';
import {
  PubCom
} from '../components/public/pub.jsx';
import ZmitiToastApp from '../components/toast/index.jsx'

var data = {
  wxappid: 'wxec2401ee9a70f3d9',
  wxappsecret: 'fc2c8e7c243da9e8898516fa5da8cbbb'
}
class ZmitiShareApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',

      fuxinClass: '',

      headimg: '',
      clock: 0,
      count: 0,
      clipUrl: '',
      domClass: '',
      showMask: false,
      transX: 0,
      transY: 0,
      rotate: 0


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

    var mainStyle = {
      background: 'url(./assets/images/bg1.jpg) no-repeat center',
      backgroundSize: 'cover'
    }

    var textStyle = {
      background: 'url(./assets/images/score.png) no-repeat center',
      backgroundSize: 'contain'
    }



    return <div className={'zmiti-share-main-ui '+ this.state.className} style={mainStyle}>
    <audio src='./assets/music/1.mp3' ref='clipaudio'></audio>
        <section ref='zmiti-share-content' style={{height:this.viewH}} className={'zmiti-share-content '+this.state.domClass}>
            <div className='zmiti-share-top'>
              <img src='./assets/images/share-top.png'/>
            </div>
            <div className={'zmiti-fuxin '+this.state.fuxinClass}>
              <img src='./assets/images/fuxin.png'/>
            </div>        

            <div className={'zmiti-ar1 '+this.state.fuxinClass}>
              <img src='./assets/images/ar1.png'/>
            </div>   
            <div className={'zmiti-ar2 '+this.state.fuxinClass}>
              <img src='./assets/images/ar2.png'/>
            </div>   

            <div className='zmiti-share-bottom'>
              <img src='./assets/images/share-bottom.png'/>
            </div>
            <div className='zmiti-bottom-bg'>
            </div>
          {this.state.qrcode && <div className='zmiti-qrcode'>
                        <img src={this.state.qrcode||'./assets/images/qrcode.png'}/>
                    </div>}
           <div className='zmiti-fuxin-text' >
               <div  className={'zmiti-head '+(this.state.rotate!==0?'active':'')}>
                  <img src={this.state.headimg}  />
                </div>

              <div className='zmiti-text'>
                    <div>我用<span>{this.state.clock}</span>秒时间击败了<span>{this.state.count}</span>人</div> < div > 点亮 < span > 复兴之路 < /span>走进十九大会场</div >
              </div>
          </div> < /section>

    {
      this.state.clipUrl && <div className={'zmiti-photo '+(this.state.photoClass||'')}>
                  <img src={this.state.clipUrl}/>
                  <div ref='zmiti-share-tip'>长按图像保存到手机</div>
                </div>
    }

    {
      this.state.clipUrl && <div className={'zmiti-share-bottom-info ' + (this.state.photoClass||'')}>
            {!this.state.src&&<div>
                            <aside>
                              <div><a href={window.location.href.split('?')[0]}>再挑战一次</a></div>
                            </aside>
                            <section style={{width:20}}></section>
                            <aside>
                              <div onClick={()=>{this.setState({showMask:true})}}>分享</div>
                            </aside>
                        </div>}

                {this.state.src && <div>
                            <aside style={{margin:'0 auto'}}>
                              <div><a href={window.location.href.split('?')[0]}>走复兴之路</a></div>
                            </aside>
                        </div>}
            <div>
              <img src='./assets/images/copyright.png'/>
            </div>
        </div>
    } {
      this.state.toast && <ZmitiToastApp toast={this.state.toast}></ZmitiToastApp>
    } {
      this.state.showMask && <div onTouchStart={()=>{this.setState({showMask:false})}} className='zmiti-mask' style={maskStyle}>
        </div>
    } < /div>
  }

  animate() {


    this.setState({
      fuxinClass: 'active'
    })

    setTimeout(() => {
      this.clipImg()
    }, 2000)
  }


  createQrCode(url = window.location.href.split('?')[0]) { //生成二维码
    var s = this;
    $.ajax({
      type: 'post',
      url: 'http://api.zmiti.com/v2/share/create_qrcode',
      data: {
        url: url
      }
    }).done(function(data) {
      if (data.getret === 0) {
        s.setState({
            qrcode: data.qrcodeurl
          })
          //s.createImg();
      }
    })
  }

  clipImg() {
    var dom = this.refs['zmiti-share-content'];
    var s = this;
    var {
      changeURLPar,
      wxConfig
    } = this.props;
    /* this.setState({
       toast: '正在生成图片...'
     })*/
    html2canvas(dom, {
      useCORS: true,
      onrendered: function(canvas) {

        var url = canvas.toDataURL();

        //$('#audio')[0].play();

        //s.refs['clipaudio'].play();


        s.setState({
          clipUrl: url,
          toast: ''
        });

        $.ajax({
          url: 'http://api.zmiti.com/v2/share/base64_image/',
          type: 'post',
          data: {
            setcontents: url,
            setimage_w: s.viewW,
            setimage_h: s.viewH
          },
          success: function(data) {
            if (data.getret === 0) {
              var src = data.getimageurl;
              var title = window.clipShare.title.replace(/{clock}/ig, s.state.clock);
              title = title.replace(/{count}/ig, s.state.count);

              var desc = window.clipShare.desc.replace(/{clock}/ig, s.state.clock);
              desc = desc.replace(/{count}/ig, s.state.count);
              var url = window.location.href.split('#')[0];
              url = changeURLPar(url, 'src', src);
              wxConfig(title, desc, window.clipShare.img, url);
              s.setState({
                clipUrl: src,
                domClass: 'hide'
              });

              setTimeout(() => {
                  s.setState({
                    photoClass: 'active'
                  });

                  s.refs['zmiti-share-tip'].style.display = 'block';
                }, 1000)
                //var URI = window.location.href.split('#')[0];
                //URI = s.changeURLPar(URI, 'nickname', src);
                //s.wxConfig(window.nickname + '签发了新华社十八大第' + (data.worksinfo.totalviewcount + 1) + '份号外 ', window.nickname + '签发了新华社十八大第' + (data.worksinfo.totalviewcount + 1) + '份号外 ', shareUrl, URI);
                ///s.wxConfig(window.nickname + '在新华社应聘主编，敬请阅读！', '新华社新媒体中心招聘“刚刚” 主编，已有 ' + (s.totalviewcount + 1) + '位参与应聘，我们期待您的加入！', shareUrl, URI);
            }

          }
        })


      },
      width: s.viewW,
      height: s.viewH
    });

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


    if (src) {
      this.setState({
        clipUrl: src,
        src: src,
        domClass: 'hide',
        photoClass: 'active'
      });
    } else {


      s.createQrCode();
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



    setTimeout(() => {
      ///this.animate();
    }, 2000)
    obserable.on('setHeadimg', e => {
      this.setState({
        headimg: e.headimg,
        count: e.count,
        clock: e.clock,
        rotate: e.rotate,
        transX: e.transX / 4,
        transY: e.transY / 4
      });


      setTimeout(() => {
        this.animate();
      }, 1000);

    })
  }

  changeURLPar(url, arg, val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + val;
    return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
  }

}

export default PubCom(ZmitiShareApp);