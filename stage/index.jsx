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



    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

    window.ss = this;

  }
  render() {


    return <div className='zmiti-stage-main-ui'>
        <canvas ref='canvas' width='300' height='300' style={{border:'1px solid red'}}></canvas>
    </div>

  }


  createPoints() {

    var arr = [],
      R = 130,
      len = 6;



    for (var i = 0; i < len; i++) {
      var x = Math.sin(i * 360 / len * Math.PI / 180) * R;
      var y = Math.cos(i * 360 / len * Math.PI / 180) * R;
      arr.push({
        x: Math.round(x),
        y: Math.round(y)
      });
    }
    console.log(arr);
    return arr;

  }

  createLine() {
    var points = this.createPoints();
    var canvas = this.refs['canvas'];

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