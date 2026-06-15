import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderItem, AddressItem } from '../types';
import { 
  ClipboardCheck, 
  MapPin, 
  Trash2, 
  Search, 
  Plus, 
  CheckCircle,
  XCircle,
  Truck,
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';

interface OrdersProps {
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  addresses: AddressItem[];
  setAddresses: React.Dispatch<React.SetStateAction<AddressItem[]>>;
}

export default function Orders({ orders, setOrders, addresses, setAddresses }: OrdersProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'approve' | 'address'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_approval' | 'approved' | 'shipping' | 'completed'>('all');

  // Address form states
  const [receiver, setReceiver] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('上海市');
  const [city, setCity] = useState('上海市');
  const [district, setDistrict] = useState('浦东新区');
  const [detail, setDetail] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  // Approve action state
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectComment, setRejectComment] = useState('');

  // Handle order approval
  const handleApprove = (id: string, comment: string = '审批通过，预算及型号合规。') => {
    setOrders(orders.map(o => 
      o.id === id ? { ...o, status: 'approved', approvalComment: comment } : o
    ));
    alert(`✅ 订单 ${id} 审批完成！已流向库房进入备货发货阶段。`);
  };

  const handleOpenRejectDialog = (id: string) => {
    setRejectId(id);
    setRejectComment('');
  };

  const handleRejectConfirm = () => {
    if (!rejectId) return;
    setOrders(orders.map(o => 
      o.id === rejectId ? { ...o, status: 'rejected', approvalComment: rejectComment || '审批驳回：请自查采购数量与预算偏差。' } : o
    ));
    setRejectId(null);
    setRejectComment('');
    alert(`❌ 订单已打回，状态标记为“驳回”。`);
  };

  // Delete/Edit Order
  const handleCancelOrder = (id: string) => {
    if (confirm(`确定要取消此订单 (${id}) 吗？`)) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  // Add Address Handler
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiver.trim() || !phone.trim() || !detail.trim()) return;

    const newAddr: AddressItem = {
      id: `ADDR-${Math.floor(100 + Math.random() * 900)}`,
      receiver,
      phone,
      province,
      city,
      district,
      detail,
      isDefault
    };

    let updated = [...addresses];
    if (isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }
    setAddresses([...updated, newAddr]);

    setReceiver('');
    setPhone('');
    setDetail('');
    setIsDefault(false);
    alert('📍 新货运地址已绑定到企业库！');
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const filteredOrders = orders.filter(o => {
    const matchedSearch = 
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'all') return matchedSearch;
    return matchedSearch && o.status === statusFilter;
  });

  return (
    <div id="procurement-orders" className="space-y-6">
      {/* Sub tabs and Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            订单列表
          </button>
          <button
            onClick={() => setActiveTab('approve')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'approve' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            订单审批
            {orders.filter(o => o.status === 'pending_approval').length > 0 && (
              <span className="bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                {orders.filter(o => o.status === 'pending_approval').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('address')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'address' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            地址管理
          </button>
        </div>

        {activeTab === 'list' && (
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-600 font-medium"
            >
              <option value="all">显示全部状态</option>
              <option value="pending_approval">待审批</option>
              <option value="approved">已审批</option>
              <option value="shipping">配送中</option>
              <option value="completed">已交割</option>
            </select>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索订单描述/供应商..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 w-full sm:w-56 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: ORDER LIST */}
        {activeTab === 'list' && (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm text-slate-400 text-sm">
                未找到包含该筛选词的采购订单条目。
              </div>
            ) : (
              filteredOrders.map((order) => {
                let statusBadge = '';
                let statusLabel = '';
                if (order.status === 'pending_approval') {
                  statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
                  statusLabel = '等待审批中';
                } else if (order.status === 'approved') {
                  statusBadge = 'bg-blue-50 text-blue-700 border-blue-200';
                  statusLabel = '已流向库房备货';
                } else if (order.status === 'shipping') {
                  statusBadge = 'bg-purple-50 text-purple-700 border-purple-200';
                  statusLabel = '顺丰空运配送中';
                } else if (order.status === 'completed') {
                  statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  statusLabel = '已妥投交割';
                } else {
                  statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';
                  statusLabel = '拒绝驳回';
                }

                const matchingAddress = addresses.find(a => a.id === order.addressId);

                return (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4 hover:border-blue-100 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#2563eb]">{order.id}</span>
                          <span className="text-slate-400 text-xs">| 发布商：<strong>{order.vendor}</strong></span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">{order.title}</h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 text-[10px] font-bold tracking-tight rounded-md border ${statusBadge}`}>
                          {statusLabel}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{order.date}</span>
                      </div>
                    </div>

                    {/* Order Details items */}
                    <div className="space-y-2">
                      <div className="bg-slate-50/50 rounded-xl p-3 space-y-2 border border-slate-100/50">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs my-0.5">
                            <span className="text-slate-600 font-medium">{item.name}</span>
                            <span className="text-slate-500">
                              数量: <strong>{item.qty}</strong> × ¥{item.unitPrice.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Display delivery address */}
                      {matchingAddress && (
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pl-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>寄至：<strong>{matchingAddress.receiver} ({matchingAddress.phone})</strong> — {matchingAddress.province}{matchingAddress.city}{matchingAddress.district}{matchingAddress.detail}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="text-xs">
                        {order.approvalComment ? (
                          <p className="text-slate-400 italic">“ 批注意见：{order.approvalComment} ”</p>
                        ) : (
                          <p className="text-slate-400">尚无批语批注</p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 justify-end">
                        <p className="text-xs text-slate-400">小计应付款额：<strong className="text-rose-600 text-sm font-bold">¥{order.amount.toLocaleString()}</strong></p>
                        {order.status === 'pending_approval' && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            撤单
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        )}

        {/* VIEW 2: ORDER APPROVAL */}
        {activeTab === 'approve' && (
          <motion.div
            key="approve-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {orders.filter(o => o.status === 'pending_approval').length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm text-slate-400 text-sm">
                非常完美！目前没有任何亟待审核签字的采购申请订单。
              </div>
            ) : (
              orders
                .filter(o => o.status === 'pending_approval')
                .map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-amber-600">{order.id}</span>
                          <span className="bg-rose-50 text-rose-700 font-[800] text-[9px] px-1.5 rounded">
                            高优先级
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">{order.title}</h4>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">报审日期: {order.date}</p>
                        <p className="text-sm font-extrabold text-rose-600 mt-0.5">¥{order.amount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-xs font-bold text-slate-600 mb-1">采购报送物品明细：</p>
                      {order.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-xs my-0.5 text-slate-600">
                          <span>{it.name}</span>
                          <span>数量: {it.qty} × ¥{it.unitPrice}</span>
                        </div>
                      ))}
                    </div>

                    {/* Dialog trigger popup for Rejection Comments */}
                    {rejectId === order.id ? (
                      <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 space-y-3">
                        <label className="block text-xs font-bold text-rose-800">请输入打回/驳回的具体意见与理由：</label>
                        <textarea
                          rows={2}
                          required
                          value={rejectComment}
                          onChange={(e) => setRejectComment(e.target.value)}
                          placeholder="例：公司2026年度预算在严控行政支出，请将该规格笔记本调至更匹配的中配型号。"
                          className="w-full text-xs p-2 border border-rose-200 bg-white rounded-lg focus:outline-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setRejectId(null)}
                            className="bg-white px-3 py-1 text-xs border border-slate-200 rounded text-slate-500 hover:bg-slate-50"
                          >
                            取消
                          </button>
                          <button
                            onClick={handleRejectConfirm}
                            className="bg-rose-600 text-white px-3 py-1 text-xs rounded hover:bg-rose-700 font-semibold"
                          >
                            确认驳回打回
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                        <span className="text-xs text-slate-400">承载库：顺丰浦东集配库(默认配送地)</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenRejectDialog(order.id)}
                            className="bg-white hover:bg-rose-50 hover:text-rose-600 border border-slate-200 text-slate-600 px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            驳回打回
                          </button>
                          <button
                            onClick={() => handleApprove(order.id)}
                            className="bg-[#2563eb] hover:bg-blue-600 text-white px-4 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1 transition-all shadow-sm border-none cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            批准通过
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
            )}
          </motion.div>
        )}

        {/* VIEW 3: ADDRESS MANAGEMENT */}
        {activeTab === 'address' && (
          <motion.div
            key="address-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Enter form address */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-fit space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1">
                <Plus className="w-4 h-4 text-[#2563eb]" />
                新增企业收货地
              </h3>

              <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">收货货主 (例: 张三/前台)</label>
                  <input
                    type="text"
                    required
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="请输入真实姓名及科室名称"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">货主绑定手机</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="请输入11位企业或个人电话"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1">省份</label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">地市</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">区县</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">详细办公楼宇门牌号</label>
                  <input
                    type="text"
                    required
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="例: 科苑路88号联想大厦3楼整层行政部"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 pb-2">
                  <input
                    type="checkbox"
                    id="address-default-chk"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="rounded text-[#2563eb] focus:ring-[#2563eb] w-3.5 h-3.5"
                  />
                  <label htmlFor="address-default-chk" className="text-slate-500 font-medium select-none cursor-pointer">
                    设为系统首选默认地址
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563eb] text-white rounded-xl py-2 font-bold hover:bg-blue-600 shadow-sm transition-all text-xs border-none cursor-pointer"
                >
                  绑定添加货点
                </button>
              </form>
            </div>

            {/* Address list */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm">已绑定收货地库</h3>

              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:border-blue-100 transition-all flex justify-between items-start">
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-xs">{addr.receiver}</span>
                        <span className="text-slate-400 text-xs font-mono">{addr.phone}</span>
                        {addr.isDefault && (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-100 px-1.5 py-0.5 rounded">
                            默认收货
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-normal">
                        {addr.province} {addr.city} {addr.district} {addr.detail}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-xs shrink-0">
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-[#2563eb] hover:text-blue-700 font-medium hover:underline text-[11px]"
                        >
                          标为默认
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
