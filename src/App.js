import React, { Component } from "react";
import { Card, CardContent, Typography, Table, Paper, TableBody, TableHead, TableCell, TableRow } from '@material-ui/core';
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
            zoom: 5,
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
            showStation: [],
            showMainStation: [],
            showGreenStation: [],
            showRedStation: [],
            showTrain: [],
            allStation_to_allStation: alldata.allStation_to_allStation
        }

        this.handleBudgetChange = this.handleBudgetChange.bind(this);
        this.handleTravelTimeChange = this.handleTravelTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        for (var i = 0; i < Object.keys(shanghai.name).length; i++) {
            if (this.state.allStation_to_allStation.find(x => x.id == shanghai.name[i].replace(" Railway Station", ""))) {
                this.state.allStations.push(shanghai.name[i].replace(" Railway Station", ""))
                this.state.value.push({ name: shanghai.name[i].replace(" Railway Station", ""), value: [shanghai.maps_y[i], shanghai.maps_x[i]] })
                this.state.showStation.push({ name: shanghai.name[i].replace(" Railway Station", ""), value: [shanghai.maps_y[i], shanghai.maps_x[i]] })
            }
        }
        for (var i = 0; i < Object.keys(zhejiang.name).length; i++) {
            if (this.state.allStation_to_allStation.find(x => x.id == zhejiang.name[i].replace(" Railway Station", ""))) {
                this.state.allStations.push(zhejiang.name[i].replace(" Railway Station", ""))
                this.state.value.push({ name: zhejiang.name[i].replace(" Railway Station", ""), value: [zhejiang.maps_y[i], zhejiang.maps_x[i]] })
                this.state.showStation.push({ name: zhejiang.name[i].replace(" Railway Station", ""), value: [zhejiang.maps_y[i], zhejiang.maps_x[i]] })
            }
        }
        for (var i = 0; i < Object.keys(jiangsu.name).length; i++) {
            if (this.state.allStation_to_allStation.find(x => x.id == jiangsu.name[i].replace(" Railway Station", ""))) {
                this.state.allStations.push(jiangsu.name[i].replace(" Railway Station", ""))
                this.state.value.push({ name: jiangsu.name[i].replace(" Railway Station", ""), value: [jiangsu.maps_y[i], jiangsu.maps_x[i]] })
                this.state.showStation.push({ name: jiangsu.name[i].replace(" Railway Station", ""), value: [jiangsu.maps_y[i], jiangsu.maps_x[i]] })
            }
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
            console.log("time::::", parseInt(time[0], 10) + " " + parseInt(time[1], 10))
            return parseInt(time[0], 10) * 60 + parseInt(time[1], 10)

        }

    }
    calculateStations(departureStation) {

        //用户点击了出发城市，触发这个function
        //console.log(this.state.shanghainan_all)
        var reachableStations = [{}]    //根据计算预算和时间后可以到达的城市
        var originStationCoords = this.state.value.find(x => x.name === departureStation)
        reachableStations.push({ name: originStationCoords.name, value: originStationCoords.value })
        //console.log(typeof this.state.allStations_to_allStations)
        var departureStation_to_allStations = this.state.allStation_to_allStation.find(x => x.id == departureStation)
        console.log("here")
        console.log(this.state.allStation_to_allStation.find(x => x.id == departureStation) == null)
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
                    if (departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i] <= this.state.budget && neededTime <= travelTime && departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i] > 0) { //如果价钱低于预算且需时低于旅游时间
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

        var departureStation_to_allStations = this.state.allStation_to_allStation.find(x => x.id == this.state.departureStation)
        var departureStation_to_arrivalStation = departureStation_to_allStations.eachStation_to_allStation_data.find(x => x.id == "Lianyungang")

        var departureStation_to_allStations = this.state.allStation_to_allStation.find(x => x.id == this.state.departureStation)
        var departureStation_to_arrivalStation = departureStation_to_allStations.eachStation_to_allStation_data.find(x => x.id == this.state.arrivalStation)
        console.log(departureStation_to_arrivalStation.eachStation_to_eachStation_data)
        for (var i = 0; i < departureStation_to_arrivalStation.eachStation_to_eachStation_data.price.length; i++) {
            var rawNeededTime = departureStation_to_arrivalStation.eachStation_to_eachStation_data.time_needed[i].split(":")
            var rawTravelTime = this.state.travelTime.split(":")
            var neededTime = this.convertTimeToMin(rawNeededTime)
            var travelTime = this.convertTimeToMin(rawTravelTime)
            console.log(this.state.departureStation,this.state.arrivalStation);
            console.log("time_needed:",departureStation_to_arrivalStation.eachStation_to_eachStation_data.time_needed[i])
            console.log("price:",departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i])
            if (departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i] <= this.state.budget && neededTime <= travelTime && departureStation_to_arrivalStation.eachStation_to_eachStation_data.price[i] > 0) { //如果价钱低于预算且需时低于旅游时间
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
        var dateobj = new Date()
        dateobj.setDate(dateobj.getDate()+3)
        var link = "https://us.trip.com/trains/china/list?DepartureStation="+this.state.departureStation.replace(' ', '+')+ "&ArrivalStation="+this.state.arrivalStation.replace(' ', '+')+"&DepartDate="+dateobj.getFullYear()+'-'+(dateobj.getMonth()+1)+'-'+(dateobj.getDate())+"&TrainNumber="+showTrain.train_number
        console.log(link)
        return (
            <TableRow key={showTrain.start_time}>
              <TableCell align="center" component="th" scope="row">
                {showTrain.train_number}
              </TableCell>
              <TableCell align="center">{showTrain.start_time}</TableCell>
              <TableCell align="center">{showTrain.arrive_time}</TableCell>
              <TableCell align="center">{showTrain.price}</TableCell>
              <TableCell align="center"><td><a href={link}>Click here</a></td></TableCell>
            </TableRow>
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

        const trainPath = 'path://M367.837,89.25h-54.824v-51h121.125c6.375,0,12.75,6.375,12.75,12.75c0,10.2,8.926,19.125,19.125,19.125S485.138,61.2,485.138,51c0-28.05-22.949-51-51-51h-280.5c-28.05,0-51,22.95-51,51c0,10.2,8.925,19.125,19.125,19.125c10.2,0,19.125-8.925,19.125-19.125c0-7.65,5.1-12.75,12.75-12.75h121.125v49.725h-54.825c-62.475,0-112.2,51-112.2,112.2v229.501c0,25.5,17.85,47.174,43.35,51l-36.975,70.125c-6.375,12.75-1.275,28.049,10.2,34.424c3.825,2.551,7.65,2.551,11.475,2.551c8.925,0,17.85-5.1,22.95-14.025l7.65-15.301h252.449l7.65,15.301c5.1,8.926,14.025,14.025,22.951,14.025c3.824,0,7.648-1.275,11.475-2.551c12.75-6.375,17.85-21.674,10.199-34.424l-36.975-70.125c24.225-3.826,43.35-25.5,43.35-51V201.45C480.038,138.975,429.038,89.25,367.837,89.25z M398.438,436.051c-20.4,0-36.977-16.576-36.977-36.977c0-20.398,16.576-36.975,36.977-36.975c20.398,0,36.975,16.576,36.975,36.975C435.413,419.475,418.837,436.051,398.438,436.051zM153.638,215.475c0-39.525,31.875-70.125,71.4-70.125h140.25c39.525,0,71.4,31.875,71.4,70.125v62.475c0,14.025-11.477,24.226-25.5,24.226H177.863c-14.025,0-25.5-10.201-25.5-24.226C153.638,277.95,153.638,215.475,153.638,215.475zM189.337,360.824c20.4,0,36.975,16.576,36.975,36.977c0,20.398-16.575,36.975-36.975,36.975c-20.4,0-36.975-16.576-36.975-36.975C152.363,377.4,168.938,360.824,189.337,360.824z M186.788,522.75l20.4-39.525h172.126l20.398,39.525H186.788z';



        const renderColor = () => {
            console.log("times")

            return "#52616b"
        }
        const color = ['#000000', '#ffffff', '#52616b'];
        const series = [];




        //console.log("item.name:",item.name)
        series.push(
            {

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

                        color: renderColor()
                    }
                },
                data: this.state.showStation

            })
        if (this.state.departureStation != '') {
            this.state.showStation.forEach((item, index) => {
                if (item.name == this.state.departureStation) {
                    console.log("nmsl", item)
                    series.push(
                        {

                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
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

                                    color: "#00adb5"
                                }
                            },
                            data: [item]
                        })

                }
            })

        }
        else {
            series.push(
                {

                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
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

                            color: "#00adb5"
                        }
                    },
                    data: []

                    //data: [item]
                    // data: item[1].map(function (dataItem) {
                    //     return {
                    //         name: dataItem[1].name,
                    //         value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    //     };
                    // })
                })
        }

        if (this.state.arrivalStation != '') {
            this.state.showStation.forEach((item, index) => {
                if (item.name == this.state.arrivalStation) {
                    console.log("nmsl", item)
                    series.push(
                        {

                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
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

                                    color: "#ff5722"
                                }
                            },
                            data: [item]
                            // data: item[1].map(function (dataItem) {
                            //     return {
                            //         name: dataItem[1].name,
                            //         value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                            //     };
                            // })
                        })

                }
            })

        }
        else {
            series.push(
                {

                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
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

                            color: "#00adb5"
                        }
                    },
                    data: []
                })
        }
        if (this.state.arrivalStation != '' && this.state.departureStation != '') {
            var departureValue = this.state.value.find(x => x.name == this.state.departureStation)
            var arrivalValue = this.state.value.find(y => y.name == this.state.arrivalStation)
            console.log(departureValue.value)
            series.push(
                {
                    //name: item[0] + ' Top10',
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: trainPath,
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            color: '#000',
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: [{ fromName: departureValue.name, toName: arrivalValue.name, coords: [departureValue.value, arrivalValue.value] }]
                },


            )

        }


        console.log("initialize:", series)

        const option = {
            backgroundColor: '#a8d8ea',
            title: {
                text: 'China Rail Travel Planner\nBy: Tongze Wang, Zhaoheng Chen, Howard Ng',

                left: 'center',
                textStyle: {
                    color: '#000'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderWidth: 1,
                borderRadius: 5,
                textStyle: {
                    color: '#000'
                },
                trigger: 'item',
                formatter: (param) => {
                    return "Station Name: " + param.name
                }
            },

            geo: {
                map: 'china',
                center: this.state.center,
                zoom: this.state.zoom,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#f0f5f9',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#c9d6df'
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
                console.log('color station:', this.echarts_react)
                var center = this.echarts_react.getEchartsInstance().getOption().geo[0].center
                var zoom = this.echarts_react.getEchartsInstance().getOption().geo[0].zoom
                this.setState({ center: center })
                //this.render()
                //this.echarts_react.getEchartsInstance().setOption({geo:[{zoom:5}]})
                this.setState({ zoom: zoom })
                console.log("chulaila:", this.echarts_react.getEchartsInstance().getOption().geo[0])
                this.calculateStations(param.data.name)

            } catch (error) {
                console.log({ error })
            }
        }
        else {
            //second click
            try {
                if (this.state.departureStation != this.state.arrivalStation) {
                    var center = this.echarts_react.getEchartsInstance().getOption().geo[0].center
                    var zoom = this.echarts_react.getEchartsInstance().getOption().geo[0].zoom
                    this.setState({ center: center })
                    this.setState({ zoom: zoom })
                    console.log("chulaila:", this.echarts_react.getEchartsInstance().getOption().geo[0])
                    console.log("kankan", this.echarts_react)
                    console.log("chulaila:", this.echarts_react.getEchartsInstance().getOption())
                    console.log('Second station:', param.data.name)
                    //console.log('series length:', series.length)
                    this.calculatePath(param.data.name)
                }

            } catch (error) {
                console.log({ error })
            }


        }
        //this.setState({ value: [{ name: 'beijing', value: [116.4551, 40.2539] }] })

    }
    onDataZoom = (data) => {
        console.log("zoom: ", data)
    }
    handleBudgetChange(event) {
        var center = this.echarts_react.getEchartsInstance().getOption().geo[0].center
        var zoom = this.echarts_react.getEchartsInstance().getOption().geo[0].zoom
        this.setState({ center: center })
        this.setState({ zoom: zoom })
        if (event.target.value == '') {
            this.setState({ budget:"10000"});
        }
        else {
            this.setState({ budget: event.target.value });
        }
        
    }
    handleTravelTimeChange(event) {
        var center = this.echarts_react.getEchartsInstance().getOption().geo[0].center
        var zoom = this.echarts_react.getEchartsInstance().getOption().geo[0].zoom
        this.setState({ center: center })
        this.setState({ zoom: zoom })
        if (event.target.value == '') {
            this.setState({ travelTime: "99:00" });
        }
        else {
            this.setState({ travelTime: event.target.value });
        }
    }

    handleSubmit(event) {
        var center = this.echarts_react.getEchartsInstance().getOption().geo[0].center
        var zoom = this.echarts_react.getEchartsInstance().getOption().geo[0].zoom
        this.setState({ center: center })
        this.setState({ zoom: zoom })
        this.setState({ showGreenStation: [] })
        this.setState({ showStation: this.state.value })
        this.setState({ clicked: false })
        this.setState({ arrivalStation: '' })
        this.setState({ departureStation: '' })
        this.setState({ showTrain: [] })
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
                <div style={{ position: 'absolute', left: 30, bottom: 30, zIndex: 15 }} >

                </div>
                {this.state.showTrain.length > 0 ? (
                    <div style={{ position: 'absolute',marginRight:60, right: 30, bottom: 30, zIndex: 15 }} >
                        <Typography variant="h6" component="h6" align="right">{"Departure Station: "+this.state.departureStation}</Typography>
                        <Typography variant="h6" component="h6" align="right">{"Arrival Station: "+this.state.arrivalStation}</Typography>
                        <div style={{backgroundColor:'#f0f5f9',height:150,width:500, border:1, font:16/26, overflow:'auto'}}>
                        <Paper >
                            <Table  aria-label="customized table">
                                <TableHead style={{backgroundColor:"#52616b"}}>
                                    <TableRow>
                                        <TableCell align="center" style={{color:'#fff'}}>Train Number:</TableCell>
                                        <TableCell align="center" style={{color:'#fff'}}>Start Time:</TableCell>
                                        <TableCell align="center" style={{color:'#fff'}}>Arrival Time:</TableCell>
                                        <TableCell align="center" style={{color:'#fff'}}>Price(¥)</TableCell>
                                        <TableCell align="center" style={{color:'#fff'}}>Buy Ticket:</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                    {this.state.showTrain.map(showTrain => (



                                        this.renderList(showTrain)



                                    ))}

                                </TableBody>
                            </Table>
                        </Paper>
                        </div>
                    </div>

                ) : null}

            </div>
        );
    }
}


const divStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    margin: 0
}

export default App;