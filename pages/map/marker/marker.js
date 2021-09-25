import { CDN_PATH } from '../../../config/appConfig';
// 引入SDK核心类
const QQMapWX = require("../../../utils/qqmap-wx-jssdk.js");

// 实例化API核心类
var qqmapsdk = new QQMapWX({
	key: '24JBZ-VB6CV-HPBPV-U72XF-IHVY2-NXBOL' // 必填
});

const RADIUS = 4;
// 莲花山公园
// 22.553612,114.058671
// 世界之窗
// 22.534641,113.97296
// 欢乐谷
// 22.541652,113.980509
// 东部华侨城
// 22.624511,114.2905
const points =
	[{
		name: '莲花山公园',
		latitude: 22.553612,
		longitude: 114.058671,
	}, {
		name: '世界之窗',
		latitude: 22.534641,
		longitude: 113.97296,
	}, {
		name: '欢乐谷',
		latitude: 22.541652,
		longitude: 113.980509,
	}, {
		name: '东部华侨城',
		latitude: 22.624511,
		longitude: 114.2905,
	},]

const getInitMaker = (name, latitude, longitude) => {
	const INIT_MARKER = {
		callout: {
			content: name,
			padding: 10,
			borderRadius: 2,
			display: 'ALWAYS'
		},
		longitude,
		latitude,
		iconPath: './imgs/Marker1_Activated@3x.png',
		width: '34px',
		height: '34px',
		rotate: 0,
		alpha: 1
	};
	return INIT_MARKER
}
const INIT_CALLOUT = {
	content: '莲花山公园',
	padding: 12,
	display: 'ALWAYS',
	fontSize: 14,
	textAlign: 'center',
	borderRadius: RADIUS,
	borderWidth: 2,
	bgColor: '#ffffff'
};
const INIT_CALLOUT_MARKER = {
	callout: {
		...INIT_CALLOUT
	},
	longitude: 114.058671,
	latitude: 22.553612,
};

Page({

	/**
   * 页面的初始数据
   */
	data: {
		imgs: {
			rightArrow: `${CDN_PATH}/iconArrowRight@3x.png`
		},
		tabList: [{
			name: '标注点设置'
		}, {
			name: '气泡窗口'
		}],
		markerImgs: [{
			normal: './imgs/Marker1_Normal@3x.png',
			active: './imgs/Marker1_Activated@3x.png'
		}, {
			normal: './imgs/Marker2_Normal@3x.png',
			active: './imgs/Marker2_Activated@3x.png'
		}, {
			normal: './imgs/Marker3_Normal@3x.png',
			active: './imgs/Marker3_Activated@3x.png'
		}],
		calloutColors: [
			{ text: '文本颜色', value: '#3875FF' },
			{ text: '文本颜色', value: '#00C562' },
			{ text: '文本颜色', value: '#F74A14' },
			{ text: '默认颜色', value: '' }
		],
		calloutBorderColors: [
			{ text: '', value: '#3875FF', icon: `${CDN_PATH}/iconLinecolorBlue@3x.png` },
			{ text: '', value: '#00C562', icon: `${CDN_PATH}/iconLinecolorBlue@3x.png` },
			{ text: '', value: '#F74A14', icon: `${CDN_PATH}/iconLinecolorBlue@3x.png` },
			{ text: '默认颜色', value: '' }
		],
		calloutBgColors: [
			{ text: '', value: '#3875FF' },
			{ text: '', value: '#00C562' },
			{ text: '', value: '#ffffff' }
		],
		calloutFontSizes: [
			{ text: '小', value: 12 },
			{ text: '正常', value: 14 },
			{ text: '大', value: 16 }
		],
		calloutAligns: [
			{
				normal: `${CDN_PATH}/iconAlignLeft_Normal@3x.png`,
				active: `${CDN_PATH}/iconAlignLeft_Activated@3x.png`,
				value: 'left'
			}, {
				normal: `${CDN_PATH}/iconAlignCenter_Normal@3x.png`,
				active: `${CDN_PATH}/iconAlignCenter_Activated@3x.png`,
				value: 'center'
			}, {
				normal: `${CDN_PATH}/iconAlignRight_Normal@3x.png`,
				active: `${CDN_PATH}/iconAlignRight_Activated@3x.png`,
				value: 'right'
			}
		],
		calloutBorderWidths: [
			{
				normal: `${CDN_PATH}/iconLinewidthS_Normal@3x.png`,
				active: `${CDN_PATH}/iconLinewidthS_Activated@3x.png`,
				value: 1
			}, {
				normal: `${CDN_PATH}/iconLinewidthM_Normal@3x.png`,
				active: `${CDN_PATH}/iconLinewidthM_Activated@3x.png`,
				value: 2
			}, {
				normal: `${CDN_PATH}/iconLinewidthL_Normal@3x.png`,
				active: `${CDN_PATH}/iconLinewidthL_Activated@3x.png`,
				value: 3
			}
		],
		calloutPaddings: [
			{
				normal: `${CDN_PATH}/iconTextSpaceS_Normal@3x.png`,
				active: `${CDN_PATH}/iconTextSpaceS_Activated@3x.png`,
				value: 12
			}, {
				normal: `${CDN_PATH}/iconTextSpaceM_Normal@3x.png`,
				active: `${CDN_PATH}/iconTextSpaceM_Activated@3x.png`,
				value: 16
			}, {
				normal: `${CDN_PATH}/iconTextSpaceL_Normal@3x.png`,
				active: `${CDN_PATH}/iconTextSpaceL_Activated@3x.png`,
				value: 20
			}
		],
		markers: points.map(point => getInitMaker(point.name, point.latitude, point.longitude)),
		calloutMarkers: [{
			...INIT_CALLOUT_MARKER
		}],
		tabIndex: 0,
		markerImgIndex: 0,
		calloutAlignIndex: 1,
		calloutBorderColorIndex: 3,
		calloutBorderWidthIndex: 1,
		calloutPaddingIndex: 0,
		showColorActionsheet: false,
		showBorderColorActionsheet: false,
		showBgColorActionsheet: false,
		showRadius: true,
		scale: 15,
		location: {
			longitude: 114.058671,
			latitude: 22.553612,
		},
		percent: 100
	},
	onShow() {
		wx.getLocation({
			type: 'gcj02',
			success: (res) => {
				const { latitude, longitude } = res;
				this.setData({
					location: {
						latitude,
						longitude
					}
				});
			}
		});
	},
	onClickTab(event) {
		this.setData({
			tabIndex: event.detail.current,
			scale: 15,
			location: {
				longitude: 114.058671,
				latitude: 22.553612,
			}
		});
	},
	onChangeShowCallout(event) {
		const { value } = event.detail;
		if (value) {
			this.setData({
				'markers[0].callout.display': 'ALWAYS'
			});
		} else {
			this.setData({
				'markers[0].callout.display': 'BYCLICK'
			});
		}
	},
	onSelectMarkerImg(event) {
		const markerImgIndex = event.currentTarget.dataset.index;
		if (markerImgIndex === this.data.markerImgIndex) {
			return;
		}
		this.setData({
			'markers[0].iconPath': this.data.markerImgs[markerImgIndex].active,
			markerImgIndex
		});
	},
	onChangeMarkerRotate(event) {
		const { value } = event.detail;
		this.setData({
			'markers[0].rotate': value
		});
	},
	onChangeMarkerAlpha(event) {
		const { value } = event.detail;
		this.setData({
			'markers[0].alpha': value,
			percent: (value * 100).toFixed(0)
		});
	},
	onResetMarkerConfig() {
		this.setData({
			'markers[0]': {
				...INIT_MARKER
			},
			markerImgIndex: 0,
			scale: 15,
			location: {
				longitude: 114.058671,
				latitude: 22.553612,
			},
			percent: 100
		});
	},
	onInputChange(event) {
		const { value } = event.detail;
		this.setData({
			'calloutMarkers[0].callout.content': value
		});
	},
	ontriggerSelectColor() {
		this.setData({
			showColorActionsheet: true
		});
	},
	onSelectColor(event) {
		const { value } = event.detail;
		if (value) {
			this.setData({
				showColorActionsheet: false,
				'calloutMarkers[0].callout.color': value
			});
		} else {
			const callout = { ...this.data.calloutMarkers[0].callout };
			delete callout.color;
			this.setData({
				showColorActionsheet: false,
				'calloutMarkers[0].callout': {
					...callout
				}
			});
		}
	},
	onSelectFontSize(event) {
		const { index } = event.currentTarget.dataset;
		const fontSize = this.data.calloutFontSizes[index].value;
		if (fontSize === this.data.calloutMarkers[0].callout.fontSize) {
			return;
		}
		this.setData({
			'calloutMarkers[0].callout.fontSize': fontSize
		});
	},
	onSelectAlign(event) {
		const { index } = event.currentTarget.dataset;
		if (index === this.data.calloutAlignIndex) {
			return;
		}
		this.setData({
			calloutAlignIndex: index,
			'calloutMarkers[0].callout.textAlign': this.data.calloutAligns[index].value
		});
	},
	onChangeShowRadius(event) {
		this.setData({
			showRadius: event.detail.value,
			'calloutMarkers[0].callout.borderRadius': event.detail.value ? RADIUS : 0
		});
	},
	onSelectBorderWidth(event) {
		const { index } = event.currentTarget.dataset;
		if (index === this.data.calloutBorderWidthIndex) {
			return;
		}
		this.setData({
			calloutBorderWidthIndex: index,
			'calloutMarkers[0].callout.borderWidth': this.data.calloutBorderWidths[index].value
		});
	},
	ontriggerSelectBorderColor() {
		this.setData({
			showBorderColorActionsheet: true
		});
	},
	onSelectBorderColor(event) {
		const { value, index } = event.detail;
		if (value) {
			this.setData({
				showBorderColorActionsheet: false,
				'calloutMarkers[0].callout.borderColor': value,
				calloutBorderColorIndex: index
			});
		} else {
			const callout = { ...this.data.calloutMarkers[0].callout };
			delete callout.borderColor;
			this.setData({
				showBorderColorActionsheet: false,
				'calloutMarkers[0].callout': {
					...callout
				},
				calloutBorderColorIndex: index
			});
		}
	},
	ontriggerSelectBgColor() {
		this.setData({
			showBgColorActionsheet: true
		});
	},
	onSelectBgColor(event) {
		const { value } = event.detail;
		if (value) {
			this.setData({
				showBgColorActionsheet: false,
				'calloutMarkers[0].callout.bgColor': value
			});
		} else {
			const callout = { ...this.data.calloutMarkers[0].callout };
			delete callout.bgColor;
			this.setData({
				showBgColorActionsheet: false,
				'calloutMarkers[0].callout': {
					...callout
				}
			});
		}
	},
	onSelectPadding(event) {
		const { index } = event.currentTarget.dataset;
		if (index === this.data.calloutPaddingIndex) {
			return;
		}
		this.setData({
			calloutPaddingIndex: index,
			'calloutMarkers[0].callout.padding': this.data.calloutPaddings[index].value
		});
	},
	onResetCalloutConfig() {
		this.setData({
			'calloutMarkers[0].callout': {
				...INIT_CALLOUT
			},
			calloutAlignIndex: 1,
			calloutBorderColorIndex: 3,
			calloutBorderWidthIndex: 1,
			calloutPaddingIndex: 0,
			showRadius: true,
			scale: 15,
			location: {
				longitude: 114.058671,
				latitude: 22.553612,
			}
		});
	},
	onShareAppMessage: function () {
		return {
			title: '腾讯位置服务示例中心'
		};
	},
	//在Page({})中使用下列代码
	//触发表单提交事件，调用接口
	onShow(e) {
		var _this = this;
		//调用距离计算接口
		qqmapsdk.direction({
			mode: 'transit',//'transit'(公交路线规划)
			//from参数不填默认当前地址
			from: {"name":"莲花山公园","latitude":22.553612,"longitude":114.058671},
			// from: e.detail.value.start,
			to: {"name":"世界之窗","latitude":22.534641,"longitude":113.97296},
			// to: e.detail.value.dest,
			success: function (res) {
				console.log(res);
				var ret = res.result.routes[0];
				var count = ret.steps.length;
				var pl = [];
				var coors = [];
				//获取各个步骤的polyline
				for (var i = 0; i < count; i++) {
					if (ret.steps[i].mode == 'WALKING' && ret.steps[i].polyline) {
						coors.push(ret.steps[i].polyline);
					}
					if (ret.steps[i].mode == 'TRANSIT' && ret.steps[i].lines[0].polyline) {
						coors.push(ret.steps[i].lines[0].polyline);
					}
				}
				//坐标解压（返回的点串坐标，通过前向差分进行压缩）
				var kr = 1000000;
				for (var i = 0; i < coors.length; i++) {
					for (var j = 2; j < coors[i].length; j++) {
						coors[i][j] = Number(coors[i][j - 2]) + Number(coors[i][j]) / kr;
					}
				}
				//定义新数组，将coors中的数组合并为一个数组

				var coorsArr = [];
				for (var i = 0; i < coors.length; i++) {
					coorsArr = coorsArr.concat(coors[i]);
				}
				//将解压后的坐标放入点串数组pl中
				for (var i = 0; i < coorsArr.length; i += 2) {
					pl.push({ latitude: coorsArr[i], longitude: coorsArr[i + 1] })
				}
				//设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
				_this.setData({
					latitude: pl[0].latitude,
					longitude: pl[0].longitude,
					polyline: [{
						points: pl,
						color: '#FF0000DD',
						width: 4
					}]
				})
			},
			fail: function (error) {
				console.error(error);
			},
			complete: function (res) {
				console.log(res);
			}
		});
	}
});
