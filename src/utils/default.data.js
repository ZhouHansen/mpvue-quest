// 固定的过滤条件数据
const SubjectsFilterData = [
  {text: '全部', desc: '不限科目', icon: '../../img/subjects/subject_14.png', id: undefined, tag: 'all'},
  {text: '美术', desc: '美术', icon: '../../img/subjects/subject_1.png', id: 'art', tag: 'art'},
  {text: '英语', desc: '英语', icon: '../../img/subjects/subject_2.png', id: 'english', tag: 'english'},
  {text: '工作坊', desc: '工作坊', icon: '../../img/subjects/subject_11.png', id: 'workshop', tag: 'workshop'},
  {text: '中文', desc: '中文', icon: '../../img/subjects/subject_3.png', id: 'chinese', tag: 'chinese'},
  {text: '音乐', desc: '音乐', icon: '../../img/subjects/subject_4.png', id: 'music', tag: 'music'},
  {text: '数学', desc: '数学', icon: '../../img/subjects/subject_5.png', id: 'math', tag: 'math'},
  {text: '自然', desc: '自然', icon: '../../img/subjects/subject_6.png', id: 'nature', tag: 'nature'},
  {text: '托管', desc: '托管', icon: '../../img/subjects/subject_7.png', id: 'trust', tag: 'trust'},
  {text: '机器人', desc: '机器人', icon: '../../img/subjects/subject_13.png', id: 'robot', tag: 'robot'},
  {text: '学前', desc: '学前', icon: '../../img/subjects/subject_8.png', id: 'pre', tag: 'pre'},
  {text: '营地', desc: '营地', icon: '../../img/subjects/subject_9.png', id: 'camp', tag: 'camp'},
  {text: '演讲', desc: '演讲', icon: '../../img/subjects/subject_10.png', id: 'lecture', tag: 'lecture'},
  {text: '游学', desc: '游学', icon: '../../img/subjects/subject_12.png', id: 'tour', tag: 'tour'}
];

const AgeFilterData = [
  {text: '全部', id: 'all', label: '全龄段'},
  {text: '幼儿园', id: 'r1', label: '幼儿园'},
  {text: '小学生', id: 'r2', label: '小学生'},
  {text: '初中生', id: 'r3', label: '初中生'}
];

const TimeFilterData = [
  {text: '全部', id: undefined},
  {text: '近3天', id: 'd3'},
  {text: '一周内', id: 'w1'},
  {text: '一月内', id: 'm1'}
];

const PriceFilterData = [
  {text: '免费', id: '0'},
  {text: '50-100', id: 'g50'},
  {text: '100-300', id: 'g100'},
  {text: '300以上', id: 'g300'}
];

const TypeFilterData = [
  {text: '全部', id: undefined},
  {text: '课程', id: 'lesson'},
  {text: '研学', id: 'study'},
  {text: '营地', id: 'camp'},
  {text: '游学', id: 'travel'},
  {text: 'STEM', id: 'STEM'},
  {text: '发布会', id: 'press'},
  {text: '工作坊', id: 'workshop'}
];

const ProductSpecData = [
  {text: '单本', id: '1'},
  {text: '套装', id: '2'},
  {text: '期刊', id: '3'}
];

const TeacheAgeData = [
  {text: '全部', id: undefined},
  {text: '2年以上', id: 2},
  {text: '5年以上', id: 5},
  {text: '10年以上', id: 10}
];

const TeacherDegreeData = [
  {text: '全部', id: undefined},
  {text: '学士', id: 'bachelor'},
  {text: '硕士', id: 'master'},
  {text: '博士', id: 'doctor'},
  {text: '专科', id: 'college'},
  {text: '其他', id: 'other'}
];

// 订单状态
const PurchaseStatus = [
  {text: '待付款', id: 'waitPayment'},
  {text: '请等待发货', id: 'alreadyConfirm'},
  {text: '已发货，等待收货并评价', id: 'waitConfirm'},
  {text: '等待评价', id: 'waitAppraisal'},
  {text: '交易结束', id: 'end'},
  {text: '已过期，请重新下单', id: 'timeEnd'}
];

const CourseStatus = [
  {text: '待付款', id: 'waitPayment'},
  {text: '报名成功，请按时参加', id: 'alreadyConfirm'},
  {text: '等待评价', id: 'waitAppraisal'},
  {text: '已结束', id: 'end'},
  {text: '已过期，请重新下单', id: 'timeEnd'}
];

// 地图机构显示有关
// lng lat 用于显示城市的中心点
const OrganiMapCityCenter = [
  {lng: '116.397477', lat: '39.908692', id: '北京', text: '北京', type: 'city'},
  {lng: '121.510747', lat: '31.233403', id: '上海', text: '上海', type: 'city'},
  {lng: '113.246282', lat: '23.131258', id: '广州', text: '广州', type: 'city'},
  {lng: '114.058755', lat: '22.529776', id: '深圳', text: '深圳', type: 'city'},
  {lng: '123.403475', lat: '41.785394', id: '沈阳', text: '沈阳', type: 'city'},
  {lng: '121.632999', lat: '38.922445', id: '大连', text: '大连', type: 'city'}
];

// 获取数据对象方法
// @data  要查找的数据
// @id 查找条件
// @condition 查找条件
const GetDataObjUseId = (data, id, condition) => {
  let result = data.find((item, index) => {
    if (condition) {
      return item[condition] === id;
    } else {
      return item.id === id;
    }
  });

  if (result) {
    return result;
  } else {
    return false;
  }
};

export {
  SubjectsFilterData,
  AgeFilterData,
  TimeFilterData,
  PriceFilterData,
  TypeFilterData,
  ProductSpecData,

  TeacheAgeData,
  TeacherDegreeData,

  PurchaseStatus,
  CourseStatus,

  OrganiMapCityCenter,

  GetDataObjUseId
};
