/**
 * 对数据进行提取
 * @param  {obj} data 原始数据
 * @return {obj}      处理后的数据（数组形式）
 */
var sortData = function(data) {
    var time = [];
    var ret_data = {};
    for (var d in data) {
        if (data.hasOwnProperty(d)) {
            // console.log(data[d]);//每一年份
            time.push(d);
            ret_data[d] = { '1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [] };
            for (var i = 0, len = data[d].length; i < len; i++) {
                var type = data[d][i].type != null ? data[d][i].type : 1;
                // console.log('to push:', ret_data[d], type);
                ret_data[d]['' + type].push({
                    name: data[d][i].desc,
                    value: data[d][i].level, //data[d][i].type * 10
                    loc: [parseFloat(data[d][i].LNGB).toFixed(2), parseFloat(data[d][i].LATB).toFixed(2)]
                });
            }
            // ret_data.push({
            // 	name:data[d].address, // 最后用province+address决定比较好
            // 	value:10 * data[d].type
            // })
        }
    }
    return {
        ret_data: ret_data,
        time: time
    };
}

/**
 * 将数据处理成配置参数
 * @param  {obj} data 提取后的数据
 * @return {obj}      可配置的数据
 */
var convertData = function(data) {
    // console.log('in :', data);
    var res = [];
    for (var i = 0; i < data.length; i++) {
        res.push({
            name: data[i].name,
            value: data[i].loc.concat(data[i].value * 10)
                // value:[100 + (Math.random() * 10), 30 + (Math.random() * 10)].concat(data[i].value)
                // value:geoCoord.concat(data[i].value)
        });
        // var geoCoord = geoCoordMap[data[i].name];
        // if (geoCoord) {
        // 	res.push({
        // 		name:data[i].name,
        // 		// value:[100 + (Math.random() * 10), 30 + (Math.random() * 10)].concat(data[i].value)
        // 		// value:geoCoord.concat(data[i].value)
        // 	});
        // }
    }
    console.log('corvert:', res);
    return res;
};


// console.log('new_data:', new_data);
// 数据来源
var data_origin = "数据来源：本作品根据 中华人民共和国环境保护部数据中心 提供的全国主要流域重点断面 历年的监测数据汇总而成。";
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('charts'));
// 获取数据
var data2004 = {
        "1": {
            "province": "湖南",
            "year": 2005,
            "address": "湖南岳阳岳阳楼",
            "serious": 0,
            "type": 4,
            "event": "长江流域 湖南岳阳岳阳楼 2005年监测到水质为Ⅳ级的占21%"
        },
        "2": {
            "province": "江西",
            "year": 2005,
            "address": "江西南昌滁槎",
            "serious": 0,
            "type": 4,
            "event": "长江流域 江西南昌滁槎 2005年监测到水质为Ⅳ级的占40%"
        },
        "3": {
            "province": "湖南",
            "year": 2005,
            "address": "湖南岳阳岳阳楼",
            "serious": 0,
            "type": 3,
            "event": "长江流域 湖南岳阳岳阳楼 2005年监测到水质为Ⅲ级的占40%"
        },
        "4": {
            "province": "湖北",
            "year": 2005,
            "address": "湖北武汉宗关",
            "serious": 0,
            "type": 3,
            "event": "长江流域 湖北武汉宗关 2005年监测到水质为Ⅲ级的占21%"
        },
        "5": {
            "province": "河南",
            "year": 2005,
            "address": "河南南阳陶岔",
            "serious": 0,
            "type": 3,
            "event": "长江流域 河南南阳陶岔 2005年监测到水质为Ⅲ级的占2%"
        },
        "6": {
            "province": "江苏",
            "year": 2005,
            "address": "江苏扬州三江营",
            "serious": 0,
            "type": 3,
            "event": "长江流域 江苏扬州三江营 2005年监测到水质为Ⅲ级的占30%"
        },
        "7": {
            "province": "四川",
            "year": 2005,
            "address": "四川乐山岷江大桥",
            "serious": 0,
            "type": 2,
            "event": "长江流域 四川乐山岷江大桥 2005年监测到水质为Ⅱ级的占19%"
        },
        "8": {
            "province": "四川",
            "year": 2005,
            "address": "四川攀枝花龙洞",
            "serious": 0,
            "type": 3,
            "event": "长江流域 四川攀枝花龙洞 2005年监测到水质为Ⅲ级的占9%"
        }
    }
    // 获取处理后的数据
var sort_data = sortData(window.data);
var new_data = sort_data.ret_data;
var time = sort_data.time;
console.log('new_data:', new_data, time);
var geoCoordMap = {
    '上海青浦急水港': [120.901556, 31.101556],
    '云南大理小关邑': [100.231747, 25.624186],
    '云南德宏嘎中桥': [98.10848, 24.15858],
    '云南昆明滇池南岸': [102.666299, 24.666934],
    '云南昆明罗家营': [102.780936, 25.311084],
    '云南昆明西苑隧道': [102.637339, 24.970672],
    '云南昆明观音山': [102.676944, 24.876944],
    '云南玉溪孤山': [102.843092, 24.414452],
    '云南红河州河口': [103.956722, 22.506722],
    '云南西双版纳橄榄坝': [100.916667, 21.85],
    '内蒙古乌海海勃湾': [106.927222, 39.393889],
    '内蒙古包头画匠营子': [106.909722, 40.526389],
    '内蒙古呼伦贝尔大铁桥': [116.79083, 48.643841],
    '内蒙古呼伦贝尔嵯岗': [118.113567, 49.265025],
    '内蒙古呼伦贝尔贝尔湖': [117.704893, 47.815002],
    '内蒙古呼伦贝尔黑山头': [119.306389, 50.156389],
    '北京古北口': [117.283333, 40.783333],
    '北京门头沟沿河城': [115.715278, 40.081944],
    '吉林临江苇沙河': [126.757275, 41.744803],
    '吉林延边南坪': [129.215162, 42.274427],
    '吉林延边圈河': [130.533333, 42.566667],
    '吉林敦化新甸': [128.7026, 43.744731],
    '吉林松原松林': [124.7218, 45.3628],
    '吉林溪浪口': [126.510797, 44.312322],
    '吉林白城白沙滩': [124.436667, 47.603333],
    '吉林长春南楼': [125.319661, 43.873143],
    '吉林长春松花江村': [106.927222, 39.393889],
    '吉林长白山绿江村': [128.191202, 41.422149],
    '吉林集安上活龙': [126.131318, 41.065793],
    '四川乐山岷江大桥': [103.767861, 29.567861],
    '四川宜宾凉姜沟': [104.6, 28.783333],
    '四川广元清风峡': [105.878611, 32.661944],
    '四川攀枝花龙洞': [101.506433, 26.597383],
    '四川泸州沱江二桥': [105.433333, 28.9],
    '天津三岔口': [117.189417, 39.139417],
    '天津果河桥': [117.748389, 40.031722],
    '宁夏中卫新墩': [37.45, 105.033333],
    '宁夏石嘴山麻黄沟': [105.365145, 37.031611],
    '安徽亳州颜集': [115.892611, 33.975944],
    '安徽合肥湖滨': [117.458333, 31.675],
    '安徽安庆皖河口': [117.021389, 30.504722],
    '安徽宿州杨庄': [117.228611, 34.061944],
    '安徽宿州泗县公路桥': [117.879722, 33.463056],
    '安徽巢湖裕溪口': [117.800278, 31.600278],
    '安徽淮北小王桥': [116.5925, 33.559167],
    '安徽淮南石头埠': [116.996111, 23.679444],
    '安徽滁州小柳巷': [117.148611, 32.165278],
    '安徽界首七渡口': [115.334167, 33.2675],
    '安徽蚌埠蚌埠闸': [117.242222, 32.958889],
    '安徽阜南王家坝': [115.603889, 34.420556],
    '安徽阜阳张大桥': [115.2425, 33.075833],
    '安徽阜阳徐庄': [115.233333, 33.066667],
    '山东临沂涝沟桥': [118.152694, 34.486028],
    '山东临沂清泉寺': [118.47875, 34.70085],
    '山东临沂重坊桥': [118.143889, 34.610556],
    '山东枣庄台儿庄大桥': [117.75, 34.533333],
    '山东济南泺口': [117.013222, 36.779889],
    '山东聊城秤钩湾': [115.516667, 36.9],
    '山西忻州万家寨水库': [111.931111, 39.581111],
    '山西运城河津大桥': [111.700556, 34.550556],
    '广东中山横栏': [113.226111, 22.526111],
    '广东广州长洲': [113.406944, 23.040278],
    '广东清远七星岗': [113.066944, 23.683611],
    '广西凭祥平而关': [106.520833, 22.1875],
    '广西南宁老口': [109.25, 22.766667],
    '广西崇左八角电站': [106.7868, 22.2282],
    '广西桂林阳朔': [110.497222, 25.180556],
    '广西梧州界首': [111.423611, 23.473611],
    '广西贵港石嘴': [109.865278, 22.881944],
    '广西防城港东兴': [108.059283, 21.619681],
    '新疆63团伊犁河大桥': [81.270958, 43.907198],
    '新疆额尔齐斯南湾水文站': [87.8636, 47.3711],
    '江苏南京林山': [118.523889, 31.890556],
    '江苏宜兴兰山嘴': [119.911806, 31.211806],
    '江苏徐州小红圈': [118.103611, 34.620278],
    '江苏徐州李集桥': [117.000556, 34.750556],
    '江苏扬州三江营': [119.654217, 32.3513],
    '江苏无锡沙渚': [120.229556, 31.396222],
    '江苏泗洪大屈': [118.11, 33.476667],
    '江苏盱眙淮河大桥': [118.495, 33.028333],
    '江苏苏州西山': [120.2, 31.216667],
    '江苏连云港大兴桥': [118.7, 41.083333],
    '江苏邳苍艾山西大桥': [117.014444, 34.764444],
    '江西上饶余干康山': [116.438764, 28.884067],
    '江西九江河西水厂': [25.133333, 93.7],
    '江西九江蛤蟆石': [116.116667, 29.516667],
    '江西九江都昌': [116.344218, 29.317843],
    '江西南昌滁槎': [116.083333, 28.766667],
    '河北张家口八号桥': [115.547778, 40.347778],
    '河北石家庄岗南水库': [113.992778, 38.326111],
    '河南信阳淮滨水文站': [115.591111, 32.474444],
    '河南信阳蒋集水文站': [115.8612, 32.478383],
    '河南南阳陶岔': [111.705278, 32.671944],
    '河南周口沈丘闸': [115.070694, 33.387361],
    '河南周口鹿邑付桥闸': [115.490694, 33.874028],
    '河南永城黄口': [116.55, 33.933333],
    '河南济源小浪底': [112.400639, 34.917306],
    '河南驻马店班台': [115.144667, 32.661333],
    '浙江嘉兴斜路港': [120.708611, 30.891944],
    '浙江嘉兴王江泾': [120.708611, 30.891944],
    '浙江杭州鸠坑口': [118.858889, 29.858889],
    '浙江湖州新塘港': [120.838889, 30.838889],
    '海南万泉河丹村': [110.402853, 19.208068],
    '海南昌江昌化': [108.908752, 19.232459],
    '海南海口铁桥村': [110.404311, 19.977973],
    '湖北丹江口胡家岭': [111.502222, 32.552222],
    '湖北宜昌南津关': [111.270672, 30.754006],
    '湖北武汉宗关': [114.333333, 30.616667],
    '湖北鄂州七星': [114.579849, 30.269218],
    '湖南岳阳城陵矶': [113.226103, 29.542769],
    '湖南岳阳岳阳楼': [113.088611, 29.388611],
    '湖南岳阳鹿角': [113.016564, 29.159524],
    '湖南常德坡头': [112.131885, 28.923574],
    '湖南常德沙河口': [112.1322, 29.472609],
    '湖南益阳万家嘴': [111.916087, 28.783683],
    '湖南益阳南嘴': [112.312112, 29.056639],
    '湖南长沙新港': [112.837778, 28.337778],
    '甘肃兰州新城桥': [103.583889, 36.117222],
    '甘肃天水牛背': [106.720436, 34.375104],
    '福建福州白岩潭': [119.459944, 25.976611],
    '西藏林芝米瑞': [94.618007, 29.497732],
    '贵州赤水鲢鱼溪': [105.746119, 28.617202],
    '辽宁丹东江桥': [124.436667, 40.153333],
    '辽宁抚顺大伙房水库': [124.368889, 41.885556],
    '辽宁盘锦兴安': [122.283333, 41.183333],
    '辽宁营口辽河公园': [122.231764, 40.681764],
    '辽宁辽阳汤河水库': [127.021389, 41.104722],
    '辽宁铁岭朱尔山': [123.56, 42.21],
    '重庆朱沱': [105.848972, 29.015639],
    '陕西渭南潼关吊桥': [110.224167, 34.613333],
    '青海湟水民和桥': [102.918128, 36.296589],
    '黑龙伊春江嘉荫': [129.984086, 48.799161],
    '黑龙江佳木斯江心岛': [126.667611, 45.815721],
    '黑龙江依兰牡丹江口': [129.5617, 44.5536],
    '黑龙江同江': [132.468056, 47.634722],
    '黑龙江呼玛': [124.911997, 51.813084],
    '黑龙江抚远': [134.392855, 47.95016],
    '黑龙江抚远乌苏镇': [134.666667, 48.25],
    '黑龙江漠河北极村': [122.343676, 53.492899],
    '黑龙江肇源': [124.988889, 45.472222],
    '黑龙江虎林虎头': [133.057153, 46.01028],
    '黑龙江鸡西档壁镇': [131.830661, 45.40509],
    '黑龙江鸡西知一桥': [131.9739, 45.5384],
    '黑龙江鸡西龙王庙': [132.868949, 45.07165],
    '黑龙江黑河': [129.522944, 50.089611]
};

option = {
    timeline: {
        height: 60,
        data: time,
        label: {
            formatter: function(s) {
                return s;
            },
            textStyle: {
                color: '#fff'
            }
        },
        checkpointStyle: {
            symbol: 'circle',
            symbolSize: '18',
            color: '#fff',
            borderColor: 'auto',
            borderWidth: 'auto',
            borderRadius: '50%',
            label: {
                show: false,
                textStyle: {
                    color: 'auto'
                }
            }
        },
        lineStyle: {
            color: '#fff',
            width: 1,
            type: 'dashed'
        },
        controlStyle: {
            itemSize: 30,
            itemGap: 10,
            normal: {
                color: '#ff0000'
            },
            emphasis: {
                color: '#00ff00'
            }
        },
        autoPlay: true,
        playInterval: 1000
    },
    options: [{
            backgroundColor: 'rgba(0,0,0,0)',
            // backgroundColor:'#0B0D18',
            // backgroundColor:'rgba(0,0,0,0)',
            // backgroundColor:'#404a59',
            title: {
                text: '2004-2016年全国水质监测类别分布图',
                subtext: '',
                // sublink:'www.baidu.com',
                left: 'center',
                top: '20px',
                textStyle: {
                    color: '#fff',
                    fontSize: '16'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(a, b) {
                    console.log('tooltip:', a, b);
                    return a.name.split('\n').join('<br/>');
                },
                textStyle: {
                    color: '#fff',
                    fontSize: '10'
                }
            },
            legend: {
                orient: 'vertical',
                y: '350px',
                x: '1040px',
                data: [
                    'I类：源头水',
                    'II类：集中式生活饮用水地表水源地一类保护区',
                    'III类：集中式生活饮用水地表水源地二类保护区',
                    'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    '劣V类：不适合饮用，基本丧失其功能性',
                    '☆无监测数据'
                ],
                textStyle: {
                    color: '#fff',
                    padding: '0 50px 0 0'
                },
                selectedMode: 'multiple'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false, //禁止拖放
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
                    name: 'I类：源头水',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(new_data['2004']['1']),
                    symbolSize: function(val) {
                        // console.log(val);
                        return val[2];
                    },
                    label: {
                        normal: {
                            formatter: function(a, b) {
                                // console.log(a,b);
                                return '';
                                // return a.seriesName + ':' + a.name;
                            },
                            // formatter:'{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#7DC3F2'
                        }
                    }
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(new_data['2004']['2']),
                    symbolSize: function(val) {
                        // console.log(val);
                        return val[2];
                    },
                    label: {
                        normal: {
                            formatter: function(a, b) {
                                // console.log(a,b);
                                return '';
                                // return a.seriesName + ':' + a.name;
                            },
                            // formatter:'{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#7FFFD4'
                        }
                    }
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(new_data['2004']['3']),
                    symbolSize: function(val) {
                        // console.log(val);
                        return val[2];
                    },
                    label: {
                        normal: {
                            formatter: function(a, b) {
                                // console.log(a,b);
                                return '';
                                // return a.seriesName + ':' + a.name;
                            },
                            // formatter:'{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F08742'
                        }
                    }
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(new_data['2004']['4']),
                    symbolSize: function(val) {
                        // console.log(val);
                        return val[2];
                    },
                    label: {
                        normal: {
                            formatter: function(a, b) {
                                // console.log(a,b);
                                return '';
                                // return a.seriesName + ':' + a.name;
                            },
                            // formatter:'{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#E79291'
                        }
                    }
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(new_data['2004']['5']),
                    symbolSize: function(val) {
                        // console.log(val);
                        return val[2];
                    },
                    label: {
                        normal: {
                            formatter: function(a, b) {
                                // console.log(a,b);
                                return '';
                                // return a.seriesName + ':' + a.name;
                            },
                            // formatter:'{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#900C3F'
                        }
                    }
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(new_data['2004']['6']),
                    symbolSize: function(val) {
                        // console.log(val);
                        return val[2];
                    },
                    label: {
                        normal: {
                            formatter: function(a, b) {
                                // console.log(a,b);
                                return '';
                                // return a.seriesName + ':' + a.name;
                            },
                            // formatter:'{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#6A2A43'
                        }
                    }
                },
                {
                    name: '☆',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(new_data['2004']['7']),
                    symbolSize: function(val) {
                        // console.log(val);
                        return val[2];
                    },
                    label: {
                        normal: {
                            formatter: function(a, b) {
                                // console.log(a,b);
                                return '';
                                // return a.seriesName + ':' + a.name;
                            },
                            // formatter:'{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#6A2A43'
                        }
                    }
                },
                // {
                // 	name:'空气污染',
                // 	type:'effectScatter',
                // 	coordinateSystem:'geo',
                // 	data:convertData(new_data.sort(function (a, b) {
                // 		return b.value - a.value;
                // 	}).slice(0, 6)),
                // 	symbolSize:function (val) {
                // 		return val[2] / 10;
                // 	},
                // 	showEffectOn:'render',
                // 	rippleEffect:{
                // 		brushType:'stroke'
                // 	},
                // 	hoverAnimation:true,
                // 	label:{
                // 		normal:{
                // 			formatter:'{b}',
                // 			position:'right',
                // 			show:true
                // 		}
                // 	},
                // 	itemStyle:{
                // 		normal:{
                // 			color:'#f4e925',
                // 			shadowBlur:10,
                // 			shadowColor:'#333'
                // 		}
                // 	},
                // 	zlevel:1
                // }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2005']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2005']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2005']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2005']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2005']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2005']['6']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2005']['7']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2006']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2006']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2006']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2006']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2006']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2006']['6']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2006']['7']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2007']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2007']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2007']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2007']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2007']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2007']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2007']['7']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2008']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2008']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2008']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2008']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2008']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2008']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2008']['9']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2009']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2009']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2009']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2009']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2009']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2009']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2009']['7']),
                },
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2010']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2010']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2010']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2010']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2010']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2010']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2010']['7']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2011']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2011']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2011']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2011']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2011']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2011']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2011']['7']),
                },
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2012']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2012']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2012']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2012']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2012']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2012']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2012']['7']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2013']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2013']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2013']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2013']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2013']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2013']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2013']['7']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2014']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2014']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2014']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2014']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2014']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2014']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2014']['7']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2015']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2015']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2015']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2015']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2015']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2015']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2015']['7']),
                }
            ]
        },
        {
            series: [{
                    name: 'I类：源头水',
                    data: convertData(new_data['2016']['1']),
                },
                {
                    name: 'II类：集中式生活饮用水地表水源地一类保护区',
                    data: convertData(new_data['2016']['2']),
                },
                {
                    name: 'III类：集中式生活饮用水地表水源地二类保护区',
                    data: convertData(new_data['2016']['3']),
                },
                {
                    name: 'IV类：不适合饮用,适用于一般工业用和人体非直接接触娱乐用水',
                    data: convertData(new_data['2016']['4']),
                },
                {
                    name: 'V类：不适合饮用，适用于农业用水区及一般景观要求水域',
                    data: convertData(new_data['2016']['5']),
                },
                {
                    name: '劣V类：不适合饮用，基本丧失其功能性',
                    data: convertData(new_data['2016']['6']),
                },
                {
                    name: '☆',
                    data: convertData(new_data['2016']['7']),
                },
            ]
        },
    ]

};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
window.resize = myChart.resize();