import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FavoriteProduct } from '../types';
import { 
  Heart, 
  Award, 
  Building, 
  Trash2, 
  ExternalLink, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Check, 
  Crown,
  Lock,
  ChevronRight
} from 'lucide-react';

interface PersonalProps {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  orgProfile: {
    orgName: string;
    legalRep: string;
    taxNo: string;
    mail: string;
    phone: string;
    siteUrl: string;
  };
  setOrgProfile: React.Dispatch<React.SetStateAction<{
    orgName: string;
    legalRep: string;
    taxNo: string;
    mail: string;
    phone: string;
    siteUrl: string;
  }>>;
}

export default function Personal({ favorites, setFavorites, orgProfile, setOrgProfile }: PersonalProps) {
  const [activeTab, setActiveTab] = useState<'favorites' | 'tiers' | 'profile'>('favorites');
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile edit state templates
  const [editForm, setEditForm] = useState({ ...orgProfile });

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setOrgProfile({ ...editForm });
    setIsEditing(false);
    alert('📝 企业资质与法人登记卡更新成功！');
  };

  return (
    <div id="procurement-personal" className="space-y-6">
      {/* Sub tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'favorites' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          收藏商品
        </button>
        <button
          onClick={() => setActiveTab('tiers')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'tiers' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          会员等级
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'profile' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          信息中心 (企业档案)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: FAVORITES PRODUCTS */}
        {activeTab === 'favorites' && (
          <motion.div
            key="favs-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-800 text-sm">关注协议供应商及办公爆款单品</h3>
              <p className="text-xs text-slate-400">将经常回购的物资加入该清单，便于在采购工作台或询价发布一键匹配参考。</p>
            </div>

            {favorites.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                当前尚无录入的备选收藏。
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((fav) => (
                  <div key={fav.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all flex gap-3.5 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                        <img 
                          src={fav.image} 
                          alt={fav.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5 pr-2">
                        <h4 className="font-bold text-slate-800 text-xs tracking-tight line-clamp-1">{fav.name}</h4>
                        <p className="text-[10px] text-slate-400">主要供应：{fav.supplier}</p>
                        <p className="text-[10px] font-bold text-rose-500 font-mono">平台协议价：¥{fav.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveFavorite(fav.id)}
                      className="text-slate-300 hover:text-rose-600 transition-colors shrink-0 p-1 bg-white hover:bg-slate-100 border border-slate-100 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 2: VIP MEMBER TIERS AND DETAILS */}
        {activeTab === 'tiers' && (
          <motion.div
            key="tiers-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Visual levels overview card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* LV1 */}
              <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <span className="text-slate-300 font-extrabold text-[28px] absolute right-4 top-2 select-none">L1</span>
                <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded">普通企业会员</span>
                <h4 className="font-bold text-slate-700 text-xs">青铜专席</h4>
                <p className="text-[11px] text-slate-400">年采购额 10w 以内。支持标准对账及标准发票开具服务，在线客服专席随时响应。</p>
              </div>

              {/* LV2 */}
              <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <span className="text-slate-300 font-extrabold text-[28px] absolute right-4 top-2 select-none">L2</span>
                <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded">中型企业商盟</span>
                <h4 className="font-bold text-slate-700 text-xs">白银卡位</h4>
                <p className="text-[11px] text-slate-400">年采购额 10w ~ 50w。提供全网物流包邮特免，对账闪电直出，支持小额度授信。</p>
              </div>

              {/* LV3 - Current Active */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2 relative overflow-hidden ring-2 ring-amber-500/10">
                <Crown className="w-6 h-6 text-amber-500 fill-amber-500 absolute right-4 top-4" />
                <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded">黄金VIP专享 (当前)</span>
                <h4 className="font-bold text-amber-800 text-xs">卓越黄金智采账号</h4>
                <p className="text-[11px] text-amber-600/80 leading-relaxed">
                  年采购额 50w ~ 200w。专属高管客户经理、无抵押 <strong>¥50w</strong> 绿色挂账授信。增值税闪电开票及售后无因闪赔。
                </p>
              </div>

              {/* LV4 */}
              <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-xl p-4 space-y-2 relative overflow-hidden shadow">
                <span className="text-slate-800 font-extrabold text-[28px] absolute right-4 top-2 select-none">L4</span>
                <span className="bg-blue-500/20 text-blue-300 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-500/10">旗舰最终阶等级</span>
                <h4 className="font-bold text-blue-200 text-xs">至尊铂金政企商盟</h4>
                <p className="text-[11px] text-slate-300">采购规模突破 300w。专属商务法务支持公账协议定制，免审先行出票，全年度1%无门槛现金折扣返点。</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: SYSTEM PROFILE SETTING */}
        {activeTab === 'profile' && (
          <motion.div
            key="profile-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-semibold text-slate-800 text-sm">企业法定资质及主体联系人</h3>
              {!isEditing && (
                <button
                  onClick={() => { setIsEditing(true); setEditForm({ ...orgProfile }); }}
                  className="bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  编辑修改资质
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.form 
                  key="edit-form" 
                  onSubmit={handleUpdateProfile} 
                  className="space-y-4 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">企业/机构官方注册全称</label>
                      <input
                        type="text"
                        required
                        value={editForm.orgName}
                        onChange={(e) => setEditForm({ ...editForm, orgName: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">法定代表人姓名</label>
                      <input
                        type="text"
                        required
                        value={editForm.legalRep}
                        onChange={(e) => setEditForm({ ...editForm, legalRep: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">统一信用识别代码 / 统一税号</label>
                      <input
                        type="text"
                        required
                        value={editForm.taxNo}
                        onChange={(e) => setEditForm({ ...editForm, taxNo: e.target.value })}
                        className="w-full p-2 border rounded-lg font-mono text-slate-600"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">采购主控对接人邮箱</label>
                      <input
                        type="email"
                        required
                        value={editForm.mail}
                        onChange={(e) => setEditForm({ ...editForm, mail: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">采购热线电话</label>
                      <input
                        type="text"
                        required
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">企业官网/门户网址</label>
                      <input
                        type="text"
                        required
                        value={editForm.siteUrl}
                        onChange={(e) => setEditForm({ ...editForm, siteUrl: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border rounded-lg text-slate-550 hover:bg-slate-50 font-bold"
                    >
                      放弃
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-slate-800 text-white hover:bg-slate-700 rounded-lg font-bold shadow-sm transition-colors"
                    >
                      保存更新资料
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="read-view" 
                  className="space-y-4 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <Building className="w-5 h-5 text-[#2563eb] shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">企业名称</span>
                        <p className="font-bold text-slate-800">{orgProfile.orgName}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <User className="w-5 h-5 text-[#2563eb] shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">法定代表人</span>
                        <p className="font-bold text-slate-800">{orgProfile.legalRep}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <Building className="w-5 h-5 text-[#2563eb] shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">18位信誉社会主体代码</span>
                        <p className="font-bold text-slate-800 font-mono">{orgProfile.taxNo}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#2563eb] shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">系统绑定邮箱</span>
                        <p className="font-bold text-slate-800 font-mono">{orgProfile.mail}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">绑定对账电话</span>
                        <p className="font-bold text-slate-800 font-mono">{orgProfile.phone}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[#2563eb] shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">注册官方域名</span>
                        <p className="font-bold text-slate-800 font-mono">{orgProfile.siteUrl}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
