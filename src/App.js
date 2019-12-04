import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import shanghai_station from './shanghai_station_english.json'
import zhejiang_station from './zhejiang_station_english.json'
import jiangsu_station from './jiangsu_station_english.json'
import alldata from './all.json'
require("echarts/map/js/china.js");
class App extends Component {
    constructor(props) {
        super(props)
        var shanghai = shanghai_station
        var zhejiang = zhejiang_station
        var jiangsu = jiangsu_station
        // var all = alldata
        //console.log(alldata.allStation_to_allStation)
        this.state = {
            departureStation: '',
            arrivalStation: '',
            clicked: false,
            center: [121.4737, 31.2304],
            budget: '500',
            travelTime: '02:00',
            allStations: [],
            shanghainan_all: [],
            shanghainan_hangzhou: [{}],
            value: [{}],
            showStation: [{}],
            showTrain: [],
            allStation_to_allStation: alldata.allStation_to_allStation
        }

        this.handleBudgetChange = this.handleBudgetChange.bind(this);
        this.handleTravelTimeChange = this.handleTravelTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        for (var i = 0; i < Object.keys(shanghai.name).length; i++) {
            this.state.allStations.push(shanghai.name[i].replace(" Railway Station", ""))
            this.state.value.push({ name: shanghai.name[i].replace(" Railway Station", ""), value: [shanghai.maps_y[i], shanghai.maps_x[i]] })
            this.state.showStation.push({ name: shanghai.name[i].replace(" Railway Station", ""), value: [shanghai.maps_y[i], shanghai.maps_x[i]] })
        }
        for (var i = 0; i < Object.keys(zhejiang.name).length; i++) {
            this.state.allStations.push(zhejiang.name[i].replace(" Railway Station", ""))
            this.state.value.push({ name: zhejiang.name[i].replace(" Railway Station", ""), value: [zhejiang.maps_y[i], zhejiang.maps_x[i]] })
            this.state.showStation.push({ name: zhejiang.name[i].replace(" Railway Station", ""), value: [zhejiang.maps_y[i], zhejiang.maps_x[i]] })
        }
        for (var i = 0; i < Object.keys(jiangsu.name).length; i++) {
            this.state.allStations.push(jiangsu.name[i].replace(" Railway Station", ""))
            this.state.value.push({ name: jiangsu.name[i].replace(" Railway Station", ""), value: [jiangsu.maps_y[i], jiangsu.maps_x[i]] })
            this.state.showStation.push({ name: jiangsu.name[i].replace(" Railway Station", ""), value: [jiangsu.maps_y[i], jiangsu.maps_x[i]] })
        }
        //this.setState({showStation:this.state.value})
        // var tf = true
        // this.state.allStations.forEach(arrivalStation => {
        //     var all = []
        //     var min = 150

        //     for (var i = 300; i > min; i--) {
        //         all.push({ price: i, time: i })
        //     }
        //     if (tf) {
        //         all.push({ price: 149, time: 149 })
        //     }
        //     this.state.shanghainan_all.push({ toStation: arrivalStation, data: all })
        //     tf = !tf
        // })
        // for (var i = 0; i < 200 ; i++) {
        //     this.state.shanghainan_hangzhou.push({ price: i, time: i })
        // }
        // this.state.shanghainan_hangzhou.push({ price: 100, time: 30 })


        //console.log("shanghai"+this.state.value)

    }
    convertTimeToMin(time) {
        if (time.length != 2) {
            return null
        } else {
            //console.log(int(time[0])+" "+time[1])
            return parseInt(time[0], 10) * 60 + parseInt(time[1], 10)
        }

    }
    calculateStations(departureStation) {//用户点击了出发城市，触发这个function
        //console.log(this.state.shanghainan_all)
        var reachableStations = [{}]    //根据计算预算和时间后可以到达的城市
        var originStationCoords = this.state.value.find(x => x.name === departureStation)
        reachableStations.push({ name: originStationCoords.name, value: originStationCoords.value })
        //console.log(typeof this.state.allStations_to_allStations)
        var departureStation_to_allStations = this.state.allStation_to_allStation.find(x => x.id == departureStation)
        //console.log(departureStation_to_allStations)
        this.state.allStations.forEach(arrivalStation => {
            //console.log("arrivalStation:", arrivalStation)
            //console.log(typeof departureStation_to_allStations)
            var stationCoords = this.state.value.find(x => x.name === arrivalStation)
            var departureStation_to_arrivalStation = departureStation_to_allStations.eachStation_to_allStation_data.find(x => x.id === arrivalStation)
            if (departureStation_to_arrivalStation != undefined) {
                //console.log(departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[0])
                for (var i = 0; i < departureStation_to_arrivalStation.eachStation_to_eachStation_data.price.length; i++) {
                    //console.log(departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i] + ' ' + departureStation_to_arrivalStation.eachStation_to_eachStation_data.time_needed[i])
                    var rawNeededTime = departureStation_to_arrivalStation.eachStation_to_eachStation_data.time_needed[i].split(":")
                    //console.log(departureStation_to_arrivalStation.eachStation_to_eachStation_data.time_needed[i])
                    //console.log(departureStation_to_arrivalStation.eachStation_to_eachStation_data.time_needed[i].split(":"))
                    //var time_needed = new Date();
                    var rawTravelTime = this.state.travelTime.split(":")
                    var neededTime = this.convertTimeToMin(rawNeededTime)
                    var travelTime = this.convertTimeToMin(rawTravelTime)
                    console.log(rawNeededTime + ' ' + rawTravelTime)
                    console.log(neededTime + ' ' + travelTime)
                    if (departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i] <= this.state.budget && neededTime <= travelTime) { //如果价钱低于预算且需时低于旅游时间
                        reachableStations.push({ name: stationCoords.name, value: stationCoords.value })
                        //this.setState({ showStation: reachableStations })
                        break
                    }
                }
                //console.log(departureStation_to_arrivalStation.eachStation_to_eachStation_data)
            } else {
                console.log("arrivalStation undefined:", arrivalStation)
            }
            // for(var i = 0;i < Object.keys(departureStation_to_arrivalStation.eachStation_to_eachStation_data).length;i++){
            //    // console.log(departureStation_to_arrivalStation.price[i]+' ' +departureStation_to_arrivalStation[i])
            // }
            //console.log(departureStation_to_arrivalStation)
        })
        this.setState({ departureStation: departureStation })
        this.setState({ showStation: reachableStations })
        this.setState({ clicked: true })
        // var departureStation_to_allStations = allStations_to_allStations.find(x=>x.id == departureStation) //从所有站到所有站点中，找出用户点击的出发站到所有站的数据
        // this.state.allStations.forEach(arrivalStation =>{//游历所有站
        //     var stationCoords = this.state.value.find(x => x.name == arrivalStation)//取出当前游历到的station的坐标数据
        //     var departureStation_to_arrivalStation = departureStation_to_allStations.find(x=>x.id == arrivalStation)//从出发站到所有站的数据中，找出出发站到当前游历到的站的数据
        //     departureStation_to_arrivalStation.data.forEach(item =>{//游历每个车次
        //         if (item.price < budget && item.time < travelTime) { //如果价钱低于预算且需时低于旅游时间
        //             reachableStations.push({ name: stationCoords.name, value: stationCoords.value })//把当前station的坐标数据push到可到达城市列表里
        //         }
        //     })
        // })
        // this.setState({ value: reachableStations })//最后更新地图上显示的点


        // this.state.allStations.forEach(arrivalStation => {
        //     //console.log(departureStation, arrivalStation)
        //     var stationCoords = this.state.value.find(x => x.name == arrivalStation)
        //     var arraivalStationData = this.state.shanghainan_all.find(x => x.toStation == arrivalStation)
        //     //console.log(arraivalStationData)
        //     arraivalStationData.data.forEach(item => {
        //         if (item.price < 150 && item.time < 150) {
        //             reachableStations.push({ name: stationCoords.name, value: stationCoords.value })
        //             console.log("yes");
        //             //this.state.value.pop()
        //         }
        //     })
        // })
        // this.setState({ value: reachableStations })
        // console.log("yes");
    }

    calculatePath(destination) {

        var availableTrain = []
        this.setState({ arrivalStation: destination })
        console.log('arrive station ' + this.state.arrivalStation)
        console.log('departure station ' + this.state.departureStation)
        console.log("second click")
        this.setState({ clicked: false })
        var departureStation_to_allStations = this.state.allStation_to_allStation.find(x => x.id == this.state.departureStation)
        var departureStation_to_arrivalStation = departureStation_to_allStations.eachStation_to_allStation_data.find(x => x.id == this.state.arrivalStation)
        console.log(departureStation_to_arrivalStation.eachStation_to_eachStation_data)
        for (var i = 0; i < departureStation_to_arrivalStation.eachStation_to_eachStation_data.price.length; i++) {
            var rawNeededTime = departureStation_to_arrivalStation.eachStation_to_eachStation_data.time_needed[i].split(":")
            var rawTravelTime = this.state.travelTime.split(":")
            var neededTime = this.convertTimeToMin(rawNeededTime)
            var travelTime = this.convertTimeToMin(rawTravelTime)
            if (departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i] <= this.state.budget && neededTime <= travelTime) { //如果价钱低于预算且需时低于旅游时间
                availableTrain.push({
                    train_number: departureStation_to_arrivalStation.eachStation_to_eachStation_data.train_number[i],
                    start_time: departureStation_to_arrivalStation.eachStation_to_eachStation_data.start_time[i],
                    arrive_time: departureStation_to_arrivalStation.eachStation_to_eachStation_data.arrive_time[i],
                    price: departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i]
                })
                //this.setState({ showStation: reachableStations })

            }
        }
        console.log(availableTrain)
        this.setState({ showTrain: availableTrain })


    }

    renderList(showTrain) {
        return (
            
            <div style={{backgroundColor:'#f0f5f9' }}>
                <table style={{marginLeft:30}}>
                    <thead>
                    <tr>
                        <th>Train</th>
                        <th>{showTrain.train_number}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Start Time</td>
                        <td>{showTrain.start_time}</td>
                    </tr>
                    
                    <tr>
                        <td>Arrive Time</td>
                        <td>{showTrain.arrive_time}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>{'¥'+showTrain.price}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
           
        );
    }


    getOption = () => {


        const geoCoordMap = {
            'sbb': [121.4648, 31.2891],
            '东莞': [113.8953, 22.901],
            '东营': [118.7073, 37.5513],
            '中山': [113.4229, 22.478],
            '临汾': [111.4783, 36.1615],
            '临沂': [118.3118, 35.2936],
            '丹东': [124.541, 40.4242],
            '丽水': [119.5642, 28.1854],
            '乌鲁木齐': [87.9236, 43.5883],
            '佛山': [112.8955, 23.1097],
            '保定': [115.0488, 39.0948],
            '兰州': [103.5901, 36.3043],
            '包头': [110.3467, 41.4899],
            '北京': [116.4551, 40.2539],
            '北海': [109.314, 21.6211],
            '南京': [118.8062, 31.9208],
            '南宁': [108.479, 23.1152],
            '南昌': [116.0046, 28.6633],
            '南通': [121.1023, 32.1625],
            '厦门': [118.1689, 24.6478],
            '台州': [121.1353, 28.6688],
            '合肥': [117.29, 32.0581],
            '呼和浩特': [111.4124, 40.4901],
            '咸阳': [108.4131, 34.8706],
            '哈尔滨': [127.9688, 45.368],
            '唐山': [118.4766, 39.6826],
            '嘉兴': [120.9155, 30.6354],
            '大同': [113.7854, 39.8035],
            '大连': [122.2229, 39.4409],
            '天津': [117.4219, 39.4189],
            '太原': [112.3352, 37.9413],
            '威海': [121.9482, 37.1393],
            '宁波': [121.5967, 29.6466],
            '宝鸡': [107.1826, 34.3433],
            '宿迁': [118.5535, 33.7775],
            '常州': [119.4543, 31.5582],
            '广州': [113.5107, 23.2196],
            '廊坊': [116.521, 39.0509],
            '延安': [109.1052, 36.4252],
            '张家口': [115.1477, 40.8527],
            '徐州': [117.5208, 34.3268],
            '德州': [116.6858, 37.2107],
            '惠州': [114.6204, 23.1647],
            '成都': [103.9526, 30.7617],
            '扬州': [119.4653, 32.8162],
            '承德': [117.5757, 41.4075],
            '拉萨': [91.1865, 30.1465],
            '无锡': [120.3442, 31.5527],
            '日照': [119.2786, 35.5023],
            '昆明': [102.9199, 25.4663],
            '杭州': [119.5313, 29.8773],
            '枣庄': [117.323, 34.8926],
            '柳州': [109.3799, 24.9774],
            '株洲': [113.5327, 27.0319],
            '武汉': [114.3896, 30.6628],
            '汕头': [117.1692, 23.3405],
            '江门': [112.6318, 22.1484],
            '沈阳': [123.1238, 42.1216],
            '沧州': [116.8286, 38.2104],
            '河源': [114.917, 23.9722],
            '泉州': [118.3228, 25.1147],
            '泰安': [117.0264, 36.0516],
            '泰州': [120.0586, 32.5525],
            '济南': [117.1582, 36.8701],
            '济宁': [116.8286, 35.3375],
            '海口': [110.3893, 19.8516],
            '淄博': [118.0371, 36.6064],
            '淮安': [118.927, 33.4039],
            '深圳': [114.5435, 22.5439],
            '清远': [112.9175, 24.3292],
            '温州': [120.498, 27.8119],
            '渭南': [109.7864, 35.0299],
            '湖州': [119.8608, 30.7782],
            '湘潭': [112.5439, 27.7075],
            '滨州': [117.8174, 37.4963],
            '潍坊': [119.0918, 36.524],
            '烟台': [120.7397, 37.5128],
            '玉溪': [101.9312, 23.8898],
            '珠海': [113.7305, 22.1155],
            '盐城': [120.2234, 33.5577],
            '盘锦': [121.9482, 41.0449],
            '石家庄': [114.4995, 38.1006],
            '福州': [119.4543, 25.9222],
            '秦皇岛': [119.2126, 40.0232],
            '绍兴': [120.564, 29.7565],
            '聊城': [115.9167, 36.4032],
            '肇庆': [112.1265, 23.5822],
            '舟山': [122.2559, 30.2234],
            '苏州': [120.6519, 31.3989],
            '莱芜': [117.6526, 36.2714],
            '菏泽': [115.6201, 35.2057],
            '营口': [122.4316, 40.4297],
            '葫芦岛': [120.1575, 40.578],
            '衡水': [115.8838, 37.7161],
            '衢州': [118.6853, 28.8666],
            '西宁': [101.4038, 36.8207],
            '西安': [109.1162, 34.2004],
            '贵阳': [106.6992, 26.7682],
            '连云港': [119.1248, 34.552],
            '邢台': [114.8071, 37.2821],
            '邯郸': [114.4775, 36.535],
            '郑州': [113.4668, 34.6234],
            '鄂尔多斯': [108.9734, 39.2487],
            '重庆': [107.7539, 30.1904],
            '金华': [120.0037, 29.1028],
            '铜川': [109.0393, 35.1947],
            '银川': [106.3586, 38.1775],
            '镇江': [119.4763, 31.9702],
            '长春': [125.8154, 44.2584],
            '长沙': [113.0823, 28.2568],
            '长治': [112.8625, 36.4746],
            '阳泉': [113.4778, 38.0951],
            '青岛': [120.4651, 36.3373],
            '韶关': [113.7964, 24.7028]
        };

        const BJData = [
            [{ name: '北京' }, { name: '上海', value: 95 }],
            [{ name: '北京' }, { name: '广州', value: 90 }],
            [{ name: '北京' }, { name: '大连', value: 80 }],
            [{ name: '北京' }, { name: '南宁', value: 70 }],
            [{ name: '北京' }, { name: '南昌', value: 60 }],
            [{ name: '北京' }, { name: '拉萨', value: 50 }],
            [{ name: '北京' }, { name: '长春', value: 40 }],
            [{ name: '北京' }, { name: '包头', value: 30 }],
            [{ name: '北京' }, { name: '重庆', value: 20 }],
            [{ name: '北京' }, { name: '常州', value: 10 }]
        ];

        const SHData = [
            [{ name: '上海' }, { name: '包头', value: 95 }],
            [{ name: '上海' }, { name: '昆明', value: 90 }],
            [{ name: '上海' }, { name: '广州', value: 80 }],
            [{ name: '上海' }, { name: '郑州', value: 70 }],
            [{ name: '上海' }, { name: '长春', value: 60 }],
            [{ name: '上海' }, { name: '重庆', value: 50 }],
            [{ name: '上海' }, { name: '长沙', value: 40 }],
            [{ name: '上海' }, { name: '北京', value: 30 }],
            [{ name: '上海' }, { name: '丹东', value: 20 }],
            [{ name: '上海' }, { name: '大连', value: 10 }]
        ];

        const GZData = [
            [{ name: '广州' }, { name: '福州', value: 95 }],
            [{ name: '广州' }, { name: '太原', value: 90 }],
            [{ name: '广州' }, { name: '长春', value: 80 }],
            [{ name: '广州' }, { name: '重庆', value: 70 }],
            [{ name: '广州' }, { name: '西安', value: 60 }],
            [{ name: '广州' }, { name: '成都', value: 50 }],
            [{ name: '广州' }, { name: '常州', value: 40 }],
            [{ name: '广州' }, { name: '北京', value: 30 }],
            [{ name: '广州' }, { name: '北海', value: 20 }],
            [{ name: '广州' }, { name: '海口', value: 10 }]
        ];

        const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        const convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };

        const color = ['#a6c84c', '#ffa022', '#46bee9'];
        const series = [];
        [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach((item, i) => {
            series.push(
                {
                    name: item[0],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 1,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    },
                    data: this.state.showStation
                    // data: item[1].map(function (dataItem) {
                    //     return {
                    //         name: dataItem[1].name,
                    //         value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    //     };
                    // })
                });
        });

        const option = {
            backgroundColor: '#404a59',
            title: {
                text: 'Train Stations',
                subtext: 'CSE184 final project',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data: ['北京 Top10', '上海 Top10', '广州 Top10'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single'
            },
            geo: {
                map: 'china',
                center: this.state.center,
                zoom: 5,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: series
        };
        return option;
    };
    onChartClick = (param) => {

        if (this.state.clicked == false) {
            try {
                console.log('First station:', param.data.name)

                this.calculateStations(param.data.name)

            } catch (error) {
                console.log({ error })
            }
        }
        else {
            //second click
            try {
                console.log('Second station:', param.data.name)

                this.calculatePath(param.data.name)

            } catch (error) {
                console.log({ error })
            }


        }
        //this.setState({ value: [{ name: 'beijing', value: [116.4551, 40.2539] }] })

    }
    handleBudgetChange(event) {
        this.setState({ budget: event.target.value });
    }
    handleTravelTimeChange(event) {
        this.setState({ travelTime: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ showStation: this.state.value })
        this.setState({ clicked: false })
        this.setState({ arrivalStation: '' })
        this.setState({ departureStation: '' })
        this.setState({showTrain:[]})
        //alert('A name was submitted: ' + this.state.budget + " " + this.state.travelTime);
        event.preventDefault();
    }
    render() {
        let onEvents = {
            'click': this.onChartClick,
            'dataZoom': this.onDataZoom
        }
        return (
            <div className='examples' style={divStyle}>


                <div className='parent' style={{ width: "100%", height: "100%" }} >

                    <ReactEcharts
                        ref={(e) => { this.echarts_react = e; }}
                        option={this.getOption()}
                        style={{ height: '937px', width: '100%' }}
                        className='react_for_echarts'
                        onEvents={onEvents} />

                </div>
                <div className='minibox' style={{ position: 'absolute', right: 30, top: 30, zIndex: 15 }} >
                    <div className='form' style={{ width: "80%", height: "100%", display: 'flex', alignItems: 'center' }}>
                        <div className='parent' style={{ width: 300, height: 200, alignItems: 'center', backgroundColor: '#fafafa', borderRightWidth: 1, borderColor: 'black', display: 'row' }}>
                            <form style={{ marginLeft: 30, marginTop: 20 }} onSubmit={this.handleSubmit}>
                                <label style={{ fontWeight: 'bold', color: '#393e46' }}>
                                    Budget:<br></br>
                                    <input type="text" value={this.state.budget} onChange={this.handleBudgetChange} /><br></br>
                                </label>
                                <label style={{ fontWeight: 'bold', color: '#393e46' }}>
                                    Travel Time:<br></br>
                                    <input type="text" value={this.state.travelTime} onChange={this.handleTravelTimeChange} /><br></br>
                                </label>
                                <input style={{ marginLeft: 40, marginTop: 40, backgroundColor: 'white', height: 30, marginHorizontal: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginVertical: 5, shadowOffset: { width: 2, height: 2 }, shadowColor: 'black', shadowOpacity: 0.2 }} type="submit" value="Reset Map" />
                            </form>
                        </div>

                    </div>
                </div>
                <div className='train' style={{ position: 'absolute', right: 30, bottom: 30, zIndex: 15}} >
                    <div style={{marginRight:70,height:300,width:250, border:1, font:16/26, overflow:'auto'}}>
                    
                        {this.state.showTrain.map(showTrain => (
                            <div key={`${showTrain.start_time}`}>
                                    {this.renderList(showTrain)}
                            </div>
                                ))}
                    </div>
                </div>
            </div>
        );
    }
}


const divStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    margin: 0
};
export default App;