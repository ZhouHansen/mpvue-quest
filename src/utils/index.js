const formatNumber = n => {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
};

const formatDateToPicker = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const result = [year, month, day].map(formatNumber).join('-');

  return result;
};

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('/');
  const t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
};

const formatDate = date => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}月${day}日`;
};

const sumLocation = ({lat1, lng1, lat2, lng2}) => {
  let radLat1 = lat1 * Math.PI / 180.0;
  let radLat2 = lat2 * Math.PI / 180.0;
  let a = radLat1 - radLat2;
  let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;

  let result = {};

  if (s > 1) {
    result['km'] = s.toFixed(1);
  } else {
    result['m'] = (s * 1000).toFixed(1);
  }
  return result;
};

const backDistance = ({lat1, lng1, lat2, lng2}) => {
  console.log(parseFloat(lat1));
  console.log(parseFloat(lng1));
  console.log(lat2);
  console.log(parseFloat(lng2));
  let result = sumLocation({'lat1': parseFloat(lat1), 'lng1': parseFloat(lng1), 'lat2': parseFloat(lat2), 'lng2': parseFloat(lng2)});
  let callback = '';
  if (result.km) {
    if (result.km > 50) {
      callback = '> 50.0km';
    } else {
      callback = result.km + 'km';
    }
  } else {
    if (result.m < 100) {
      callback = '< 100m';
    } else {
      callback = result.m + 'm';
    }
  }

  return callback;
};

export default {
  formatNumber,
  formatTime,
  formatDate,
  formatDateToPicker,
  sumLocation,
  backDistance
};
