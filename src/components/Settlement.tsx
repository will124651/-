import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InvoiceHeader, InvoiceRequest, PaymentReceipt, OrderItem } from '../types';
import { 
  CreditCard, 
  Receipt, 
  Coins, 
  Plus, 
  Trash2, 
  Copy, 
  ArrowRight, 
  Check, 
  TrendingUp, 
  DollarSign, 
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';

interface SettlementProps {
  orders: OrderItem[];
  invoiceHeaders: InvoiceHeader[];
  setInvoiceHeaders: React.Dispatch<React.SetStateAction<InvoiceHeader[]>>;
  invoiceRequests: InvoiceRequest[];
  setInvoiceRequests: React.Dispatch<React.SetStateAction<InvoiceRequest[]>>;
  payments: PaymentReceipt[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentReceipt[]>>;
}

export default function Settlement({ 
  orders, 
  invoiceHeaders, 
  setInvoiceHeaders, 
  invoiceRequests, 
  setInvoiceRequests, 
  payments, 
  setPayments 
}: SettlementProps) {
  const [activeTab, setActiveTab] = useState<'headers' | 'apply' | 'payments'>('headers');

  // Header form states
  const [companyName, setCompanyName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  // Apply Invoice states
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [selectedHeaderId, setSelectedHeaderId] = useState(invoiceHeaders[0]?.id || '');

  // Copy helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('📋 文字信息已成功拷贝至剪切板！');
  };

  // Add Invoice Header Handler
  const handleAddHeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !taxNumber.trim()) return;

    const newHeader: InvoiceHeader = {
      id: `INV-H-${Math.floor(100 + Math.random() * 900)}`,
      companyName,
      taxNumber,
      bankName,
      bankAccount,
      address,
      phone,
      isDefault
    };

    let updated = [...invoiceHeaders];
    if (isDefault) {
      updated = updated.map(h => ({ ...h, isDefault: false }));
    }
    setInvoiceHeaders([...updated, newHeader]);

    setCompanyName('');
    setTaxNumber('');
    setBankName('');
    setBankAccount('');
    setAddress('');
    setPhone('');
    setIsDefault(false);
    alert('✅ 发票抬头成功录入企业底库！');
  };

  const handleSetDefaultHeader = (id: string) => {
    setInvoiceHeaders(invoiceHeaders.map(h => ({
      ...h,
      isDefault: h.id === id
    })));
  };

  const handleDeleteHeader = (id: string) => {
    setInvoiceHeaders(invoiceHeaders.filter(h => h.id !== id));
  };

  // Order invoice checkbox toggle
  const toggleOrderSelection = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter(item => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  // Apply Invoice Request
  const handleApplyInvoice = () => {
    if (selectedOrderIds.length === 0) {
      alert('请先选择需要合并开票的订单！');
      return;
    }
    if (!selectedHeaderId) {
      alert('请选择适用的发票抬头！');
      return;
    }

    const totalInvoicingAmount = orders
      .filter(o => selectedOrderIds.includes(o.id))
      .reduce((sum, o) => sum + o.amount, 0);

    const newReq: InvoiceRequest = {
      id: `INV-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      orderIds: selectedOrderIds,
      amount: totalInvoicingAmount,
      headerId: selectedHeaderId,
      status: 'pending',
      createdTime: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setInvoiceRequests([newReq, ...invoiceRequests]);
    setSelectedOrderIds([]);
    alert(`🎉 恭喜！已向上游商户正式提交 ¥${totalInvoicingAmount.toLocaleString()} 增值税专票开具申请。请等待开票员寄送或上传电子版。`);
  };

  // Payment mock trigger
  const handleTriggerPayment = (orderId: string, amount: number) => {
    const isPaid = payments.some(p => p.orderId === orderId && p.status === 'success');
    if (isPaid) {
      alert('该订单已经付清，无需重复打款！');
      return;
    }

    if (confirm(`准备执行转账付款，金额：¥${amount.toLocaleString()}，是否发起公对公银行电汇？`)) {
      const newPay: PaymentReceipt = {
        id: `PAY-${Math.floor(100 + Math.random() * 900)}`,
        orderId,
        amount,
        paymentMethod: '企业电汇 (网银公对公)',
        status: 'success',
        paymentTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
        receiptNo: `E-BANK-TX-${Math.floor(100000 + Math.random() * 900000)}`
      };

      setPayments([newPay, ...payments]);
      alert('💰 转账指令签署成功！款项已被招商银行托管出账，回执单已录入。');
    }
  };

  return (
    <div id="procurement-settlement" className="space-y-6">
      {/* Primary Settlement Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('headers')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'headers' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          发票抬头
        </button>
        <button
          onClick={() => setActiveTab('apply')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'apply' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          发票申请
          {orders.filter(o => o.status === 'completed').length > 0 && (
            <span className="bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
              {orders.filter(o => o.status === 'completed').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'payments' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          支付结果 (付款明细)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: INVOICE HEADERS */}
        {activeTab === 'headers' && (
          <motion.div
            key="headers-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Enter Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-fit space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1">
                <Plus className="w-4 h-4 text-[#2563eb]" />
                新增发票抬头
              </h3>

              <form onSubmit={handleAddHeader} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">企业/单位全称 *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="请输入与营业执照一致的企业名称"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">统一社会信用代码/税号 *</label>
                  <input
                    type="text"
                    required
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    placeholder="请输入18位大写信用代码"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">开户银行网点</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="招商银行深圳科苑支行"
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">银行基本账号</label>
                    <input
                      type="text"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="888 888 888"
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">企业注册地址</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">注册固话</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 pb-2">
                  <input
                    type="checkbox"
                    id="header-default-chk"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="rounded text-[#2563eb] focus:ring-[#2563eb] w-3.5 h-3.5"
                  />
                  <label htmlFor="header-default-chk" className="text-slate-500 font-medium select-none cursor-pointer">
                    设为系统首选默认抬头
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563eb] text-white rounded-xl py-2 font-bold hover:bg-blue-600 shadow-sm transition-all text-xs border-none cursor-pointer"
                >
                  添加发票抬头
                </button>
              </form>
            </div>

            {/* Headers collection */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">企业开票底码簿</h3>

              <div className="space-y-3">
                {invoiceHeaders.map((head) => (
                  <div key={head.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:border-blue-100 transition-all space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-xs">{head.companyName}</span>
                          {head.isDefault && (
                            <span className="bg-blue-50 text-blue-700 text-[9px] font-bold border border-blue-100 px-1.5 py-0.5 rounded">
                              系统默认
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 mt-0.5">
                          纳税人识别码：<strong className="text-slate-700">{head.taxNumber}</strong>
                          <button onClick={() => copyToClipboard(head.taxNumber)} className="text-slate-400 hover:text-slate-600 p-0.5">
                            <Copy className="w-3 h-3" />
                          </button>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs shrink-0">
                        {!head.isDefault && (
                          <button
                            onClick={() => handleSetDefaultHeader(head.id)}
                            className="text-[#2563eb] hover:text-blue-700 font-medium hover:underline text-[11px]"
                          >
                            设为默认
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteHeader(head.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-medium">
                      <p>开户银行: <span className="text-slate-600">{head.bankName || '未录入'}</span></p>
                      <p>银行账户: <span className="text-slate-600">{head.bankAccount || '未录入'}</span></p>
                      <p className="col-span-2">企业注册地址: <span className="text-slate-600">{head.address || '未录入'}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: APPLY FOR INVOICES */}
        {activeTab === 'apply' && (
          <motion.div
            key="apply-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Invoicable finished orders list */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">选择已交付完成的可开票订单</h3>
              
              {orders.filter(o => o.status === 'completed' || o.status === 'shipping').length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  暂无已履约合格的可建票采购单，请先交接仓库。
                </div>
              ) : (
                <div className="space-y-3">
                  {orders
                    .filter(o => o.status === 'completed' || o.status === 'shipping')
                    .map((ord) => {
                      const isSelected = selectedOrderIds.includes(ord.id);
                      return (
                        <div 
                          key={ord.id}
                          className={`p-3.5 border rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            isSelected ? 'border-[#2563eb] bg-blue-50/25 shadow-sm' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                          }`}
                          onClick={() => toggleOrderSelection(ord.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-[#2563eb] border-[#2563eb] text-white' : 'border-slate-300'}`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>

                            <div className="space-y-0.5">
                              <span className="font-mono text-[10px] font-bold text-slate-400">{ord.id}</span>
                              <p className="text-xs font-bold text-slate-700">{ord.title}</p>
                              <p className="text-[10px] text-slate-400 font-medium">供应商: {ord.vendor} | 所属日期: {ord.date}</p>
                            </div>
                          </div>

                          <span className="text-xs font-bold font-mono text-[#2563eb]">¥{ord.amount.toLocaleString()}</span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Invoicing configuration Panel */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-fit space-y-5">
              <h3 className="font-semibold text-slate-800 text-sm">开票抬头与汇总核对</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">选择受款发票抬头</label>
                  <select
                    value={selectedHeaderId}
                    onChange={(e) => setSelectedHeaderId(e.target.value)}
                    className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="">请选择开票主体公司</option>
                    {invoiceHeaders.map(h => (
                      <option key={h.id} value={h.id}>{h.companyName}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">选择开票订单数:</span>
                    <span className="font-bold text-slate-700">{selectedOrderIds.length} 个订单</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">专票汇总金额:</span>
                    <span className="font-extrabold text-rose-500 font-mono">
                      ¥{orders
                        .filter(o => selectedOrderIds.includes(o.id))
                        .reduce((sum, o) => sum + o.amount, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleApplyInvoice}
                  disabled={selectedOrderIds.length === 0}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all text-white flex items-center justify-center gap-1 border-none cursor-pointer ${
                    selectedOrderIds.length === 0 
                      ? 'bg-slate-200 cursor-not-allowed text-slate-400 shadow-none' 
                      : 'bg-[#2563eb] hover:bg-blue-600'
                  }`}
                >
                  <Receipt className="w-4 h-4" />
                  提交开票申请
                </button>
              </div>

              {/* Status history */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-700">最新开票处理流转状态 ({invoiceRequests.length})</h4>
                
                <div className="space-y-2 text-xs">
                  {invoiceRequests.map((req) => (
                    <div key={req.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">{req.id}</span>
                        {req.status === 'issued' ? (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded font-bold border border-emerald-100">
                            已开具快递
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-700 text-[9px] px-1.5 py-0.5 rounded font-bold border border-amber-100 animate-pulse">
                            处理审核中
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                        <span>金额：<strong>¥{req.amount.toLocaleString()}</strong></span>
                        {req.invoiceNo && <span className="font-mono text-slate-400">发票代码: {req.invoiceNo}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: PAYMENT RESULT / STATUS */}
        {activeTab === 'payments' && (
          <motion.div
            key="payments-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Quick payments table/cards */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800 text-sm">采购订单公账货开划拨记录</h3>
                <span className="text-xs text-slate-400 font-medium">全部公账电汇和代放授信已全流程跟踪</span>
              </div>

              {/* Grid showing all Orders requiring payment & paid status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map((ord) => {
                  const payment = payments.find(p => p.orderId === ord.id);
                  const isPaid = payment?.status === 'success';

                  return (
                    <div key={ord.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[10px] font-bold text-slate-400">{ord.id}</span>
                          {isPaid ? (
                            <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> 已付讫
                            </span>
                          ) : ord.status === 'pending_approval' ? (
                            <span className="text-amber-500 text-xs font-bold flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> 待审批
                            </span>
                          ) : (
                            <span className="text-rose-500 text-xs font-bold flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5" /> 待打电汇
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-slate-700 mt-1">{ord.title}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">供应伙伴: {ord.vendor} | 所属日期: {ord.date}</p>
                      </div>

                      <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-xs">
                        <p className="text-slate-500">账面额：<strong className="text-slate-800">¥{ord.amount.toLocaleString()}</strong></p>
                        
                        {!isPaid && ord.status !== 'pending_approval' ? (
                          <button
                            onClick={() => handleTriggerPayment(ord.id, ord.amount)}
                            className="bg-[#2563eb] hover:bg-blue-600 text-white font-bold rounded-xl px-3 py-1.5 text-[11px] transition-all border-none cursor-pointer"
                          >
                            发起转账
                          </button>
                        ) : isPaid ? (
                          <div className="text-right text-[10px] text-slate-400 font-mono">
                            <p>流水: {payment.receiptNo}</p>
                            <p>{payment.paymentTime}</p>
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
