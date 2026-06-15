import {
  TodoItem,
  MessageItem,
  InquiryItem,
  OrderItem,
  AddressItem,
  ReconciliationBill,
  InvoiceHeader,
  InvoiceRequest,
  PaymentReceipt,
  AfterSaleRequest,
  SupplierReview,
  ExportJob,
  CouponItem,
  WelfareProduct,
  WelfareOrder,
  FavoriteProduct
} from '../types';

export const initialTodos: TodoItem[] = [
  {
    id: 'T-001',
    title: '审批华硕电脑采购订单（订单编号：PO-20260601）',
    category: '订单审批',
    priority: 'high',
    dueDate: '2026-06-15',
    completed: false,
    createdAt: '2026-06-13'
  },
  {
    id: 'T-002',
    title: '确认5月份与得力办公用品的对账单',
    category: '对账确认',
    priority: 'high',
    dueDate: '2026-06-16',
    completed: false,
    createdAt: '2026-06-12'
  },
  {
    id: 'T-003',
    title: '发布端午节员工礼盒的询价单',
    category: '询价发布',
    priority: 'medium',
    dueDate: '2026-06-18',
    completed: false,
    createdAt: '2026-06-13'
  },
  {
    id: 'T-004',
    title: '处理戴尔显示器售后退换货请求',
    category: '售后申请',
    priority: 'low',
    dueDate: '2026-06-20',
    completed: true,
    createdAt: '2026-06-10'
  },
  {
    id: 'T-005',
    title: '完善企业英文发票抬头及税号信息',
    category: '发票抬头',
    priority: 'low',
    dueDate: '2026-06-25',
    completed: false,
    createdAt: '2026-06-11'
  }
];

export const initialMessages: MessageItem[] = [
  {
    id: 'MSG-001',
    type: 'order',
    title: '您的采购订单#PO-20260601已通过审批',
    content: '华硕商用笔记本电脑x20台采购申请已被采购总监刘伟批准，已转入发货状态，预计于3个工作日内送达。',
    time: '2026-06-13 14:30',
    read: false
  },
  {
    id: 'MSG-002',
    type: 'inquiry',
    title: '您发布的「服务器机架询价」收到了3家供应商的新报价',
    content: '来自「联想中国」、「华为政企渠道」以及「浪潮信息集团」的新一轮竞价已提交，请尽快进入询价管控模块进行比价和确认。',
    time: '2026-06-13 11:15',
    read: false
  },
  {
    id: 'MSG-003',
    type: 'finance',
    title: '5月份对账单（#RECON-202605）已驳回提示',
    content: '您驳回了由「罗技办公」提交的办公设备对账单，驳回理由：发票金额与实际收货记录相差350元，已提醒供应商进行二次修正。',
    time: '2026-06-12 09:00',
    read: true
  },
  {
    id: 'MSG-004',
    type: 'system',
    title: '企业尊享会员等级成功晋升为「黄金会员」',
    content: '恭喜！由于贵司本年度累计采购额已突破200万元，会员特权加码。当前尊享专属账期延长5天，专属客户经理已上线。',
    time: '2026-06-10 18:00',
    read: true
  }
];

export const initialInquiries: InquiryItem[] = [
  {
    id: 'INQ-1001',
    title: '高端人体工学椅采购',
    category: '办公家具',
    quantity: 50,
    unit: '把',
    budget: 60000,
    status: 'quoting',
    deadline: '2026-06-20',
    description: '用于研发部新办公室入驻，要求全网眼支撑、带可调节腰靠及3D扶手，质保5年以上。',
    createdAt: '2026-06-10',
    bids: [
      {
        id: 'BID-001',
        supplierName: '西昊家具官方旗舰店',
        pricePerUnit: 1100,
        totalPrice: 55000,
        deliveryDays: 5,
        status: 'pending',
        remark: '可提供免费送货上门及极速组装服务，提供5年保修，2年以换代修。'
      },
      {
        id: 'BID-002',
        supplierName: '赫曼米勒华东授权店',
        pricePerUnit: 3500,
        totalPrice: 175000,
        deliveryDays: 14,
        status: 'pending',
        remark: '原装进口保真，超出预算。但可提供12年官方原厂质保。'
      },
      {
        id: 'BID-003',
        supplierName: '保友家具政企商贸部',
        pricePerUnit: 1180,
        totalPrice: 59000,
        deliveryDays: 4,
        status: 'pending',
        remark: '定制金豪b代，专门针对IT码农设计，可加急运送。'
      }
    ]
  },
  {
    id: 'INQ-1002',
    title: '超六类屏蔽千兆网线采购',
    category: '网络设备',
    quantity: 30,
    unit: '箱',
    budget: 15000,
    status: 'auditing',
    deadline: '2026-06-16',
    description: '305米/箱，超六类（CAT6A）屏蔽双绞线，需附带出厂检测报告。',
    createdAt: '2026-06-12',
    bids: [
      {
        id: 'BID-101',
        supplierName: '秋叶原线缆企业直营',
        pricePerUnit: 420,
        totalPrice: 12600,
        deliveryDays: 2,
        status: 'pending',
        remark: '现货秒发，含税包邮，送理线架10个。'
      }
    ]
  },
  {
    id: 'INQ-1003',
    title: '端午员工暖心粽子礼盒',
    category: '员工福利',
    quantity: 300,
    unit: '盒',
    budget: 45000,
    status: 'completed',
    deadline: '2026-06-12',
    description: '包含咸甜两派粽子各4个，咸鸭蛋4个，包装设计需国潮大气，配送多个分公司。',
    createdAt: '2026-06-05',
    selectedBidId: 'BID-201',
    bids: [
      {
        id: 'BID-201',
        supplierName: '五芳斋食品商用业务部',
        pricePerUnit: 135,
        totalPrice: 40500,
        deliveryDays: 6,
        status: 'accepted',
        remark: '传统老字号，支持分地点寄送，已签约锁定名额。'
      },
      {
        id: 'BID-202',
        supplierName: '广州酒家采购服务商',
        pricePerUnit: 148,
        totalPrice: 44400,
        deliveryDays: 7,
        status: 'rejected',
        remark: '经典港式风味，由于配送费较高略超五芳斋报价。'
      }
    ]
  }
];

export const initialOrders: OrderItem[] = [
  {
    id: 'PO-20260601',
    title: '2026第二季度华硕商用笔记本采购',
    vendor: '华硕政企商贸渠道部',
    amount: 119800,
    status: 'pending_approval',
    date: '2026-06-13',
    items: [
      { name: '华硕破晓3 14英寸酷睿i7开发本', qty: 20, unitPrice: 5990 }
    ],
    addressId: 'ADDR-001',
    approvalComment: ''
  },
  {
    id: 'PO-20260515',
    title: '财务部门高德地图加油卡/洗车卡福利采购',
    vendor: '中国石化商户联合会',
    amount: 15000,
    status: 'approved',
    date: '2026-05-15',
    items: [
      { name: '中石化面额500元加油充值卡', qty: 30, unitPrice: 500 }
    ],
    addressId: 'ADDR-002',
    approvalComment: '财务部年中关怀物资，预算合规，同意购买。'
  },
  {
    id: 'PO-20260510',
    title: '得力中性笔与A4打印纸常备采购',
    vendor: '得力办公用品华东供应商',
    amount: 6850,
    status: 'shipping',
    date: '2026-06-08',
    items: [
      { name: '得力S01针管中性笔 黑色 (12支/盒)', qty: 50, unitPrice: 15 },
      { name: '得力珊瑚海70g A4打印纸 (5包/箱)', qty: 81, unitPrice: 75 }
    ],
    addressId: 'ADDR-001'
  },
  {
    id: 'PO-20260420',
    title: '行政前台接待沙发与茶几组',
    vendor: '顾家家居工程部',
    amount: 18800,
    status: 'completed',
    date: '2026-04-20',
    items: [
      { name: '顾家真皮接待黑金沙发 3+1组合', qty: 1, unitPrice: 15800 },
      { name: '顾家钢化玻璃实木创意茶几', qty: 1, unitPrice: 3000 }
    ],
    addressId: 'ADDR-001',
    approvalComment: '前台门面升级，高阶合规。'
  }
];

export const initialAddresses: AddressItem[] = [
  {
    id: 'ADDR-001',
    receiver: '张益达 (行政部)',
    phone: '13888888888',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '科苑路88号联想大厦3楼整层行政部',
    isDefault: true
  },
  {
    id: 'ADDR-002',
    receiver: '苏雨珊 (人力资源部)',
    phone: '13999999999',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '建国路甲12号新光天地写字楼18层HR部',
    isDefault: false
  }
];

export const initialBills: ReconciliationBill[] = [
  {
    id: 'RECON-202605',
    billPeriod: '2026年05月',
    vendorName: '得力办公用品华东供应商',
    amount: 24750,
    orderCount: 3,
    status: 'pending_confirm',
    createdTime: '2026-06-01 10:00'
  },
  {
    id: 'RECON-202605-LOGI',
    billPeriod: '2026年05月',
    vendorName: '罗技办公及外设代理服务商',
    amount: 15400,
    orderCount: 1,
    status: 'rejected',
    createdTime: '2026-06-02 11:30',
    rejectionReason: '对账单中无线鼠标（MX Master 3S）单价与采购合同协议价（650元/只）不符，多报送了100元单价，已打回。'
  },
  {
    id: 'RECON-202604',
    billPeriod: '2026年04月',
    vendorName: '顾家家居工程部',
    amount: 18800,
    orderCount: 1,
    status: 'confirmed',
    createdTime: '2026-05-01 09:15'
  }
];

export const initialInvoiceHeaders: InvoiceHeader[] = [
  {
    id: 'INV-H-001',
    companyName: '万联智能科技有限公司',
    taxNumber: '91310115MA1H8K4X9P',
    bankName: '招商银行股份有限公司上海张江高科技园区支行',
    bankAccount: '1219 2858 8808 601',
    address: '上海市浦东新区张江高科科苑路88号大卡中心楼',
    phone: '021-88886666',
    isDefault: true
  },
  {
    id: 'INV-H-002',
    companyName: '万联智能科技（北京）软件技术有限公司',
    taxNumber: '91110105MA3J7K2Y5Q',
    bankName: '中国工商银行北京国贸大厦支行',
    bankAccount: '0200 0010 1920 382',
    address: '北京市朝阳区建国路甲12号新光中心',
    phone: '010-66668888',
    isDefault: false
  }
];

export const initialInvoiceRequests: InvoiceRequest[] = [
  {
    id: 'INV-REQ-2026001',
    orderIds: ['PO-20260420'],
    amount: 18800,
    headerId: 'INV-H-001',
    status: 'issued',
    invoiceNo: 'CN-1829388102',
    createdTime: '2026-05-02 14:00'
  },
  {
    id: 'INV-REQ-2026002',
    orderIds: ['PO-20260515'],
    amount: 15000,
    headerId: 'INV-H-002',
    status: 'pending',
    createdTime: '2026-05-18 11:20'
  }
];

export const initialPaymentReceipts: PaymentReceipt[] = [
  {
    id: 'PAY-001',
    orderId: 'PO-20260420',
    amount: 18800,
    paymentMethod: '企业电汇 (网银公对公)',
    status: 'success',
    paymentTime: '2026-05-03 16:30',
    receiptNo: 'E-BANK-TX-998182'
  },
  {
    id: 'PAY-002',
    orderId: 'PO-20260515',
    amount: 15000,
    paymentMethod: '企业预付授信账期款',
    status: 'success',
    paymentTime: '2026-05-16 10:15',
    receiptNo: 'E-CREDIT-TX-551239'
  }
];

export const initialAfterSaleRequests: AfterSaleRequest[] = [
  {
    id: 'AS-001',
    orderId: 'PO-20260510',
    productName: '得力珊瑚海70g A4打印纸',
    reason: 'damage',
    description: '配送过程中由于梅雨天气部分沾湿严重，导致2箱（共10包）纸张有浸润潮湿甚至霉点，无法正常放入打印机，申请换货或退回相应金额。',
    status: 'processing',
    refundAmount: 150,
    createdTime: '2026-06-10 11:00'
  },
  {
    id: 'AS-002',
    orderId: 'PO-20260420',
    productName: '顾家实木创意茶几',
    reason: 'quality',
    description: '茶几底板有轻微划痕，但不影响结构，与供应商沟通后申请了10%折旧额度直退退款。',
    status: 'approved',
    refundAmount: 300,
    createdTime: '2026-04-22 15:40'
  }
];

export const initialSupplierReviews: SupplierReview[] = [
  {
    id: 'REV-001',
    supplierName: '得力办公用品华东供应商',
    qualityRating: 4,
    deliveryRating: 5,
    serviceRating: 4,
    comment: '配送速度极快，江浙沪基本隔天就能送达，文具价格合规合适，服务配合度挺高的好评。',
    createdTime: '2026-05-28'
  },
  {
    id: 'REV-002',
    supplierName: '华硕政企商贸渠道部',
    qualityRating: 5,
    deliveryRating: 5,
    serviceRating: 5,
    comment: '产品质量过硬，出厂预装了正版Office和操作系统，省去行政极大的人工重装工作，大客户渠道保障好！',
    createdTime: '2026-06-03'
  }
];

export const initialExportJobs: ExportJob[] = [
  {
    id: 'EXP-101',
    fileName: '2026年度1-5月份企业采购全订单报表.xlsx',
    fileSize: '1.24 MB',
    status: 'completed',
    progress: 100,
    createdTime: '2026-06-13 10:10'
  },
  {
    id: 'EXP-102',
    fileName: '第二季度询价发布分析及供应商竞价表.csv',
    fileSize: '482 KB',
    status: 'ready',
    progress: 0,
    createdTime: '2026-06-13 22:30'
  }
];

export const initialCoupons: CouponItem[] = [
  {
    id: 'CPN-01',
    name: '开学/年中采购节办公设备特惠券',
    type: 'discount',
    value: 500,
    threshold: 10000,
    expiryDate: '2026-07-31',
    status: 'available'
  },
  {
    id: 'CPN-02',
    name: '新企业入驻一万返五百运费卡',
    type: 'cashback',
    value: 300,
    threshold: 5000,
    expiryDate: '2026-06-30',
    status: 'available'
  },
  {
    id: 'CPN-03',
    name: '端午中秋福利联合抵扣金',
    type: 'discount',
    value: 200,
    threshold: 3000,
    expiryDate: '2026-06-25',
    status: 'used'
  }
];

export const initialWelfareProducts: WelfareProduct[] = [
  {
    id: 'WEL-101',
    name: '【端午暖心】五芳斋「瑞祥端阳」福礼臻选粽子礼盒 (1.6kg大容量)',
    price: 139,
    pointsPrice: 1390,
    image: 'https://images.unsplash.com/photo-1543157148-f79f21226368?auto=format&fit=crop&q=80&w=400',
    category: '传统熟食',
    inventory: 999,
    description: '百年老字号，精心挑选经典肉粽、红豆大枣粽，搭档高品质高邮咸鸭蛋。'
  },
  {
    id: 'WEL-102',
    name: '【高阶数码】京东E卡 200元面额 (企业全品类无门槛电子密码)',
    price: 200,
    pointsPrice: 2000,
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=400',
    category: '虚拟卡券',
    inventory: 5000,
    description: '企采专用，可直接分发给员工手机及邮箱，支持直接添加京东账户消费。'
  },
  {
    id: 'WEL-103',
    name: '【夏日消暑】哈根达斯 & 星巴克 联合清凉夏日单人尊享随心电子餐券',
    price: 88,
    pointsPrice: 880,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    category: '下午茶券',
    inventory: 1500,
    description: '夏日高温福利首选，全链支持，员工一键在附近门店兑换香草冰激凌或冷萃咖啡。'
  },
  {
    id: 'WEL-104',
    name: '【健康呵护】爱康国宾 员工全家福关爱中青年体检套餐 (企业专属特惠款)',
    price: 360,
    pointsPrice: 3600,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400',
    category: '医疗健康',
    inventory: 800,
    description: '涵盖血常规、十二导电图、肝肾功能、肺部低剂量CT等多项体检。'
  }
];

export const initialWelfareOrders: WelfareOrder[] = [
  {
    id: 'WEL-ORD-01',
    productName: '【端午暖心】五芳斋「瑞祥端阳」福礼臻选粽子礼盒',
    employeeCount: 120,
    pointsSpent: 166800,
    totalCashSpent: 0,
    status: 'shipping',
    createdTime: '2026-06-12 17:00'
  },
  {
    id: 'WEL-ORD-02',
    productName: '【高阶数码】京东E卡 200元面额',
    employeeCount: 45,
    pointsSpent: 0,
    totalCashSpent: 9000,
    status: 'completed',
    createdTime: '2026-05-20 10:30'
  }
];

export const initialFavorites: FavoriteProduct[] = [
  {
    id: 'FAV-01',
    name: '罗技（Logitech）MX Master 3S 无线蓝牙鼠标',
    price: 699,
    supplier: '罗技办公及外设代理服务商',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'FAV-02',
    name: '坚果礼盒 每日坚果新春量贩分享装',
    price: 109,
    supplier: '三只松鼠政企商贸通路部',
    image: 'https://images.unsplash.com/photo-1598063414123-d731853cc674?auto=format&fit=crop&q=80&w=150'
  }
];
