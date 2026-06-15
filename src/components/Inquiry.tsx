import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InquiryItem, BidItem, OrderItem } from '../types';
import { 
  FilePlus, 
  Settings, 
  CheckCircle, 
  Calendar, 
  HelpCircle, 
  Users, 
  ArrowRight, 
  TrendingDown, 
  DollarSign, 
  Search, 
  Plus, 
  ShoppingBag,
  Info
} from 'lucide-react';

interface InquiryProps {
  inquiries: InquiryItem[];
  setInquiries: React.Dispatch<React.SetStateAction<InquiryItem[]>>;
  onAddOrder: (order: OrderItem) => void;
}

export default function Inquiry({ inquiries, setInquiries, onAddOrder }: InquiryProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'control' | 'results'>('create');
  
  // Create Inquiry States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('IT数码设备');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('套');
  const [budget, setBudget] = useState(1000);
  const [deadline, setDeadline] = useState('2026-06-30');
  const [description, setDescription] = useState('');
  const [sucessMsg, setSuccessMsg] = useState('');
  const [orderedMsg, setOrderedMsg] = useState('');

  // Search/Filter states
  const [searchQuery, setSearchQuery] = useState('');

  // Submit Inquiry Release Handler
  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Build standard bid presets for this inquiry based on budget so the user gets interactive quote options!
    const bid1: BidItem = {
      id: `BID-S1-${Math.floor(Math.random() * 1000)}`,
      supplierName: '震坤行工业超省商行',
      pricePerUnit: Math.round((budget / quantity) * 0.9),
      totalPrice: Math.round(budget * 0.9),
      deliveryDays: 3,
      status: 'pending',
      remark: '大集团专属尊享报价，提供包邮和极速出库开票服务。'
    };

    const bid2: BidItem = {
      id: `BID-S2-${Math.floor(Math.random() * 1000)}`,
      supplierName: '固安捷企业物资供应中心',
      pricePerUnit: Math.round((budget / quantity) * 0.95),
      totalPrice: Math.round(budget * 0.95),
      deliveryDays: 4,
      status: 'pending',
      remark: '精选大牌厂家货源，质量对标一级品，含运保费与送货组装。'
    };

    const newInquiry: InquiryItem = {
      id: `INQ-${Math.floor(2000 + Math.random() * 8000)}`,
      title,
      category,
      quantity: Number(quantity),
      unit,
      budget: Number(budget),
      status: 'quoting',
      deadline,
      description,
      bids: [bid1, bid2],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setInquiries([newInquiry, ...inquiries]);
    setTitle('');
    setDescription('');
    setSuccessMsg('✅ 询价单成功发布！AI已开始将您提交的单子分拨给3家匹配的意向供应商进行测算报价，请点击“询价管控”查看。');
    
    setTimeout(() => {
      setSuccessMsg('');
    }, 5000);
  };

  // Bid selection flow
  const handleSelectBid = (inquiryId: string, bidId: string) => {
    setInquiries(inquiries.map(inq => {
      if (inq.id === inquiryId) {
        return {
          ...inq,
          status: 'completed',
          selectedBidId: bidId,
          bids: inq.bids.map(b => b.id === bidId ? { ...b, status: 'accepted' } : { ...b, status: 'rejected' })
        };
      }
      return inq;
    }));
  };

  // Generate PO (Order Approval Link) from Completed Bid
  const handleGenerateOrder = (inq: InquiryItem) => {
    const selectedBid = inq.bids.find(b => b.id === inq.selectedBidId);
    if (!selectedBid) return;

    const newPO: OrderItem = {
      id: `PO-${inq.id.replace('INQ-', '')}-${Math.floor(10 + Math.random() * 90)}`,
      title: `基于「${inq.title}」询价结果生成的采购订单`,
      vendor: selectedBid.supplierName,
      amount: selectedBid.totalPrice,
      status: 'pending_approval',
      date: new Date().toISOString().split('T')[0],
      items: [
        { name: `${inq.title} (规格详见询价附件)`, qty: inq.quantity, unitPrice: selectedBid.pricePerUnit }
      ],
      addressId: 'ADDR-001',
      approvalComment: ''
    };

    onAddOrder(newPO);
    
    // Mark inquiry status as closed/ordered to prevent repeating
    setInquiries(inquiries.map(item => item.id === inq.id ? { ...item, status: 'completed' } : item));
    setOrderedMsg(`🎉 成功基于「${selectedBid.supplierName}」报价方案自动报审生成了采购履约备选单：${newPO.id}！已通过智能路由转送至您的团队工作台进行会签归口审批。`);
    
    setTimeout(() => {
      setOrderedMsg('');
    }, 6000);
  };

  const handleCancelInquiry = (id: string) => {
    setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: 'canceled' } : inq));
  };

  return (
    <div id="procurement-inquiry" className="space-y-6">
      
      {orderedMsg && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl text-xs font-medium leading-relaxed shadow-sm"
        >
          {orderedMsg}
        </motion.div>
      )}

      {/* Search Header and Navigation tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'create' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FilePlus className="w-3.5 h-3.5" />
            询价发布
          </button>
          <button
            onClick={() => setActiveTab('control')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'control' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            询价管控
            {inquiries.filter(i => i.status === 'quoting').length > 0 && (
              <span className="bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                {inquiries.filter(i => i.status === 'quoting').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'results' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            询价结果
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索询价单名称/编号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 w-full sm:w-64 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'create' && (
          <motion.div
            key="create-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Guide Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-slate-950 to-slate-800 text-white rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-md">
              <div className="space-y-4">
                <span className="bg-[#2563eb]/25 text-blue-300 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-blue-500/10 inline-block">
                  智慧采购工作台
                </span>
                <h3 className="text-xl font-bold tracking-tight">发布优质询价 降低采购成本</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  通过详细描述规格、期望交期、采购规模和质量标杆，系统会将表单直连全国优质资质供应链商库。全流程闭环竞价，最快6小时内返回最优让利方案。
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></span>
                    <p><strong>智能分拨</strong>: 精准匹配行业专营一级商，绕过渠道中间溢价</p>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></span>
                    <p><strong>自动PK比价</strong>: 支持单价比较、货期比较，以及账期信贷支持比对</p>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></span>
                    <p><strong>一键转单</strong>: 询价达成后直接转化为审批层级流转的ERP采购订单</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex gap-2 items-center mt-6">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <p className="text-[10px] text-slate-400">万联采购端已对接入库合规商520余家，满足ISO9001认证标准。</p>
              </div>
            </div>

            {/* Input Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
                <FilePlus className="w-4 h-4 text-[#2563eb]" />
                填写全新询价表单
              </h3>

              {sucessMsg && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-xs mb-4 leading-relaxed"
                >
                  {sucessMsg}
                </motion.div>
              )}

              <form onSubmit={handleCreateInquiry} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-slate-500 font-medium mb-1">采购项目名称 *</label>
                    <input
                      type="text"
                      required
                      placeholder="例：2026年夏季前台绿植租赁服务 / 六百台千兆网管交换机分期询价"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 font-medium mb-1">采购大类</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="IT数码设备">IT数码设备</option>
                      <option value="办公家具">办公家具</option>
                      <option value="行政百货">行政百货</option>
                      <option value="网络基建">网络基建</option>
                      <option value="员工福利">员工福利</option>
                      <option value="耗材配件">耗材配件</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-500 font-medium mb-1">数量</label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 font-medium mb-1">计量单位</label>
                      <input
                        type="text"
                        placeholder="把/台/箱/批"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 font-medium mb-1">最高限价总预算 (元) *</label>
                    <input
                      type="number"
                      min="100"
                      required
                      value={budget}
                      onChange={(e) => setBudget(Math.max(100, Number(e.target.value)))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 font-medium mb-1">竞价截止日期 *</label>
                    <input
                      type="date"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 font-medium mb-1">详细规格选型描述或定制需求</label>
                  <textarea
                    rows={3}
                    placeholder="请输入采购物品的具体型号、尺寸、材质、测试认证要求及交付地址。若有原厂授权证明、售后服务标准等附加条款，也请在此写明。精确的描述有助于供应商提供富有竞争力的报价。"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="reset"
                    onClick={() => { setTitle(''); setDescription(''); }}
                    className="px-4 py-2 text-xs border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    重置
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs text-white bg-[#2563eb] rounded-xl font-semibold hover:bg-blue-600 shadow-sm transition-all flex items-center gap-1 border-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    立即提交发布
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Tab Control */}
        {activeTab === 'control' && (
          <motion.div
            key="control-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {inquiries.filter(i => {
              const matched = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase());
              return matched && i.status === 'quoting';
            }).length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm text-slate-400 text-sm">
                当前没有处于“正在报价中（quoting）”的询价单。
              </div>
            ) : (
              inquiries
                .filter(i => i.status === 'quoting')
                .filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((inq) => (
                  <div key={inq.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Inquiry Bar Title Header */}
                    <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400">{inq.id}</span>
                          <span className="bg-blue-50 text-[#2563eb] text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100">
                            {inq.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">{inq.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 font-medium leading-relaxed">{inq.description}</p>
                      </div>

                      <div className="text-left md:text-right space-y-1">
                        <p className="text-xs text-slate-400">招标预算：<strong className="text-slate-700">¥{inq.budget}</strong></p>
                        <p className="text-xs text-slate-400">需求量：<strong className="text-slate-700">{inq.quantity} {inq.unit}</strong></p>
                        <p className="text-xs text-rose-500 font-semibold flex items-center md:justify-end gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          竞价剩至: {inq.deadline}
                        </p>
                      </div>
                    </div>

                    {/* Submitted Supplier Quotes Row */}
                    <div className="p-5 space-y-4">
                      <div className="flex items-center gap-2 justify-between">
                        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#2563eb]" />
                          收到的供应商竞价提案列表 ({inq.bids.length} 家)
                        </span>
                        <button
                          onClick={() => handleCancelInquiry(inq.id)}
                          className="text-xs text-rose-500 hover:text-rose-700 font-medium transition-colors"
                        >
                          撤回/关闭竞价
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {inq.bids.map((bid) => {
                          const savings = inq.budget - bid.totalPrice;
                          const savingsPercent = Math.round((savings / inq.budget) * 100);

                          return (
                            <div 
                              key={bid.id} 
                              className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all flex flex-col justify-between space-y-3"
                            >
                              <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <h5 className="font-bold text-slate-800 text-xs tracking-tight leading-tight line-clamp-1">{bid.supplierName}</h5>
                                  {savings > 0 && (
                                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
                                      省 {savingsPercent}%
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium italic line-clamp-2">“ {bid.remark} ”</p>
                              </div>

                              <div className="border-t border-slate-100 pt-3 space-y-1.5">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">单价报价:</span>
                                  <span className="font-semibold text-slate-700">¥{bid.pricePerUnit} / {inq.unit}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">方案总报价:</span>
                                  <span className="font-bold text-rose-600">¥{bid.totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">承诺货期:</span>
                                  <span className="font-medium text-slate-700">{bid.deliveryDays} 个工作日</span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleSelectBid(inq.id, bid.id)}
                                className="w-full bg-[#2563eb] text-white rounded-xl py-2 text-xs font-semibold shadow-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-1 border-none"
                              >
                                采纳此方案
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )))
            }
          </motion.div>
        )}

        {/* Tab Results */}
        {activeTab === 'results' && (
          <motion.div
            key="results-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {inquiries.filter(i => {
              const matched = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase());
              return matched && (i.status === 'completed' || i.status === 'canceled');
            }).length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm text-slate-400 text-sm animate-pulse">
                当前尚无已封标或撤销的询价单记录。
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-5 space-y-4">
                <h3 className="font-semibold text-slate-800 text-sm">已成交 / 已结案询价一览表</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-500">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-3">询价编号</th>
                        <th className="p-3">采购项目</th>
                        <th className="p-3">品类</th>
                        <th className="p-3">拟定预算</th>
                        <th className="p-3">优胜供应商 & 最终成交额</th>
                        <th className="p-3 text-center">状态</th>
                        <th className="p-3 text-right">生成交易订单</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inquiries
                        .filter(i => i.status === 'completed' || i.status === 'canceled')
                        .filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((inq) => {
                          const winnerBid = inq.bids.find(b => b.id === inq.selectedBidId);
                          return (
                            <tr key={inq.id} className="hover:bg-slate-50/55 transition-colors">
                              <td className="p-3 font-mono font-medium text-slate-400">{inq.id}</td>
                              <td className="p-3 font-semibold text-slate-800">
                                <div>
                                  <p>{inq.title}</p>
                                  <p className="text-[10px] text-slate-400 font-normal mt-0.5">{inq.description}</p>
                                </div>
                              </td>
                              <td className="p-3">
                                <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded text-[10px]">
                                  {inq.category}
                                </span>
                              </td>
                              <td className="p-3 font-semibold text-slate-700">¥{inq.budget}</td>
                              <td className="p-3">
                                {winnerBid ? (
                                  <div className="space-y-0.5">
                                    <p className="font-bold text-slate-800">{winnerBid.supplierName}</p>
                                    <p className="text-emerald-600 font-bold font-mono">¥{winnerBid.totalPrice}</p>
                                  </div>
                                ) : (
                                  <span className="text-slate-400 italic">已流标/撤销</span>
                                )}
                              </td>
                              <td className="p-3 text-center">
                                {inq.status === 'completed' ? (
                                  <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                                    竞价成功
                                  </span>
                                ) : (
                                  <span className="bg-slate-100 text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded-full inline-block">
                                    已取消
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                {inq.status === 'completed' && winnerBid ? (
                                  <button
                                    onClick={() => handleGenerateOrder(inq)}
                                    className="bg-[#2563eb] hover:bg-blue-600 text-white rounded-xl px-3 py-1.5 font-bold transition-all shadow-sm inline-flex items-center gap-1 border-none cursor-pointer"
                                  >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    生单
                                  </button>
                                ) : (
                                  <span className="text-slate-300 font-medium">—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
