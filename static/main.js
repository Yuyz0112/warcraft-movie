var aData = [];
var hData = [];
var cityData = [];
var _geoData = geoData.slice(0);
var __geoData = geoData.slice(0);
var ___geoData = geoData.slice(0);
var ____geoData = geoData.slice(0);
var _____geoData = geoData.slice(0);

randomize(geoData , 0 , 0);
randomize(_geoData , 0.5 , -0.5);
randomize(__geoData , 1.8 , 1.8);
randomize(___geoData , -2 , 2);
randomize(____geoData , -2.3 , -2.3);
randomize(_____geoData , 5 , 1.4);

console.log(aData[0],hData[0])

var myChart = echarts.init(document.getElementById('main'));

var option = {
	backgroundColor: '#404a59',
	geo: {
		name: '强',
		type: 'scatter',
		map: 'china',
		label: {
			emphasis: {
				show: false
			}
		},
		itemStyle: {
			normal: {
				areaColor: '#323c48',
				borderColor: '#111'
			},
			emphasis: {
				areaColor: '#2a333d'
			}
		}
	},
	series: [{
		name: '联盟',
		type: 'scatter',
		coordinateSystem: 'geo',
		symbolSize: 2,
		large: true,
		itemStyle: {
			normal: {
				shadowBlur: 2,
				shadowColor: 'rgba(255, 255, 255, 0.8)',
				color: 'rgba(36, 127, 170, 1)'
			}
		},
		data: aData
	}, {
		name: '部落',
		type: 'scatter',
		coordinateSystem: 'geo',
		symbolSize: 2,
		large: true,
		itemStyle: {
			normal: {
				shadowBlur: 2,
				shadowColor: 'rgba(255, 255, 255, 0.8)',
				color: 'rgba(179, 0, 0, 1)'
			}
		},
		data: hData
	}]
};
myChart.setOption(option);

function randomize(arr, ampx, ampy){
	for (var i = 0; i < arr.length; i++) {
		arr[i][0] += ampx * Math.random();
		arr[i][1] += ampy * Math.random();
		if (Math.random() > 0.5) {
			aData.push(arr[i])
		} else {
			hData.push(arr[i])
		}
	}
}