import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReconciliationBill } from '../types';
import { 
  FileSpreadsheet, 
  CheckSquare, 
  AlertTriangle, 
  X, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronRight, 
  HelpCircle,
  FileCheck2,
  Lock
} from 'lucide-react';

interface ReconciliationProps {
  bills: ReconciliationBill[];
  setBills: React.Dispatch<React.SetStateAction<ReconciliationBill[]>>;
}

export default function Reconciliation({ bills, setBills }: ReconciliationProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'confirm' | 'rejects'>('list');
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);
  
  // Rejection reasons input
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  // Bill calculations
  const totalOutstanding = bills
    .filter(b => b.status === 'pending_confirm')
    .reduce((sum, b) => sum + b.amount, 0);

  const totalConfirmed = bills
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.amount, 0);

  // Confirm Reconciliation Bill Handler
  const handleConfirmBill = (id: string) => {
    setBills(bills.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
    alert(`👍 对账单 ${id} 确认无误，已自动加盖电子签署章并报送至资金部等候付款。`);
  };

  // Reject Reconciliation Bill Flow
  const handleRejectClick = (id: string) => {
    setSelectedBillId(id);
    setIsRejecting(true);
    setRejectReason('');
  };

  const submitRejection = () => {
    if (!selectedBillId || !rejectReason.trim()) return;
    setBills(bills.map(b => 
      b.id === selectedBillId 
        ? { ...b, status: 'rejected', rejectionReason: rejectReason } 
        : b
    ));
    setIsRejecting(false);
    setSelectedBillId(null);
    setRejectReason('');
    alert(`❌ 已正式向供应商发送对账单驳回回执，说明：${rejectReason}`);
  };

  return (
    <div id="procurement-reconciliation" className="space-y-6">
      {/* Finance Statistics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold">¥</div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">待确认对账额</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">¥{totalOutstanding.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold">¥</div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">已核对账单额</p>
            <p className="text-sm font-bold text-emerald-600 mt-0.5">¥{totalConfirmed.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center font-bold">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">异常纠纷账单</p>
            <p className="text-sm font-bold text-rose-600 mt-0.5">
              {bills.filter(b => b.status === 'rejected').length} 张
            </p>
          </div>
        </div>
        <div className="bg-[#2563eb] p-4 rounded-xl text-white shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-blue-100 font-semibold uppercase">安全签署证书</p>
            <p className="text-[11px] font-bold mt-0.5">CFCA国密盾已加密</p>
          </div>
        </div>
      </div>

      {/* Primary Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          对账单列表
        </button>
        <button
          onClick={() => setActiveTab('confirm')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'confirm' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          对账确认
          {bills.filter(b => b.status === 'pending_confirm').length > 0 && (
            <span className="bg-amber-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
              {bills.filter(b => b.status === 'pending_confirm').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('rejects')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'rejects' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          对账驳回记录
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: BILL LIST */}
        {activeTab === 'list' && (
          <motion.div
            key="list-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 text-xs flex items-center gap-1">供应商核账对期月表</h3>
            </div>
            
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left text-slate-500">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3">对账单编号</th>
                    <th className="p-3">供应承购商</th>
                    <th className="p-3">结算所属账期</th>
                    <th className="p-3">涵盖成交订单量</th>
                    <th className="p-3">对账发生额</th>
                    <th className="p-3">发出时间</th>
                    <th className="p-3 text-right">核对状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-mono font-medium text-slate-400">{bill.id}</td>
                      <td className="p-3 font-semibold text-slate-800">{bill.vendorName}</td>
                      <td className="p-3 font-semibold text-[#2563eb]">{bill.billPeriod}</td>
                      <td className="p-3">{bill.orderCount} 张PO</td>
                      <td className="p-3 font-bold text-slate-800">¥{bill.amount.toLocaleString()}</td>
                      <td className="p-3 text-slate-400">{bill.createdTime}</td>
                      <td className="p-3 text-right">
                        {bill.status === 'confirmed' ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">
                            已确认无误
                          </span>
                        ) : bill.status === 'rejected' ? (
                          <span className="bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-full font-bold">
                            已驳回打回
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full font-bold">
                            待采销审批
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: CONFIRM BILLS */}
        {activeTab === 'confirm' && (
          <motion.div
            key="confirm-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {bills.filter(b => b.status === 'pending_confirm').length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm text-slate-400 text-sm">
                当前尚无等待双方盖章核审的采购对账账单。
              </div>
            ) : (
              bills
                .filter(b => b.status === 'pending_confirm')
                .map((bill) => (
                  <div key={bill.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-400">{bill.id}</span>
                        <h4 className="text-sm font-bold text-slate-800 mt-0.5">{bill.vendorName}</h4>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-xs text-slate-400">核对账期：<strong className="text-slate-800">{bill.billPeriod}</strong></p>
                        <p className="text-xs text-slate-400">核定发生额：<strong className="text-rose-600 font-extrabold text-sm">¥{bill.amount.toLocaleString()}</strong></p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
                      <FileCheck2 className="w-5 h-5 text-[#2563eb] mt-0.5 shrink-0" />
                      <div className="space-y-1">
                        <h5 className="font-semibold text-slate-700">万联智能采办合规提醒说明：</h5>
                        <p className="text-slate-500 leading-relaxed">
                          该对账单合并汇总了贵司在得力办公本期提交并顺利入库的全部采购批次（包含3张采购单）。系统已预校对库房电子扫码入库记录，与对账单数量匹配率达到 <strong>100%</strong>。批准后将自动生成企业划拨确认单，并作为企业开票付款的合规依据。
                        </p>
                      </div>
                    </div>

                    {isRejecting && selectedBillId === bill.id ? (
                      <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 space-y-3">
                        <label className="block text-xs font-semibold text-rose-800">请指出该本期帐目与实际明细不相符的争议点：</label>
                        <textarea
                          rows={2}
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="例：公司实际到货记录中得力纸箱少1箱，报价单单价与约定折扣价高估10元，请核减金额后重发起。"
                          className="w-full text-xs p-2 border border-rose-200 bg-white rounded-lg focus:outline-none"
                        />
                        <div className="flex justify-end gap-2 text-xs">
                          <button
                            onClick={() => { setIsRejecting(false); setSelectedBillId(null); }}
                            className="bg-white border rounded px-3 py-1 text-slate-500 hover:bg-slate-50"
                          >
                            取消
                          </button>
                          <button
                            onClick={submitRejection}
                            className="bg-rose-600 text-white font-bold rounded px-4 py-1 hover:bg-rose-700"
                          >
                            正式发起驳回
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-3 pt-2 text-xs">
                        <button
                          onClick={() => handleRejectClick(bill.id)}
                          className="bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 rounded-lg px-4 py-1.5 font-bold text-slate-600 transition-colors"
                        >
                          账目异常（打回）
                        </button>
                        <button
                          onClick={() => handleConfirmBill(bill.id)}
                          className="bg-[#2563eb] hover:bg-blue-600 text-white rounded-xl px-5 py-1.5 font-bold transition-all shadow-sm border-none cursor-pointer"
                        >
                          确认帐目无误
                        </button>
                      </div>
                    )}
                  </div>
                ))
            )}
          </motion.div>
        )}

        {/* VIEW 3: REJECTED RECORDS */}
        {activeTab === 'rejects' && (
          <motion.div
            key="rejects-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {bills.filter(b => b.status === 'rejected').length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm text-slate-400 text-sm">
                当前无任何驳回挂账纠纷，采购账期运转顺滑正常。
              </div>
            ) : (
              bills
                .filter(b => b.status === 'rejected')
                .map((bill) => (
                  <div key={bill.id} className="bg-white border border-rose-100 hover:border-rose-200 rounded-2xl shadow-sm p-5 space-y-3">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                      <div>
                        <span className="font-mono text-xs font-semibold text-rose-500">{bill.id} (异常打回)</span>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">{bill.vendorName}</h4>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">属于账期: {bill.billPeriod}</p>
                        <p className="text-sm font-bold text-slate-800">¥{bill.amount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="bg-rose-50 p-3 rounded-lg border border-rose-100/50 text-xs">
                      <p className="font-semibold text-rose-800 mb-1">纠偏回执与驳回原因：</p>
                      <p className="text-rose-700 leading-relaxed font-mono">
                        {bill.rejectionReason}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                      <span>打回发出日期：{bill.createdTime}</span>
                      <span className="text-amber-600 font-semibold flex items-center gap-1.5 animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        等待供应商修改重新核算
                      </span>
                    </div>
                  </div>
                ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
