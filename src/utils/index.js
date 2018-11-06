import _ from 'lodash/core';

const formatNumber = n => {
  let str = n.toString();
  return str[1] ? str : `0${str}`;
};

  // @beday 向前浮动天数
const formatDateToPicker = (date, beday) => {
  if (beday) {
    date = new Date(date - beday * 24 * 60 * 60 * 1000);
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let result = [year, month, day].map(formatNumber).join('-');

  return result;
};

const formatTime = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  let t1 = [year, month, day].map(formatNumber).join('/');
  let t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
};

const formatTime2 = date => {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return {
    h: ('0' + hour).substr(-2),
    m: ('0' + minute).substr(-2),
    s: ('0' + second).substr(-2)
  };
};

const formatDate = date => {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${month}月${day}日`;
};

// 2018-03-09  => {y: 2018, m: 3, d:9}
const formatData2 = (data, sign) => {
  let arr = null;
  if (sign) {
    arr = data.split(sign);
  } else {
    arr = data.split('-');
  }

  return {
    y: arr[0],
    m: parseInt(arr[1]),
    am: arr[1],
    d: parseInt(arr[2]),
    ad: arr[2]
  };
};

// 计算两个经纬度之间的距离
const sumLocation = ({lat1, lng1, lat2, lng2}) => {
  // console.log(lat1, lng1, lat2, lng2);
  let radLat1 = lat1 * Math.PI / 180.0;
  let radLat2 = lat2 * Math.PI / 180.0;
  let a = radLat1 - radLat2;
  let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;

  let result = {};
  result['s'] = Number((s * 1000).toFixed(1)); // 单位 m
  if (s > 1) {
    result['km'] = s.toFixed(1);
  } else {
    result['m'] = (s * 1000).toFixed(1);
  }

  return result;
};

// 返回两个经纬度之间的距离数据和显示文本
const backDistance = ({lat1, lng1, lat2, lng2}) => {
  let result = sumLocation({'lat1': parseFloat(lat1), 'lng1': parseFloat(lng1), 'lat2': parseFloat(lat2), 'lng2': parseFloat(lng2)});
  let callback = {
    num: result.s,
    text: ''
  };
  if (result.km) {
    if (result.km > 50) {
      callback.text = '> 50.0km';
    } else {
      callback.text = result.km + 'km';
    }
  } else {
    if (result.m < 100) {
      callback.text = '< 100m';
    } else {
      callback.text = result.m + 'm';
    }
  }
  return callback;
};

// 过滤分页时重复的数据
const filterRepeatData = (params1, params2) => {
  let filterArr = [];

  _.forEach(params2, (item2, index2) => {
    let result = _.find(params1, (item1, index1) => {
      return item1.id === item2.id && item1.name === item2.name;
    });
    if (!result) {
      filterArr.push(item2);
    }
  });
  return filterArr;
};

export default {
  formatNumber,
  formatTime,
  formatTime2,
  formatDate,
  formatData2,
  formatDateToPicker,
  sumLocation,
  backDistance,
  filterRepeatData
};
