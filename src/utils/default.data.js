// 固定的过滤条件数据

const SubjectsFilterData = [
  {text: '全部', icon: '../../img/subjects/subject_14.png', id: 'all'},
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
  {text: '全部', id: 'all'},
  {text: '研学', id: 'r1'},
  {text: '营地', id: 'r1'},
  {text: '游学', id: 'r2'},
  {text: '初中STEM生', id: 'r3'}
];

export {
  SubjectsFilterData,
  AgeFilterData,
  TimeFilterData,
  PriceFilterData,
  DateFilterData,
  TypeFilterData
};
