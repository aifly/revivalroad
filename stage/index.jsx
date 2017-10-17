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

class ZmitiStage extends Component {
  constructor(props) {
    super(props);
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;
    this.state = {

      className: '',

      points: [],

      btns: [{
        src: './assets/images/1.png',
        id: 1
      }, {
        src: './assets/images/2.png',
        id: 2
      }, {
        src: './assets/images/3.png',
        id: 3
      }, {
        src: './assets/images/4.png',
        id: 4
      }, {
        src: './assets/images/5.png',
        id: 5
      }, {
        src: './assets/images/6.png',
        id: 6
      }],

      pointStyle: [

      ],

      clock: 0,

      showFile: true,

      maskContent: '',

      count: 0, //正确的个数 

      uploadimg: '', //,'./assets/images/111.png', //http://api.zmiti.com/zmiti_ele/public/20171015/8762d14354cdcb930669e5f0833cd88a.png',

      canvasSize: document.documentElement.clientWidth * .9,

      transX: 0,

      transY: 0,

      finishContent: '', // './assets/images/finish.png ',


      toast: '',

      meteors: [{
        width: 100,
        top: 0,
        left: this.viewW,
        WebkitAnimationDelay: 500 * 1 + 'ms'
      }, {
        top: 200,
        width: 100,
        left: this.viewW,
        WebkitAnimationDelay: 500 * 5 + 'ms'
      }, {
        top: 300,
        width: 100,
        left: this.viewW,
        WebkitAnimationDelay: 500 * 3 + 'ms'
      }, {
        top: 400,
        width: 100,
        left: this.viewW,
        WebkitAnimationDelay: 500 * 3 + 'ms'
      }, {
        top: 500,
        width: 100,
        left: this.viewW,
        WebkitAnimationDelay: 500 * 2 + 'ms'
      }],

      imgLoaded: false


    }


    window.ss = this;

  }
  render() {

    var mainStyle = {
      background: 'url(./assets/images/bg.jpg) no-repeat center top',
      backgroundSize: 'cover'
    }

    var topStyle = {
      background: 'url(./assets/images/clock.png) no-repeat center ',
      backgroundSize: 'contain'
    }

    return <div className={'zmiti-stage-main-ui '+this.state.className} style={mainStyle}>

      <audio src='./assets/music/right.mp3' ref='right'></audio>
      <audio src='./assets/music/error.mp3' ref='error'></audio>
      <audio src='./assets/music/success.mp3' ref='success'></audio>
      <audio></audio>
        <canvas ref='canvas' width='320' height='568'></canvas>
        <div className='zmiti-top' style={topStyle}>
          <div className='zmiti-clock'>{this.state.clock}</div>
        </div>
        <div className='zmiti-stage-point-C'>
          {this.state.points.map((item,i)=>{
            var style ={

            }
            if(this.state.pointStyle[i]){
               style = {
                 WebkitTransform:'translate('+this.state.pointStyle[i].x+'px,'+(this.state.pointStyle[i].y)+'px)'
               }
            }
            return <div onClick={this.play.bind(this,this.state.btns[i].id,item)}  key={i} className={'zmiti-point '+ item.className} style={style}>
              <div className='zmiti-meteor' ref={'meteor-'+i}>
                  <img src='./assets/images/m.png'/>
              </div>
              <img src={this.state.btns[i].src}/>
            </div>
          })}


       
          <div className='zmiti-point'>
            <img src='./assets/images/7.png'/>
          </div>
        </div>


    {
      this.state.toast && <ZmitiToastApp toast={this.state.toast}></ZmitiToastApp>
    }

    {this.state.finishContent && this.state.meteors.map((m,i)=>{
      return <div key={i} className='zmiti-m' style={m}>
        <img src='./assets/images/m.png'/>
      </div>
    })}


    {
      this.state.uploadimg && this.state.imgLoaded && <div className='zmiti-img-operator'>
                    <header>
                      <span onClick={()=>{this.setState({uploadimg:''})}}>取消</span>
                      <span onClick={this.entryShare.bind(this)}>确定</span>
                    </header>

                    <div className='zmiti-img-C'>
                      <img ref='zmiti-img' src={this.state.uploadimg}/>
                      <div  ref='clip'  style={{WebkitTransform:"translate("+this.state.transX+"px,"+this.state.transY+"px)",width:this.state.canvasSize,height:this.state.canvasSize}}>
                        <canvas ref='clipcanvas' width={this.state.canvasSize} height={this.state.canvasSize}></canvas>
                      </div>
                    </div>
                </div>}

        <div className='zmiti-xiaoxin'>
            <img src='./assets/images/xiaoxin.png'/>
            {<img src='./assets/images/tip.png' />}
        </div>
        {this.state.maskContent  && <div onClick={()=>{ this.setState({
          maskContent: ''
        })}} className='zmiti-error-mask'>
                    <img src={this.state.maskContent||'./assets/images/finish.png'}/>
                    
                </div>


  } {
    this.state.finishContent && <div  className='zmiti-error-mask'>
                    <div onClick={this.openUploadDialog.bind(this)}>
                      <img className='zmiti-finish-content' src={this.state.finishContent}/>
                    <img className='zmiti-result-img' src={this.state.clipurl||'./assets/images/7.png'}/>
                    {this.state.showFile && <input accept="image/*" type='file' ref='file' onChange={this.upload.bind(this)}/>}
                    </div>
                </div>
  } < /div>



}


openUploadDialog() {
  $(this.refs['file']).trigger('click');
}



entryShare() {
  var {
    obserable
  } = this.props;

  var url = this.refs['clipcanvas'].toDataURL();



  this.setState({
    uploadimg: '',
    showFile: false,
    clipurl: url
  }, () => {

    setTimeout(() => {
      this.setState({
        finishContent: '',
        className: 'hide'
      });

      $.ajax({
        url: 'http://api.zmiti.com/v2/share/base64_image/',
        type: 'post',
        data: {
          setcontents: url,
          setimage_w: s.state.canvasSize,
          setimage_h: s.state.canvasSize
        }

      }).done((data) => {
        if (data.getret === 0) {
          obserable.trigger({
            type: 'setHeadimg',
            data: {
              headimg: data.getimageurl,
              count: this.personCount,
              clock: this.state.clock
            }
          })
        }
      })


    }, 2000)
  })
}

upload() { //上传照片
  var formData = new FormData();
  this.setState({
    showUploadLoading: true,
    toast: '上传中,请稍候...'
  })


  formData.append('setupfile', this.refs['file'].files[0]);
  formData.append('uploadtype', 1);
  $.ajax({
    type: "POST",
    contentType: false,
    processData: false,
    url: 'http://api.zmiti.com/v2/share/upload_file/',
    data: formData
  }).done((data) => {
    if (data.getret === 0) {
      var url = data.getfileurl[0].datainfourl;

      $.ajax({
        type: 'post',
        url: 'http://api.zmiti.com/v2/aiapi/detect',
        data: {
          imageurl: url
        }
      }).done((data) => {
        if (data.getret === 0) {
          if (data.airesult.result_num === 0) { //没有人脸
            this.showToast('未检测到人脸,请重新上传');
          } else {
            this.setState({
              uploadimg: url,
              toast: ''
            }, () => {

              this.setDrag();


            })
          }
        }
      })


    }
  });
}

setDrag() {

  var cacheCanvas = document.createElement('canvas');

  var img = new Image();
  img.crossOrigin = "anonymous"; //关键
  img.onload = function() {
    cacheCanvas.width = img.width;
    cacheCanvas.height = img.height;

    var context = cacheCanvas.getContext('2d');
    context.drawImage(img, 0, 0);

    cacheCanvas.className = 'zmiti-canvas'

    document.body.appendChild(cacheCanvas);
    this.setState({
      imgLoaded: true
    }, () => {
      var clipRange = $(this.refs['clip']);
      var rImg = this.refs['zmiti-img']
      clipRange.on('touchstart', e => {
        var e = e.originalEvent.changedTouches[0];
        var startX = e.pageX - clipRange[0].offsetLeft - this.state.transX
        var startY = e.pageY - clipRange[0].offsetTop - this.state.transY

        $(document).on('touchmove', e => {
          var e = e.originalEvent.changedTouches[0];

          var X = e.pageX - startX,
            Y = e.pageY - startY;
          X <= 0 && (X = 0);
          Y <= 0 && (Y = 0);

          X > rImg.width - this.state.canvasSize && (X = rImg.width - this.state.canvasSize)
          Y > rImg.height - this.state.canvasSize && (Y = rImg.height - this.state.canvasSize)
            //document.title = Y;
          this.setState({
            transX: X,
            transY: Y
          }, () => {
            this.drawImage(cacheCanvas)
          })

        }).on('touchend', e => {
          var e = e.originalEvent.changedTouches[0];
          $(document).off('touchmove touchend')
        })
      })
    })
    setTimeout(() => {
      this.drawImage(cacheCanvas);
    }, 100)

  }.bind(this);

  img.src = this.state.uploadimg



}


drawImage(img) {
  var canvas = this.refs['clipcanvas'];
  var img1 = this.refs['zmiti-img'];
  var context = canvas.getContext('2d');

  var scale = img.width / img1.width;
  context.clearRect(0, 0, this.state.canvasSize, this.state.canvasSize)
  context.drawImage(img, this.state.transX * scale, this.state.transY * scale, this.state.canvasSize * scale, this.state.canvasSize * scale, 0, 0, this.state.canvasSize, this.state.canvasSize);


}

saveResult() {
  var {
    worksid
  } = this.props;
  $.ajax({
    type: 'post',
    url: 'http://api.zmiti.com/v2/h5/save_userusetime/',
    data: {
      workid: worksid,
      usetime: this.state.clock
    }
  }).done((data) => {
    console.log(data);
    if (data.getret === 0) {
      this.personCount = data.count || 20;
    }


  })
}

play(id, item) {


  var i = id - 1;


  if (id - 1 < this.state.count) { //已经点过了，
    return

  }
  var audio = this.refs[id - 1 === this.state.count ? 'right' : 'error'];
  audio.currentTime = 0;
  audio.play();
  if (id - 1 === this.state.count) { //回答正确

    this.drawLine(this.state.pointStyle[(id - 1)].index * 60)
    this.state.points[id - 1].className = 'active'
    this.setState({
      count: this.state.count + 1
    }, () => {
      if (this.state.count >= this.state.btns.length) {
        clearInterval(this.timer);
        this.refs['success'].play();
        this.saveResult();
        setTimeout(() => {
          this.setState({
            finishContent: './assets/images/finish.png'
          })
        }, 1000)
      }
    })


    this.refs['meteor-' + i].classList.add('show');
    setTimeout(() => {

      this.refs['meteor-' + i].classList.remove('show');
    }, 1000)

  } else {
    this.refs['meteor-' + i].classList.add('error');

    setTimeout(() => {

      this.refs['meteor-' + i].classList.remove('error');
    }, 700)
  }


}

beginTranslate() {


  this.state.pointStyle = this.mess(this.state.pointStyle);


  this.forceUpdate();


  this.timer2 = setTimeout(() => {

    this.timer = setInterval(() => {
      this.setState({
        clock: this.state.clock + 1,
      })
    }, 1000)
  }, 3000)

}

componentWillUnmount() {
  clearTimeout(this.timer1)
  clearTimeout(this.timer2)
  setTimeout(() => {

  }, 100)

}

mess(arr) {
  var _floor = Math.floor,
    _random = Math.random,
    len = arr.length,
    i, j, arri,
    n = _floor(len / 2) + 1;
  while (n--) {

    i = _floor(_random() * len);
    j = _floor(_random() * len);
    if (i !== j) {

      arri = arr[i];
      var index = arr.concat([])[i].index;
      var index1 = arr.concat([])[j].index;
      arr[i] = arr[j];
      arr[j] = arri;

    }
  }
  //增加切牌操作 
  i = _floor(_random() * len);
  arr.push.apply(arr, arr.splice(0, i));

  return arr; //要不要返回打乱后的数组呢？ 
}


createPoints() {

  var arr = [],
    R = this.viewW / 3 | 0 + 1,
    len = 6;



  for (var i = 0; i < len; i++) {
    var x = Math.sin(i * 360 / len * Math.PI / 180) * R;
    var y = Math.cos(i * 360 / len * Math.PI / 180) * R;
    // (i === 0) && (y += 50)
    //i === len / 2 && (y -= 50)
    arr.push({
      x: Math.round(x),
      y: Math.round(y),
      index: i,
      className: ''
    });
  }



  this.state.points = arr.concat([]);

  this.defaultPoints = arr;

  this.forceUpdate();

  return arr;

}

createLine() {

  var points = this.createPoints();
  var canvas = this.refs['canvas'];

  canvas.width = this.viewW;
  canvas.height = this.viewH;

  var context = canvas.getContext('2d');



  context.translate(canvas.width / 2, canvas.height / 2);
  //context.rotate(Math.PI / 180 * 30);
  context.beginPath();
  points.map((p, i) => {
    context[i === 0 ? 'moveTo' : 'lineTo'](p.x, p.y);
  });
  //context.fillStyle = '#f1f0de';
  //context.fill();


  context.closePath();

  var line = new Image();
  this.line = line;
  this.context = context;
  line.src = './assets/images/line.png';



}

drawLine(angle = 0) {

  setTimeout(() => {

    var context = this.context;
    var img = this.line;
    context.save();
    context.rotate(Math.PI / 180 * (-angle));
    context.drawImage(img, -34, 0);
    context.restore();
  }, 600)
}

animate() {
  setTimeout(() => {
    this.state.points.forEach((item, i) => {
      this.state.pointStyle.push(item);
    })
    this.forceUpdate()
    this.beginTranslate();
  }, 1100)
}

componentDidMount() {
  this.createLine();
  var {
    obserable
  } = this.props;
  obserable.on('stageAnimate', e => {
    this.animate();
  })
}


showToast(msg, fn) {
  this.setState({
    toast: msg
  });

  setTimeout(() => {
    this.setState({
      toast: ''
    });

    fn && fn()

  }, 2000)
}



getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}

}

export default PubCom(ZmitiStage);