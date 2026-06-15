import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WelfareProduct, WelfareOrder } from '../types';
import { 
  Smile, 
  Store, 
  Truck, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Award, 
  Flame, 
  Clock, 
  Search, 
  Filter, 
  Users,
  Info
} from 'lucide-react';

interface WelfareProps {
  welfareProducts: WelfareProduct[];
  welfareOrders: WelfareOrder[];
  setWelfareOrders: React.Dispatch<React.SetStateAction<WelfareOrder[]>>;
  memberPoints: number;
  setMemberPoints: React.Dispatch<React.SetStateAction<number>>;
}

export default function Welfare({ 
  welfareProducts, 
  welfareOrders, 
  setWelfareOrders, 
  memberPoints, 
  setMemberPoints 
}: WelfareProps) {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'store' | 'orders'>('store');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Multipliers for corporate size
  const [employeeCount, setEmployeeCount] = useState(50);

  // Group procurement handler from Store
  const handleBulkPurchase = (product: WelfareProduct, count: number) => {
    const totalPoints = product.pointsPrice * count;
    
    if (memberPoints < totalPoints) {
      alert(`⚠️ 抱歉！企业当前可用积分 (${memberPoints}分) 不足划拨该采购批次 (需：${totalPoints}分)。\n你可以选择通过公对公签署划款，或者扣减采购人数。`);
      return;
    }

    if (confirm(`准备为 ${count} 位在册员工批量采购 [${product.name}]？\n此操作将消耗企业积分：${totalPoints.toLocaleString()} 分。`)) {
      setMemberPoints(prev => prev - totalPoints);

      const newWelfareOrder: WelfareOrder = {
        id: `WEL-ORD-${Math.floor(100 + Math.random() * 900)}`,
        productName: product.name,
        employeeCount: count,
        pointsSpent: totalPoints,
        totalCashSpent: 0,
        status: 'pending',
        createdTime: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      setWelfareOrders([newWelfareOrder, ...welfareOrders]);
      alert(`🎉 成功发起关怀物资代发划拨批次 ${newWelfareOrder.id}！正在打包分拣派单发货，可通过员工手机微信推送福利链接一键提领。`);
    }
  };

  const categories = ['all', ...Array.from(new Set(welfareProducts.map(p => p.category)))];

  const filteredProducts = welfareProducts.filter(p => {
    const matchedSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchedCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchedSearch && matchedCategory;
  });

  return (
    <div id="procurement-welfare" className="space-y-6">
      {/* Sub tabs and parameters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'campaigns' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            福利活动
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'store' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            福利商品池
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            福利订单
            {welfareOrders.filter(w => w.status === 'pending' || w.status === 'shipping').length > 0 && (
              <span className="bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                {welfareOrders.filter(w => w.status === 'pending' || w.status === 'shipping').length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'store' && (
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:bg-white text-slate-600 font-bold"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? '全部品类商品' : c}
                </option>
              ))}
            </select>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索端午坚果/下午茶礼盒"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 w-full sm:w-56 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: WELFARE CAMPAIGNS */}
        {activeTab === 'campaigns' && (
          <motion.div
            key="campaigns-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Visual calendar events cards */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">2026年企业员工法定及节假日关怀日历</h3>
              <p className="text-xs text-slate-400">万联采购端支持一键绑定特定的节假日福利专场，自动针对公司在册员工划归发放点数。</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-blue-100 rounded-xl p-4 bg-gradient-to-r from-blue-50/20 to-white flex justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                      即将来临 (2026.06.20)
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">「粽叶飘香 端午安康」大福福利专场</h4>
                    <p className="text-xs text-slate-400">已自动同步公司花名册数据，提供五芳斋品牌礼盒、京东卡、夏日体检卡和下午茶多重提领方案。</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('store'); setCategoryFilter('all'); }}
                    className="bg-[#2563eb] hover:bg-blue-600 text-white font-bold h-fit rounded-xl text-xs px-3 py-1.5 shrink-0 border-none cursor-pointer"
                  >
                    去采购
                  </button>
                </div>

                <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/60 opacity-75 flex justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                      中秋专场 (2026.09.25)
                    </span>
                    <h4 className="font-bold text-slate-500 text-sm">「皓月当空 礼遇万联」中秋关爱礼盒</h4>
                    <p className="text-xs text-slate-400">已联系美心、广州酒家和大班冰皮月饼大客户部，提供独家定制万联logo设计外壳与寄送支持。</p>
                  </div>
                  <span className="text-slate-400 font-bold text-xs border border-slate-200 px-3 py-1 bg-white h-fit rounded cursor-not-allowed">
                    未开始
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: WELFARE STORE POOL */}
        {activeTab === 'store' && (
          <motion.div
            key="store-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Employee sizing widget */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#2563eb]" />
                  配置批量采购人数 (企业花名册划拨参数)
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">指定本批福利的受益员工总人数，系统将自动核算出需要的企业总积分。</p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setEmployeeCount(prev => Math.max(1, prev - 5))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                >
                  <Minus className="w-4 h-4 text-slate-600" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Math.max(1, Number(e.target.value)))}
                  className="w-16 text-center border border-slate-200 rounded-lg p-1.5 text-xs font-bold font-mono focus:outline-none"
                />
                <button 
                  onClick={() => setEmployeeCount(prev => prev + 5)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                >
                  <Plus className="w-4 h-4 text-slate-600" />
                </button>
                <span className="text-xs text-slate-400 font-medium">位员工</span>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((p) => {
                const requiredPoints = p.pointsPrice * employeeCount;
                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:border-slate-200 hover:shadow transition-all flex flex-col justify-between">
                    {/* Image */}
                    <div className="h-40 relative overflow-hidden bg-slate-100 font-mono">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 bg-slate-900/85 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {p.category}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-slate-800 text-xs tracking-tight line-clamp-2 min-h-[32px] leading-snug">{p.name}</h4>
                        <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">“ {p.description} ”</p>
                      </div>

                      <div className="border-t border-slate-100 pt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">单件分值:</span>
                          <span className="font-bold text-[#2563eb] font-mono">{p.pointsPrice} 积分/人</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">采购规模:</span>
                          <span className="font-semibold text-slate-600">{employeeCount} 位人头</span>
                        </div>
                        <div className="flex justify-between text-xs border-t border-slate-50 pt-1">
                          <span className="text-slate-500 font-bold">小计所需：</span>
                          <span className="font-extrabold text-rose-500 font-mono">{requiredPoints.toLocaleString()} 积分</span>
                        </div>
                      </div>
                    </div>

                    {/* Cart Trigger Button */}
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                      <button
                        onClick={() => handleBulkPurchase(p, employeeCount)}
                        className="w-full bg-slate-800 hover:bg-emerald-600 text-white rounded-xl py-2 text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        批量兑用发送
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* VIEW 3: WELFARE ORDERS LIST */}
        {activeTab === 'orders' && (
          <motion.div
            key="orders-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 text-xs">企业关爱代发批次列表</h3>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left text-slate-500">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3">福利批号</th>
                    <th className="p-3">采购物资项目</th>
                    <th className="p-3">下拨涵盖员工量</th>
                    <th className="p-3">已冲抵企业积分</th>
                    <th className="p-3">划拨划款总额</th>
                    <th className="p-3">下拨周期</th>
                    <th className="p-3 text-right">分发寄送状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {welfareOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-400">{ord.id}</td>
                      <td className="p-3 font-semibold text-slate-800">{ord.productName}</td>
                      <td className="p-3 font-semibold text-[#2563eb]">{ord.employeeCount} 位在册员工</td>
                      <td className="p-3 font-bold font-mono text-rose-500">
                        {ord.pointsSpent > 0 ? `-${ord.pointsSpent.toLocaleString()} 分` : '—'}
                      </td>
                      <td className="p-3 font-bold text-slate-800">
                        {ord.totalCashSpent > 0 ? `¥${ord.totalCashSpent.toLocaleString()}` : '¥0.00 (线上冲抵)'}
                      </td>
                      <td className="p-3 text-slate-400">{ord.createdTime}</td>
                      <td className="p-3 text-right">
                        {ord.status === 'completed' ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">
                            微信提领已交割
                          </span>
                        ) : (
                          <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-bold animate-pulse">
                            在途分拣顺丰派发
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
      </AnimatePresence>
    </div>
  );
}
