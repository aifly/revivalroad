import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IScroll from 'iscroll';
import './assets/css/index.css';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
import Obserable from './components/public/obserable';


import ZmitiStage from './stage/index.jsx'
import ZmitiShareApp from './share/index.jsx'
import ZmitiIndexApp from './index/index.jsx'


var obserable = new Obserable();
var worksid = '1275459017';
worksid = '8986148900'; //linten

var data = { //新华社的公众号信息
	wxappid: 'wx5ec3d35069383211',
	wxappsecret: 'd94ea41d9cd2ba03c7cab5fc0e212cec'
}
data = {
	wxappid: 'wxfacf4a639d9e3bcc',
	wxappsecret: "149cdef95c99ff7cab523d8beca86080"
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			audioState: false
		}

		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		window.s = this;
		this.zmitiMap = [

			{
				"name": "北京市",
				"log": "116.46",
				"lat": "39.92"
			}, {
				"name": "上海市",
				"log": "121.48",
				"lat": "31.22"
			}, {
				"name": "天津市",
				"log": "117.2",
				"lat": "39.13"
			}, {
				"name": "重庆市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "石家庄",
				"log": "114.48",
				"lat": "38.03"
			}, {
				"name": "太原市",
				"log": "112.53",
				"lat": "37.87"
			}, {
				"name": "沈阳市",
				"log": "123.38",
				"lat": "41.8"
			}, {
				"name": "长春市",
				"log": "125.35",
				"lat": "43.88"
			}, {
				"name": "哈尔滨市",
				"log": "126.63",
				"lat": "45.75"
			}, {
				"name": "杭州市",
				"log": "120.19",
				"lat": "30.26"
			}, {
				"name": "福州市",
				"log": "119.3",
				"lat": "26.08"
			}, {
				"name": "济南市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "郑州市",
				"log": "113.65",
				"lat": "34.76"
			}, {
				"name": "武汉市",
				"log": "114.31",
				"lat": "30.52"
			}, {
				"name": "长沙市",
				"log": "113",
				"lat": "28.21"
			}, {
				"name": "广州市",
				"log": "113.23",
				"lat": "23.16"
			}, {
				"name": "海口市",
				"log": "110.35",
				"lat": "20.02"
			}, {
				"name": "成都市",
				"log": "104.06",
				"lat": "30.67"
			}, {
				"name": "贵阳市",
				"log": "106.71",
				"lat": "26.57"
			}, {
				"name": "昆明市",
				"log": "102.73",
				"lat": "25.04"
			}, {
				"name": "南昌市",
				"log": "115.89",
				"lat": "28.68"
			}, {
				"name": "西安市",
				"log": "108.95",
				"lat": "34.27"
			}, {
				"name": "西宁市",
				"log": "101.74",
				"lat": "36.56"
			}, {
				"name": "兰州市",
				"log": "103.73",
				"lat": "36.03"
			}, {
				"name": "南宁市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "乌鲁木齐市",
				"log": "87.68",
				"lat": "43.77"
			}, {
				"name": "呼和浩特市",
				"log": "111.65",
				"lat": "40.82"
			}, {
				"name": "拉萨市",
				"log": "91.11",
				"lat": "29.97"
			}, {
				"name": "银川市",
				"log": "106.27",
				"lat": "38.47"
			}, {
				"name": "台北市",
				"log": "121.5",
				"lat": "25.14"
			}, {
				"name": "香港",
				"log": "114.17",
				"lat": "22.27"
			}, {
				"name": "澳门",
				"log": "113.33",
				"lat": "22.13"
			}, {
				"name": "合肥市",
				"log": "117.27",
				"lat": "31.86"
			}, {
				"name": "南京市",
				"log": "118.78",
				"lat": "32.04"
			}
		]
	}
	render() {

		var data = {
			obserable,
			wxConfig: this.wxConfig.bind(this),
			changeURLPar: this.changeURLPar.bind(this),
			nickname: this.state.nickname,
			worksid: worksid
		}
		var isExist = this.state.src;

		return <div className='zmiti-main-ui'>
			{!isExist && <ZmitiStage {...data}></ZmitiStage>}
			{!isExist && <ZmitiShareApp {...data}></ZmitiShareApp>}
			{!isExist && <ZmitiIndexApp {...data}></ZmitiIndexApp>}

			{isExist && <ZmitiShareApp {...data}></ZmitiShareApp>}
			<audio ref='audio' loop autoPlay src='./assets/music/bg.MP3'></audio>
			<div className='zmiti-audio' onClick={this.toggleMusic.bind(this)}>
				{this.state.audioState && <img src='./assets/images/bg-ico2.png' className='zmiit-rotation'/>}
				{!this.state.audioState && <img src='./assets/images/bg-ico1.png'/>}
			</div>
			
		</div>
	}

	dragStart(index, e) {

	}

	createList() {
		var num = this.state.picLen * this.state.picLen;
		var arr = [];
		for (var i = 0; i < num; i++) {
			arr.push(i)
		}
		return arr;
	}

	wxConfig(title, desc, img, url) {
		var s = this;
		var appId = 'wxfacf4a639d9e3bcc'; //'wxfacf4a639d9e3bcc'; // data.wxappid; // 'wxfacf4a639d9e3bcc'; //data.wxappid;

		var durl = url || location.href.split('#')[0];

		var code_durl = encodeURIComponent(durl);

		$.ajax({
			type: 'get',
			url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl=" + code_durl,
			dataType: 'jsonp',
			jsonp: "callback",
			jsonpCallback: "jsonFlickrFeed",
			error() {

			},
			success(data) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appId, // 必填，公众号的唯一标识
					timestamp: '1488558145', // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: data.signature, // 必填，签名，见附录1
					jsApiList: ['checkJsApi',
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'onMenuShareQQ',
							'onMenuShareWeibo',
							'hideMenuItems',
							'showMenuItems',
							'hideAllNonBaseMenuItem',
							'showAllNonBaseMenuItem'
						] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});

				wx.ready(() => {

					//朋友圈

					wx.onMenuShareTimeline({
						title: title, // 分享标题
						link: durl, // 分享链接
						imgUrl: img, // 分享图标
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
					//朋友
					wx.onMenuShareAppMessage({
						title: title, // 分享标题
						link: durl,
						imgUrl: img, // 分享图标
						type: "link",
						dataUrl: "",
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
					//qq
					wx.onMenuShareQQ({
						title: title, // 分享标题
						link: durl, // 分享链接
						imgUrl: img, // 分享图标
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
				});
			}
		});

	}
	log(opt) {

		$.ajax({
			url: 'http://api.zmiti.com/v2/msg/send_msg',
			data: {
				type: opt.key || 'log',
				content: JSON.stringify(opt),
				to: ''
			}
		})
	}
	getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	}



	changeURLPar(url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	}
	componentDidMount() {
		var s = this;
		var src = s.getQueryString('src');
		this.setState({
			src
		})
		this.wxConfig(window.share.title, window.share.desc, window.clipShare.img);


		var audio = this.refs['audio'];
		//audio.volume = 0.2;

		setTimeout(function() {
			$(window).scrollTop(1);
		}, 0);
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function() {
			WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
				audio.play();
			});
		}, false);

		audio.addEventListener('play', () => {
			this.setState({
				audioState: true
			})
		})
		audio.addEventListener('pause', () => {
			this.setState({
				audioState: false
			})
		});

		$(document).one('touchstart', () => {
			if (audio.paused) {
				audio.play();
			}
		});
		//this.getOauthurl();


	}

	toggleMusic() {

		var audio = this.refs['audio'];
		audio[audio.paused ? 'play' : 'pause']();

	}



	isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

}


ReactDOM.render(<App></App>, document.getElementById('fly-main-ui'));