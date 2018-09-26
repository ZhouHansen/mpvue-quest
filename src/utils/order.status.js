const PurchaseStatus = [
  {
    status: '待付款',
    ctrl: 'payment'
  },
  {
    status: '等待商家确认',
    ctrl: 'cancel'
  },
  {
    status: '商家已确认，请等待发货',
    ctrl: 'none'
  },
  {
    status: '商家已确认，请等待发货',
    ctrl: 'confirm'
  },
  {
    status: '待评价',
    ctrl: 'appraisal'
  },
  {
    status: '交易结束',
    ctrl: 'customerServer'
  }
];

const CourseStatus = [
  {
    status: '待付款',
    ctrl: 'cancel'
  },
  {
    status: '等待商家确认名额',
    ctrl: 'cancel'
  },
  {
    status: '商家已确认，请按时参加',
    ctrl: 'none'
  },
  {
    status: '课程已开始，请评价',
    ctrl: 'appraisal'
  },
  {
    status: '交易结束',
    ctrl: 'customerServer'
  }
];

export {
  PurchaseStatus,
  CourseStatus
};
