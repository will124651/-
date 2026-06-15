import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CouponItem } from '../types';
import { 
  Gift, 
  Ticket, 
  Crown, 
  Sparkles, 
  Flame, 
  CheckCircle, 
  TrendingUp, 
  ArrowUpRight, 
  Activity, 
  ShieldCheck,
  Check
} from 'lucide-react';

interface CardMarketingProps {
  coupons: CouponItem[];
  setCoupons: React.Dispatch<React.SetStateAction<CouponItem[]>>;
  memberPoints: number;
}

export default function CardMarketing({ coupons, setCoupons, memberPoints }: CardMarketingProps) {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'coupons' | 'membership'>('campaigns');

  const handleUseCoupon = (id: string, code: string = '万联专供') => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, status: 'used' } : c));
    alert(`🎉 电子代金卡券 [${id}] 绑定使用成功，已将折价额划归到您在订单管理中提交的下一次采购事件！`);
  };

  return (
    <div id="procurement-card-marketing" className="space-y-6">
      {/* Dynamic Member statistics top-bar */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Crown className="w-5 h-5 text-amber-200 fill-amber-200 animate-bounce" />
            <span className="text-xs text-amber-100 font-extrabold tracking-wider uppercase">万联尊享金级黄金企业会员</span>
          </div>
          <h2 className="text-2xl font-bold">万联智能科技有限公司采购专号</h2>
          <p className="text-xs text-amber-100/80">企业统一征信机构编号: 91310115MA1H8K4X9P | 客户经理: 刘伟 (专属一对一VIP席位)</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-right shrink-0">
          <p className="text-[10px] text-amber-100 font-bold uppercase tracking-wider">累计采购权能积分</p>
          <h3 className="text-2xl font-extrabold text-white mt-1 font-mono">
            {memberPoints.toLocaleString()} <span className="text-xs font-normal">分</span>
          </h3>
          <p className="text-[10px] text-amber-200 font-medium mt-1">额度年底不打折扣不过期</p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'campaigns' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          营销活动
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'coupons' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          卡券积分
        </button>
        <button
          onClick={() => setActiveTab('membership')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'membership' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Crown className="w-3.5 h-3.5" />
          会员中心
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: PROCUREMENT BANNER CAMPAIGNS */}
        {activeTab === 'campaigns' && (
          <motion.div
            key="campaigns-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Banner 1 */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between h-56 shadow">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                <Gift className="w-48 h-48" />
              </div>

              <div>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/10 inline-block uppercase">
                  B2B年中大买节
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-3 leading-tight">得力办公品牌年中狂欢直降包邮</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">批量购买复印纸、针管笔、大批办公桌柜尊享平台85折扣让利，活动首单免除偏远地区运费并免费送货组装。</p>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-[10px] text-slate-400 font-bold">期限：截止2026年6月30日</span>
                <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1">
                  了解详情 <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white rounded-2xl p-6 border border-emerald-900 relative overflow-hidden flex flex-col justify-between h-56 shadow">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                <Crown className="w-48 h-48" />
              </div>

              <div>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-teal-500/10 inline-block uppercase">
                  端午节送关怀
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-3 leading-tight">五芳斋定制粽子福礼限时秒杀竞价</h3>
                <p className="text-xs text-teal-200/80 mt-2 leading-relaxed">尊享万联采办特惠，采购端员工节假日福利商品池爆款全网首发。定制端午礼盒低至135元起，支持员工自定义配送拆分发快递。</p>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-[10px] text-teal-300/60 font-bold">期限：截止2026年6月20日</span>
                <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1">
                  进去采购 <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: COUPONS COLLECTION */}
        {activeTab === 'coupons' && (
          <motion.div
            key="coupons-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">可用代金卡券明细簿</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coupons.map((c) => {
                  const isAvailable = c.status === 'available';
                  return (
                    <div 
                      key={c.id} 
                      className={`border rounded-2xl p-4 flex gap-4 transition-all relative overflow-hidden ${
                        isAvailable 
                          ? 'border-blue-100 bg-gradient-to-r from-blue-50/20 to-white hover:shadow-sm' 
                          : 'border-slate-100 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div className="w-20 bg-[#2563eb] text-white rounded-xl flex flex-col justify-center items-center p-2 shrink-0 font-bold">
                        <span className="text-xs font-normal">
                          {c.type === 'discount' ? '满减卷' : '返金卷'}
                        </span>
                        <p className="text-lg font-extrabold mt-1">¥{c.value}</p>
                      </div>

                      <div className="space-y-1.5 flex-1 pr-6">
                        <h4 className="font-bold text-slate-800 text-xs tracking-tight line-clamp-1">{c.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">满足门槛：满 ¥{c.threshold} 起用</p>
                        <p className="text-[10px] text-rose-500 font-medium font-mono">截止期：{c.expiryDate}</p>
                      </div>

                      <div className="absolute right-4 top-1/2 -translate-y-1/2 shrink-0">
                        {isAvailable ? (
                          <button
                            onClick={() => handleUseCoupon(c.id)}
                            className="bg-[#2563eb] hover:bg-blue-600 text-white text-[11px] font-bold rounded-xl px-2.5 py-1.5 shadow-sm transition-all border-none cursor-pointer"
                          >
                            立即兑用
                          </button>
                        ) : (
                          <span className="text-slate-300 font-bold border border-slate-200 px-2 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                            <Check className="w-3 h-3 text-emerald-500" />已兑用
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: SYSTEM MEMBERSHIP PROFILER */}
        {activeTab === 'membership' && (
          <motion.div
            key="membership-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Left big card explaining benefits */}
            <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">金级会员 (Gold Level) 尊享九大特权说明</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-medium">
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">专属客户经理</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">刘伟专席随时解答异常单证</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">月结信贷账期</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">尊享自然月30天免息挂账</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">售后优先闪退</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">免检测原路先行垫资赔退</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">品牌大客户价</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">直接打通华硕/得力一级商议</p>
                  </div>
                </div>
              </div>

              {/* Progress gauge metrics */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>累积晋升铂金级别 (Platinum Grade) 进度</span>
                  <span className="font-mono text-slate-400">¥2,000,000 / ¥3,000,000 (还差¥100万)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '66.6%' }}></div>
                </div>
              </div>
            </div>

            {/* Right side widgets */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">企业资质认证详情</h3>
              
              <div className="space-y-3.5 text-xs">
                <div className="border-b border-slate-50 pb-2">
                  <span className="text-slate-400 block mb-0.5">认证账号</span>
                  <p className="font-bold text-slate-700 font-mono">bailingyue1998@gmail.com</p>
                </div>
                <div className="border-b border-slate-50 pb-2">
                  <span className="text-slate-400 block mb-0.5">企业法人代表人</span>
                  <p className="font-bold text-slate-700">张大仙 (合规认证通过)</p>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">平台最高授信额度</span>
                  <p className="font-mono font-extrabold text-[#2563eb] text-sm">¥500,000.00 元</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
