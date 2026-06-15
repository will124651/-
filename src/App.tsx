import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  initialTodos, 
  initialMessages, 
  initialInquiries, 
  initialOrders, 
  initialAddresses, 
  initialBills, 
  initialInvoiceHeaders, 
  initialInvoiceRequests, 
  initialPaymentReceipts, 
  initialAfterSaleRequests, 
  initialSupplierReviews, 
  initialExportJobs, 
  initialCoupons, 
  initialWelfareProducts, 
  initialWelfareOrders, 
  initialFavorites 
} from './data/mockData';
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
} from './types';

// Importing submodules
import Workbench from './components/Workbench';
import Inquiry from './components/Inquiry';
import Orders from './components/Orders';
import Reconciliation from './components/Reconciliation';
import Settlement from './components/Settlement';
import AfterSales from './components/AfterSales';
import CardMarketing from './components/CardMarketing';
import Welfare from './components/Welfare';
import Personal from './components/Personal';

// Icons
import { 
  LayoutDashboard, 
  SearchCode, 
  ClipboardCheck, 
  FileSpreadsheet, 
  Coins, 
  ShieldAlert, 
  Sparkles, 
  Smile, 
  User, 
  Clock, 
  Calendar, 
  Bell, 
  CheckCircle2, 
  Layers,
  Award,
  Crown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  // Mobile drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // States synchronized with localStorage persistent store
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const raw = localStorage.getItem('p_todos');
    return raw ? JSON.parse(raw) : initialTodos;
  });

  const [messages, setMessages] = useState<MessageItem[]>(() => {
    const raw = localStorage.getItem('p_messages');
    return raw ? JSON.parse(raw) : initialMessages;
  });

  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => {
    const raw = localStorage.getItem('p_inquiries');
    return raw ? JSON.parse(raw) : initialInquiries;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const raw = localStorage.getItem('p_orders');
    return raw ? JSON.parse(raw) : initialOrders;
  });

  const [addresses, setAddresses] = useState<AddressItem[]>(() => {
    const raw = localStorage.getItem('p_addresses');
    return raw ? JSON.parse(raw) : initialAddresses;
  });

  const [bills, setBills] = useState<ReconciliationBill[]>(() => {
    const raw = localStorage.getItem('p_bills');
    return raw ? JSON.parse(raw) : initialBills;
  });

  const [invoiceHeaders, setInvoiceHeaders] = useState<InvoiceHeader[]>(() => {
    const raw = localStorage.getItem('p_invoice_headers');
    return raw ? JSON.parse(raw) : initialInvoiceHeaders;
  });

  const [invoiceRequests, setInvoiceRequests] = useState<InvoiceRequest[]>(() => {
    const raw = localStorage.getItem('p_invoice_requests');
    return raw ? JSON.parse(raw) : initialInvoiceRequests;
  });

  const [payments, setPayments] = useState<PaymentReceipt[]>(() => {
    const raw = localStorage.getItem('p_payments');
    return raw ? JSON.parse(raw) : initialPaymentReceipts;
  });

  const [aftersales, setAftersales] = useState<AfterSaleRequest[]>(() => {
    const raw = localStorage.getItem('p_aftersales');
    return raw ? JSON.parse(raw) : initialAfterSaleRequests;
  });

  const [reviews, setReviews] = useState<SupplierReview[]>(() => {
    const raw = localStorage.getItem('p_reviews');
    return raw ? JSON.parse(raw) : initialSupplierReviews;
  });

  const [exports, setExports] = useState<ExportJob[]>(() => {
    const raw = localStorage.getItem('p_exports');
    return raw ? JSON.parse(raw) : initialExportJobs;
  });

  const [coupons, setCoupons] = useState<CouponItem[]>(() => {
    const raw = localStorage.getItem('p_coupons');
    return raw ? JSON.parse(raw) : initialCoupons;
  });

  const [welfareOrders, setWelfareOrders] = useState<WelfareOrder[]>(() => {
    const raw = localStorage.getItem('p_welfare_orders');
    return raw ? JSON.parse(raw) : initialWelfareOrders;
  });

  const [favorites, setFavorites] = useState<FavoriteProduct[]>(() => {
    const raw = localStorage.getItem('p_favorites');
    return raw ? JSON.parse(raw) : initialFavorites;
  });

  const [memberPoints, setMemberPoints] = useState<number>(() => {
    const raw = localStorage.getItem('p_member_points');
    return raw ? parseInt(raw, 10) : 52800;
  });

  const [orgProfile, setOrgProfile] = useState(() => {
    const raw = localStorage.getItem('p_org_profile');
    return raw ? JSON.parse(raw) : {
      orgName: '万联智能科技有限公司',
      legalRep: '张大仙',
      taxNo: '91310115MA1H8K4X9P',
      mail: 'bailingyue1998@gmail.com',
      phone: '021-88886666',
      siteUrl: 'https://wanlian-smart.com'
    };
  });

  // Current UTC time state ticks
  const [timeStr, setTimeStr] = useState('');

  // Active module navigation
  const [activeModule, setActiveModule] = useState<
    'workbench' | 'inquiry' | 'orders' | 'reconciliation' | 'settlement' | 'aftersales' | 'marketing' | 'welfare' | 'personal'
  >('workbench');

  // Trigger write to localStorage on edit
  useEffect(() => { localStorage.setItem('p_todos', JSON.stringify(todos)); }, [todos]);
  useEffect(() => { localStorage.setItem('p_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('p_inquiries', JSON.stringify(inquiries)); }, [inquiries]);
  useEffect(() => { localStorage.setItem('p_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('p_addresses', JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { localStorage.setItem('p_bills', JSON.stringify(bills)); }, [bills]);
  useEffect(() => { localStorage.setItem('p_invoice_headers', JSON.stringify(invoiceHeaders)); }, [invoiceHeaders]);
  useEffect(() => { localStorage.setItem('p_invoice_requests', JSON.stringify(invoiceRequests)); }, [invoiceRequests]);
  useEffect(() => { localStorage.setItem('p_payments', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('p_aftersales', JSON.stringify(aftersales)); }, [aftersales]);
  useEffect(() => { localStorage.setItem('p_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('p_exports', JSON.stringify(exports)); }, [exports]);
  useEffect(() => { localStorage.setItem('p_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('p_welfare_orders', JSON.stringify(welfareOrders)); }, [welfareOrders]);
  useEffect(() => { localStorage.setItem('p_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('p_member_points', memberPoints.toString()); }, [memberPoints]);
  useEffect(() => { localStorage.setItem('p_org_profile', JSON.stringify(orgProfile)); }, [orgProfile]);

  // Clock tick trigger
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('zh-CN', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Shared callback: Add generated order fromcompleted Inquiry bids
  const handleAddOrder = (newPO: OrderItem) => {
    setOrders([newPO, ...orders]);
    // Create automatic task notification to workbench
    const newTodo: TodoItem = {
      id: `T-${Math.floor(100 + Math.random() * 900)}`,
      title: `审批询价对应新订单：${newPO.id}`,
      category: '订单审批',
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTodos([newTodo, ...todos]);

    // Create system message
    const newMsg: MessageItem = {
      id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      type: 'order',
      title: `新订单待流转审批：${newPO.id}`,
      content: `基于您的选标结果已智能报审：${newPO.title}，总金额为 ¥${newPO.amount.toLocaleString()}。`,
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false
    };
    setMessages([newMsg, ...messages]);
  };

  // Compute stats calculations
  const totalOrdersAmount = orders.reduce((sum, o) => sum + o.amount, 0);

  // Left Sidebar menus definitions
  const menus = [
    { id: 'workbench', name: '采购工作台', icon: LayoutDashboard },
    { id: 'inquiry', name: '询价管理', icon: SearchCode, badge: inquiries.filter(i => i.status === 'quoting').length },
    { id: 'orders', name: '订单管理', icon: ClipboardCheck, badge: orders.filter(o => o.status === 'pending_approval').length },
    { id: 'reconciliation', name: '对账管理', icon: FileSpreadsheet, badge: bills.filter(b => b.status === 'pending_confirm').length },
    { id: 'settlement', name: '结算管理', icon: Coins, badge: orders.filter(o => o.status === 'completed').length },
    { id: 'aftersales', name: '售后管理', icon: ShieldAlert, badge: aftersales.filter(a => a.status === 'submitted').length },
    { id: 'marketing', name: 'C端营销', icon: Sparkles },
    { id: 'welfare', name: '福利采购', icon: Smile },
    { id: 'personal', name: '个人中心', icon: User }
  ] as const;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
      
      {/* LEFT SIDEBAR: Sleek Interface style */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white text-slate-700 border-r border-slate-200 select-none">

        {/* Navigation list */}
        <div className="flex-1 flex flex-col justify-between py-5 overflow-y-auto">
          <div className="space-y-6">
            <div className="px-5">
              <h1 className="text-sm font-bold text-slate-800 tracking-wider uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2563eb]" />
                采办智能核心
              </h1>
              <p className="text-[10px] text-slate-400 mt-1 font-medium italic">SYS v3.8 Standard Compliant</p>
            </div>

            <nav className="space-y-1 px-2.5">
              {menus.map((menu) => {
                const isActive = activeModule === menu.id;
                const Icon = menu.icon;
                return (
                  <button
                    key={menu.id}
                    onClick={() => setActiveModule(menu.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive 
                        ? 'bg-[rgba(37,99,235,0.08)] text-[#2563eb] border-l-4 border-[#2563eb]' 
                        : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`} />
                      <span>{menu.name}</span>
                    </div>

                    {'badge' in menu && menu.badge && menu.badge > 0 ? (
                      <span className="bg-rose-500 text-white font-bold font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                        {menu.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User profile capsule bottom */}
          <div className="px-5 border-t border-slate-100 pt-4 mt-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">在岗采购员</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-50 text-[#2563eb] rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-[#2563eb]/10">
                李
              </div>
              <div className="text-left font-mono text-[11px] leading-tight text-slate-700">
                <p className="font-bold">李成蹊 (专员)</p>
                <p className="text-[9px] text-[#2563eb] font-semibold font-sans mt-0.5">黄金级别授权</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER TRIGGER CONTAINER */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-[#2563eb] text-white p-3 rounded-full shadow-lg flex items-center justify-center focus:outline-none"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE DRAWER SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white text-slate-700 border-r border-slate-200 select-none flex flex-col lg:hidden shadow-2xl"
          >

            <div className="flex-1 flex flex-col justify-between py-5 overflow-y-auto">
              <div className="space-y-6">
                <div className="px-5">
                  <h1 className="text-sm font-bold text-slate-800 tracking-wider uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#2563eb]" />
                    采办智能
                  </h1>
                </div>

                <nav className="space-y-1 px-2">
                  {menus.map((menu) => {
                    const isActive = activeModule === menu.id;
                    const Icon = menu.icon;
                    return (
                      <button
                        key={menu.id}
                        onClick={() => { setActiveModule(menu.id); setSidebarOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                          isActive ? 'bg-[rgba(37,99,235,0.08)] text-[#2563eb] border-l-4 border-[#2563eb]' : 'hover:bg-slate-50 text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`} />
                          <span>{menu.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="px-5 pt-4 mt-4 border-t border-slate-100">
                <p className="text-[9px] text-slate-400 font-bold uppercase">在岗采购员李成蹊</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER FRAME */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* PLATFORM HEADER */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 h-[72px]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="font-mono">萬聯智能 B2B</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <p className="capitalize text-slate-500 tracking-wider">
                {menus.find(m => m.id === activeModule)?.name} (模块)
              </p>
            </div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight mt-0.5">
               {activeModule === 'workbench' && '待办跟进与综合数据驾驶舱'}
               {activeModule === 'inquiry' && '供应商联合竞价管控大盘'}
               {activeModule === 'orders' && '采购履约订单审计与地址管理'}
               {activeModule === 'reconciliation' && '财务对账账期结算审查'}
               {activeModule === 'settlement' && '开票抬头登记与对公转账工具'}
               {activeModule === 'aftersales' && '维权售后直通车及导出审计'}
               {activeModule === 'marketing' && '采销特惠商盟与尊贵权益底牌'}
               {activeModule === 'welfare' && '节日员工温暖发放与批量兑用商城'}
               {activeModule === 'personal' && '企业诚信度评级、收藏备库与自主档案'}
            </h2>
          </div>

          {/* Quick status details (active time tickers and widgets) */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-1.5 bg-slate-55 border border-slate-100 rounded-lg px-3 py-1.5 font-medium text-slate-500 bg-[#f8fafc] border-[#e2e8f0]">
              <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>2026-06-13</span>
            </div>

            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5 font-bold font-mono text-[#2563eb] shadow-sm shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{timeStr || '22:47:09'} (UTC+8)</span>
            </div>
          </div>
        </header>

        {/* DYNAMIC SCROLLABLE APPLICATION VIEW BODY */}
        <section className="flex-1 overflow-y-auto p-6 bg-slate-50/70">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto pb-10"
            >
              {activeModule === 'workbench' && (
                <Workbench 
                  todos={todos} 
                  setTodos={setTodos} 
                  messages={messages} 
                  setMessages={setMessages} 
                  totalOrdersAmount={totalOrdersAmount}
                />
              )}

              {activeModule === 'inquiry' && (
                <Inquiry 
                  inquiries={inquiries} 
                  setInquiries={setInquiries} 
                  onAddOrder={handleAddOrder}
                />
              )}

              {activeModule === 'orders' && (
                <Orders 
                  orders={orders} 
                  setOrders={setOrders} 
                  addresses={addresses} 
                  setAddresses={setAddresses}
                />
              )}

              {activeModule === 'reconciliation' && (
                <Reconciliation 
                  bills={bills} 
                  setBills={setBills}
                />
              )}

              {activeModule === 'settlement' && (
                <Settlement 
                  orders={orders}
                  invoiceHeaders={invoiceHeaders} 
                  setInvoiceHeaders={setInvoiceHeaders}
                  invoiceRequests={invoiceRequests} 
                  setInvoiceRequests={setInvoiceRequests}
                  payments={payments} 
                  setPayments={setPayments}
                />
              )}

              {activeModule === 'aftersales' && (
                <AfterSales 
                  orders={orders}
                  aftersales={aftersales} 
                  setAftersales={setAftersales}
                  reviews={reviews} 
                  setReviews={setReviews}
                  exports={exports} 
                  setExports={setExports}
                />
              )}

              {activeModule === 'marketing' && (
                <CardMarketing 
                  coupons={coupons} 
                  setCoupons={setCoupons} 
                  memberPoints={memberPoints}
                />
              )}

              {activeModule === 'welfare' && (
                <Welfare 
                  welfareProducts={initialWelfareProducts} 
                  welfareOrders={welfareOrders} 
                  setWelfareOrders={setWelfareOrders}
                  memberPoints={memberPoints} 
                  setMemberPoints={setMemberPoints}
                />
              )}

              {activeModule === 'personal' && (
                <Personal 
                  favorites={favorites} 
                  setFavorites={setFavorites}
                  orgProfile={orgProfile} 
                  setOrgProfile={setOrgProfile}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* TRIVIAL FOOTER CREDIT ACCENT - Keep it humble, literal and beautiful */}
        <footer className="bg-white border-t border-slate-250 py-3 text-center text-[10px] text-slate-400 font-medium shrink-0 tracking-wide select-none">
          万联智能企业采办系统 © 2026 万联智能科技有限公司 版权所有 (法人备案审批：京ICP备6112938号-1)
        </footer>
      </main>
    </div>
  );
}
