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

    this.state = {

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

      maskContent: '',

      count: 0, //正确的个数 


    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

    window.ss = this;

  }
  render() {


    return <div className='zmiti-stage-main-ui'>
        <canvas ref='canvas' width='320' height='568'></canvas>
        <div className='zmiti-top'>
          <div className='zmiti-clock'>{this.state.clock}s</div>
          <img src='./assets/images/top.png'/>
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
        <div className='zmiti-xiaoxin'>
            <img src='./assets/images/xiaoxin.png'/>
            {this.state.showTip&& <img src='./assets/images/tip.png' />}
        </div>
        {this.state.maskContent || true && <div onClick={()=>{ this.setState({
          maskContent: ''
        })}} className='zmiti-error-mask'>
                    <img src={this.state.maskContent||'./assets/images/finish.png'}/>
                    <input type='file' ref='file'/>
                </div>


  } {
    this.state.finishContent && <div  className='zmiti-error-mask'>
                    <img src={this.state.finishContent}/>
                </div>
  } < /div>

}


play(id, item) {

  console.log(id, item);

  var i = id - 1;


  if (id - 1 < this.state.count) { //已经点过了，
    console.log('has clicked')

  }


  if (id - 1 === this.state.count) { //回答正确
    this.drawLine(this.state.pointStyle[(id - 1)].index * 60)
    this.state.points[id - 1].className = 'active'
    this.setState({
      count: this.state.count + 1
    }, () => {
      if (this.state.count >= this.state.btns.length) {
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

    this.setState({
      maskContent: './assets/images/error.png'
    });
    setTimeout(() => {
      this.setState({
        maskContent: ''
      });
    }, 2000)
    setTimeout(() => {

      this.refs['meteor-' + i].classList.remove('error');
    }, 700)
  }


}

beginTranslate() {


  this.state.pointStyle = this.mess(this.state.pointStyle);


  this.forceUpdate();

  setTimeout(() => {
    this.setState({
      showTip: true
    });
  }, 1000)

  setTimeout(() => {
    this.setState({
      showTip: false
    });

    this.timer = setInterval(() => {
      this.setState({
        clock: this.state.clock + 1
      })
    }, 1000)
  }, 3000)

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
  context.fillStyle = '#f1f0de';
  context.fill();


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

componentDidMount() {
  this.createLine();



  setTimeout(() => {

    this.state.points.forEach((item, i) => {
      this.state.pointStyle.push(item);
    })
    this.forceUpdate()
  }, 100)

  setTimeout(() => {
    this.beginTranslate();
  }, 1310)

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