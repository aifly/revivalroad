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

      points: []


    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

    window.ss = this;

  }
  render() {


    return <div className='zmiti-stage-main-ui'>
        <canvas ref='canvas' width='320' height='568'></canvas>
        <div className='zmiti-stage-point-C'>
          {this.state.points.map((item,i)=>{
            return <div key={i} className='zmiti-point' style={{WebkitTransform:'translate('+item.x+'px,'+(item.y)+'px)'}}>
              {i+1}
            </div>
          })}
        </div>
        <div className='zmiti-translate' onClick={this.beginTranslate.bind(this)}>开始变换</div>
    </div>

  }

  beginTranslate() {


    this.state.points = this.mess(this.state.points);


    this.forceUpdate();

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
      R = 140,
      len = 6;



    for (var i = 0; i < len; i++) {
      var x = Math.sin(i * 360 / len * Math.PI / 180) * R;
      var y = Math.cos(i * 360 / len * Math.PI / 180) * R;
      (i === 0) && (y += 50)
      i === len / 2 && (y -= 50)
      arr.push({
        x: Math.round(x),
        y: Math.round(y)
      });
    }



    this.state.points = arr.concat([]);

    this.state.points = this.state.points.sort((item, i) => {
      return Math.random() - .5;
    });
    this.forceUpdate();

    console.log(arr);
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
    context.closePath();
    context.stroke();



  }

  componentDidMount() {

    this.createLine();

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