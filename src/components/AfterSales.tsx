import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderItem, AfterSaleRequest, SupplierReview, ExportJob } from '../types';
import { 
  Heart, 
  Star, 
  Sparkles, 
  ShieldAlert, 
  Sliders, 
  Briefcase, 
  Trash2, 
  Check, 
  Calendar, 
  Clock, 
  Download, 
  RefreshCw, 
  FileText, 
  CheckCircle, 
  Loader2,
  AlertCircle
} from 'lucide-react';

interface AfterSalesProps {
  orders: OrderItem[];
  aftersales: AfterSaleRequest[];
  setAftersales: React.Dispatch<React.SetStateAction<AfterSaleRequest[]>>;
  reviews: SupplierReview[];
  setReviews: React.Dispatch<React.SetStateAction<SupplierReview[]>>;
  exports: ExportJob[];
  setExports: React.Dispatch<React.SetStateAction<ExportJob[]>>;
}

export default function AfterSales({ 
  orders, 
  aftersales, 
  setAftersales, 
  reviews, 
  setReviews, 
  exports, 
  setExports 
}: AfterSalesProps) {
  const [activeTab, setActiveTab] = useState<'request' | 'evaluation' | 'export'>('request');

  // After-sales form States
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [productName, setProductName] = useState('');
  const [reason, setReason] = useState<'quality' | 'shortage' | 'damage' | 'other'>('quality');
  const [asDescription, setAsDescription] = useState('');
  const [refundAmount, setRefundAmount] = useState(0);

  // Supplier evaluation States
  const [supplierName, setSupplierName] = useState('');
  const [qualityRating, setQualityRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Submit After-sale request
  const handleSubmitAftersale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId || !productName.trim() || !asDescription.trim()) {
      alert('请将必填项目填写完整！');
      return;
    }

    const newRequest: AfterSaleRequest = {
      id: `AS-${Math.floor(100 + Math.random() * 900)}`,
      orderId: selectedOrderId,
      productName,
      reason,
      description: asDescription,
      status: 'submitted',
      refundAmount: refundAmount > 0 ? Number(refundAmount) : undefined,
      createdTime: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setAftersales([newRequest, ...aftersales]);
    setProductName('');
    setAsDescription('');
    setRefundAmount(0);
    alert('🔧 售后维权申请已被万联平台审核专员受理。1个工作日内会向您反馈核实结果。');
  };

  // Submit supplier review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierName.trim() || !reviewComment.trim()) {
      alert('请输入供应商名称和文字评语！');
      return;
    }

    const newReview: SupplierReview = {
      id: `REV-${Math.floor(100 + Math.random() * 900)}`,
      supplierName,
      qualityRating,
      deliveryRating,
      serviceRating,
      comment: reviewComment,
      createdTime: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setSupplierName('');
    setReviewComment('');
    setQualityRating(5);
    setDeliveryRating(5);
    setServiceRating(5);
    alert('⭐️ 感谢！供应商客观信用评分已收录，将合并计入行业诚信库资质权重评定。');
  };

  // Simulate exporting report in export center
  const handleTriggerExport = (jobId: string) => {
    setExports(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, status: 'processing', progress: 10 };
      }
      return job;
    }));

    // Beautiful animated simulation progress tracker
    const interval = setInterval(() => {
      setExports(prev => {
        let isDone = false;
        const next = prev.map(job => {
          if (job.id === jobId && job.status === 'processing') {
            const nextProgress = job.progress + 30;
            if (nextProgress >= 100) {
              isDone = true;
              return { ...job, status: 'completed', progress: 100 };
            }
            return { ...job, progress: nextProgress };
          }
          return job;
        });
        if (isDone) clearInterval(interval);
        return next;
      });
    }, 600);
  };

  const handleDownloadFile = (fileName: string) => {
    // Elegant local client-side file downloader trigger
    const element = document.createElement("a");
    const file = new Blob(["万联智能智慧采销平台导出中心提供该仿真数据报表文件"], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="procurement-aftersales" className="space-y-6">
      {/* Sub tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('request')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'request' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          售后申请
        </button>
        <button
          onClick={() => setActiveTab('evaluation')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'evaluation' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          销售评价 (供应商评级)
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'export' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          导出中心
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: AFTER SALES SYSTEM */}
        {activeTab === 'request' && (
          <motion.div
            key="request-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* After-sales ticket form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-fit space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                填报异常退换货/折旧申请
              </h3>

              <form onSubmit={handleSubmitAftersale} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">关联采购主订单 *</label>
                  <select
                    required
                    value={selectedOrderId}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                    className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="">请挑选采购批次单号</option>
                    {orders.map(o => (
                      <option key={o.id} value={o.id}>{o.id} - {o.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">异常受损物品名称 *</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="例：得力复印纸 沾湿不可用/华硕笔记本 充不上电"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">售后原因类型</label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value as any)}
                      className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="quality">质量不过关/划伤/暗病</option>
                      <option value="shortage">数量缺失或件数错付</option>
                      <option value="damage">物流梅雨季打湿损毁</option>
                      <option value="other">因客户计划调整协商退返</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">预估协商退款/减免额 (元)</label>
                    <input
                      type="number"
                      min="0"
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">详细事实与照片辅证(说明)</label>
                  <textarea
                    rows={3}
                    required
                    value={asDescription}
                    onChange={(e) => setAsDescription(e.target.value)}
                    placeholder="请输入对售后原因更细致具体的陈述描述。如有到货开箱视频，外箱形变照片或划损特写，也请说明已留存并发送至客服邮箱。"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-800 text-white rounded-lg py-2 font-bold hover:bg-slate-700 shadow-sm transition-all text-xs"
                >
                  向供应商提交该售后
                </button>
              </form>
            </div>

            {/* After-sales trace panel */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">已立案售后进度追踪表</h3>

              <div className="space-y-3">
                {aftersales.map((item) => (
                  <div key={item.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:border-blue-100 transition-all space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-rose-500">{item.id}</span>
                          <span className="text-[10px] text-slate-400">所属订单: {item.orderId}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-xs">{item.productName}</h4>
                      </div>

                      {item.status === 'approved' ? (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">
                          退款折旧妥投完成
                        </span>
                      ) : item.status === 'submitted' ? (
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                          客服处理派案中
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                          折让确认流转中
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 leading-normal font-mono">“ {item.description} ”</p>

                    <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                      <span>提报时间: {item.createdTime}</span>
                      {item.refundAmount && (
                        <p>预计赔损：<strong className="text-rose-600 font-bold">¥{item.refundAmount}</strong></p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: SUPPLIER VALUE EVALUATION */}
        {activeTab === 'evaluation' && (
          <motion.div
            key="evaluation-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Feedback evaluation formulation */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-fit space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                登记录入商户满意度星卡
              </h3>

              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">拟评价供应商名称 *</label>
                  <input
                    type="text"
                    required
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    placeholder="例：得力办公用品华东供应商 / 顺丰浦东集配库"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs mb-1"
                  />
                </div>

                {/* Stars ratings */}
                <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100/50">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">产品工艺质量级别 (Quality)</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button type="button" key={s} onClick={() => setQualityRating(s)}>
                          <Star className={`w-4 h-4 ${qualityRating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">物流时效精准度 (Delivery)</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button type="button" key={s} onClick={() => setDeliveryRating(s)}>
                          <Star className={`w-4 h-4 ${deliveryRating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">合规对账响应配合 (Service)</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button type="button" key={s} onClick={() => setServiceRating(s)}>
                          <Star className={`w-4 h-4 ${serviceRating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">真实采购文字评语意见 *</label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="请输入采购员与财务对采购、发货、开票及后续售后过程中，该供应商的整体体验。客观的评价能帮助企业建立诚信供应商库白名单。"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-800 text-white rounded-lg py-2 font-bold hover:bg-slate-700 shadow-sm transition-all text-xs"
                >
                  签署并上传信用星级
                </button>
              </form>
            </div>

            {/* Scorecard grid reviews database */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">最新评级历史记录簿</h3>

              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800 text-xs">{rev.supplierName}</span>
                      <span className="text-slate-400 text-[10px]">{rev.createdTime}</span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
                      <p className="flex items-center gap-1">质量: <strong className="text-amber-500">{rev.qualityRating} ★</strong></p>
                      <p className="flex items-center gap-1">交期: <strong className="text-amber-500">{rev.deliveryRating} ★</strong></p>
                      <p className="flex items-center gap-1">配合度: <strong className="text-amber-500">{rev.serviceRating} ★</strong></p>
                    </div>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed font-mono mt-1.5 italic">“ {rev.comment} ”</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: EXPORT CENTER */}
        {activeTab === 'export' && (
          <motion.div
            key="export-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-800 text-sm">数据统计导出及合规模拟报送</h3>
              <p className="text-xs text-slate-400 mt-1">这里收录了您发起并打包审计的文件。生成进度完成后即可通过触发本地浏览器离线下载。</p>
            </div>

            <div className="space-y-4">
              {exports.map((job) => (
                <div key={job.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50 hover:border-slate-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-xs">{job.fileName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">预计文件：{job.fileSize} | 批次号：{job.id} | 创建周期：{job.createdTime}</p>
                    </div>
                  </div>

                  {/* Actions depending on simulated exports progress */}
                  <div className="flex items-center gap-4 text-xs shrink-0">
                    {job.status === 'ready' && (
                      <button
                        onClick={() => handleTriggerExport(job.id)}
                        className="bg-[#2563eb] hover:bg-blue-600 text-white font-bold rounded-xl px-4 py-1.5 shadow-sm transition-all border-none cursor-pointer"
                      >
                        生成打包
                      </button>
                    )}

                    {job.status === 'processing' && (
                      <div className="flex items-center gap-3">
                        {/* Custom animated progress bar */}
                        <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#2563eb] h-full rounded-full transition-all duration-500" style={{ width: `${job.progress}%` }}></div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono font-bold flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin text-[#2563eb]" />
                          {job.progress}%
                        </span>
                      </div>
                    )}

                    {job.status === 'completed' && (
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold text-xs flex items-center gap-1 mr-2">
                          <CheckCircle className="w-4 h-4" />打包完毕
                        </span>
                        <button
                          onClick={() => handleDownloadFile(job.fileName)}
                          className="bg-slate-800 hover:bg-emerald-600 text-white font-bold rounded-lg px-3 py-1.5 flex items-center gap-1 transition-all shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          下载至本地
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
