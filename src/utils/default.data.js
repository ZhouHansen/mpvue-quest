// 固定的过滤条件数据
const SubjectsFilterData = [
  {text: '全部', icon: '../../img/subjects/subject_14.png', id: undefined},
  {text: '美术', icon: '../../img/subjects/subject_1.png', id: 'art'},
  {text: '英语', icon: '../../img/subjects/subject_2.png', id: 'english'},
  {text: '工作坊', icon: '../../img/subjects/subject_11.png', id: 'workshop'},
  {text: '中文', icon: '../../img/subjects/subject_3.png', id: 'chinese'},
  {text: '音乐', icon: '../../img/subjects/subject_4.png', id: 'music'},
  {text: '数学', icon: '../../img/subjects/subject_5.png', id: 'math'},
  {text: '自然', icon: '../../img/subjects/subject_6.png', id: 'nature'},
  {text: '托管', icon: '../../img/subjects/subject_7.png', id: 'trust'},
  {text: '机器人', icon: '../../img/subjects/subject_13.png', id: 'robot'},
  {text: '学前', icon: '../../img/subjects/subject_8.png', id: 'pre'},
  {text: '营地', icon: '../../img/subjects/subject_9.png', id: 'camp'},
  {text: '演讲', icon: '../../img/subjects/subject_10.png', id: 'lecture'},
  {text: '游学', icon: '../../img/subjects/subject_12.png', id: 'tour'}
];

const AgeFilterData = [
  {text: '全部', id: 'all'},
  {text: '幼儿园', id: 'r1'},
  {text: '小学生', id: 'r2'},
  {text: '初中生', id: 'r3'}
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

const DateFilterData = [
  {text: '全部', id: undefined},
  {text: '明天', id: 'd3'},
  {text: '本周六', id: 'w1'},
  {text: '本周日', id: 'm1'},
  {text: '小长假', id: 'm1'},
  {text: '假期', id: 'm1'},
  {text: '寒假', id: 'm1'},
  {text: '暑假', id: 'm1'}
];

const TypeFilterData = [
  {text: '全部', id: undefined},
  {text: '课程', id: 'lesson'},
  {text: '研学', id: 'study'},
  {text: '营地', id: 'camp'},
  {text: '游学', id: 'travel'},
  {text: 'STEM', id: 'STEM'}
];

const ProductSpecData = [
  {text: '单本', id: '1'},
  {text: '套装', id: '2'},
  {text: '期刊', id: '3'}
];

const TeacherInfFilterData = [
  {text: '全部', id: undefined},
  {text: '机构', id: 'inst'},
  {text: '科目', id: 'subject'},
  {text: '学位', id: 'degree'},
  {text: '教龄', id: 'teachage'}
];

// 订单状态
const PurchaseStatus = [
  {
    text: '待付款',
    id: 'waitPayment'
  },
  {
    text: '等待商家确认',
    id: 'alreadyPayWaitDelivery'
  },
  {
    text: '商家已确认，请等待发货',
    id: 'alreadyConfirm'
  },
  {
    text: '待评价',
    id: 'waitAppraisal'
  },
  {
    text: '交易结束',
    id: 'end'
  }
];

const CourseStatus = [
  {
    text: '待付款',
    id: 'waitPayment'
  },
  {
    text: '等待商家确认名额',
    id: 'alreadyPayWaitDelivery'
  },
  {
    text: '商家已确认，请按时参加',
    id: 'alreadyConfirm'
  },
  {
    text: '课程已开始，请评价',
    id: 'waitAppraisal'
  },
  {
    text: '交易结束',
    id: 'end'
  }
];

// 获取数据对象方法

const GetDataObjUseId = (data, id) => {
  let result = data.find((item, index) => {
    return item.id === id;
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
  DateFilterData,
  TypeFilterData,
  ProductSpecData,
  TeacherInfFilterData,

  PurchaseStatus,
  CourseStatus,

  GetDataObjUseId
};
