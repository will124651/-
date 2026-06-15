import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TodoItem, MessageItem } from '../types';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  TrendingUp, 
  MessageSquare, 
  Bell, 
  Clock, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  ShieldAlert,
  ChevronRight,
  Filter
} from 'lucide-react';

interface WorkbenchProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  messages: MessageItem[];
  setMessages: React.Dispatch<React.SetStateAction<MessageItem[]>>;
  totalOrdersAmount: number;
}

export default function Workbench({ todos, setTodos, messages, setMessages, totalOrdersAmount }: WorkbenchProps) {
  const [activeTab, setActiveTab] = useState<'todo' | 'stats' | 'messages'>('todo');
  
  // Todo States
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTodoCategory, setNewTodoCategory] = useState('业务代办');
  const [todoFilter, setTodoFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Add Todo Handler
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    const newTodo: TodoItem = {
      id: `T-${Math.floor(100 + Math.random() * 900)}`,
      title: newTodoTitle,
      category: newTodoCategory,
      priority: newTodoPriority,
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days layout
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTodos([newTodo, ...todos]);
    setNewTodoTitle('');
  };

  // Toggle Todo Handler
  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Delete Todo Handler
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (todoFilter === 'pending') return !t.completed;
    if (todoFilter === 'completed') return t.completed;
    return true;
  });

  // Message Handlers
  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleMarkAllRead = () => {
    setMessages(messages.map(m => ({ ...m, read: true })));
  };

  return (
    <div id="procurement-workbench" className="space-y-6">
      {/* Visual Header Grid for quick snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div 
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between"
          whileHover={{ y: -2 }}
        >
          <div>
            <p className="text-xs text-slate-500 font-medium">代办未完项</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {todos.filter(t => !t.completed).length} <span className="text-xs font-normal text-slate-400">个任务</span>
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563eb]">
            <CheckSquare className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between"
          whileHover={{ y: -2 }}
        >
          <div>
            <p className="text-xs text-slate-500 font-medium">系统总采购额</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">
              ¥{totalOrdersAmount.toLocaleString()} <span className="text-xs font-normal text-slate-400">元</span>
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between"
          whileHover={{ y: -2 }}
        >
          <div>
            <p className="text-xs text-slate-500 font-medium">未读消息通知</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">
              {messages.filter(m => !m.read).length} <span className="text-xs font-normal text-slate-400">条未读</span>
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Bell className="w-6 h-6 animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Sub Navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('todo')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'todo'
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          待办列表
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'stats'
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          数据统计
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          消息中心
          {messages.filter(m => !m.read).length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {messages.filter(m => !m.read).length}
            </span>
          )}
        </button>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'todo' && (
          <motion.div
            key="todo-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left side: Add Todo form */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4 h-fit">
              <h3 className="font-semibold text-slate-800 text-base">发布新代办任务</h3>
              <form onSubmit={handleAddTodo} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1 font-medium">任务描述 / 事项标题</label>
                  <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="请输入需要跟进的采购事宜..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1 font-medium">优先级</label>
                    <select
                      value={newTodoPriority}
                      onChange={(e) => setNewTodoPriority(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="low">低 (Green)</option>
                      <option value="medium">中 (Yellow)</option>
                      <option value="high">高 (Red)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1 font-medium">所属分类</label>
                    <select
                      value={newTodoCategory}
                      onChange={(e) => setNewTodoCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="订单审批">订单审批</option>
                      <option value="询价发布">询价发布</option>
                      <option value="对账确认">对账确认</option>
                      <option value="售后申请">售后申请</option>
                      <option value="财务付款">财务付款</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563eb] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5 shadow-sm border-none"
                >
                  <Plus className="w-4 h-4" />
                  新增待办项
                </button>
              </form>
            </div>

            {/* Right side: Todo list */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800 text-base">待办事宜追踪</h3>
                <div className="flex gap-2 text-xs">
                  {(['all', 'pending', 'completed'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTodoFilter(filter)}
                      className={`px-2.5 py-1 rounded-md font-medium capitalize transition-colors ${
                        todoFilter === filter
                          ? 'bg-[#2563eb] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {filter === 'all' ? '全部' : filter === 'pending' ? '未处理' : '已归档'}
                    </button>
                  ))}
                </div>
              </div>

              {filteredTodos.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  没有找到符合过滤条件的待办事项
                </div>
              ) : (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {filteredTodos.map((todo) => {
                    const priorityStyles = 
                      todo.priority === 'high' 
                        ? 'bg-rose-50 border-rose-100 text-rose-700' 
                        : todo.priority === 'medium'
                        ? 'bg-amber-50 border-amber-100 text-amber-700'
                        : 'bg-emerald-50 border-emerald-100 text-emerald-700';

                    return (
                      <motion.div
                        key={todo.id}
                        layoutId={`todo-card-${todo.id}`}
                        className={`p-3.5 border rounded-xl flex items-start justify-between gap-3 transition-colors ${
                          todo.completed ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-white border-slate-100'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button 
                            type="button"
                            onClick={() => handleToggleTodo(todo.id)}
                            className="mt-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {todo.completed ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-300" />
                            )}
                          </button>
                          <div className="space-y-1">
                            <p className={`text-sm font-medium ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                              {todo.title}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className={`px-2 py-0.5 border rounded text-[10px] font-bold uppercase ${priorityStyles}`}>
                                {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                              </span>
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-500">
                                {todo.category}
                              </span>
                              <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                                <Clock className="w-3 h-3" />
                                截止日期: {todo.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            key="stats-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Visual Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Line Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">近半年采购合同金额汇总趋势</h3>
                    <p className="text-xs text-slate-400 mt-0.5">统计范围：全品类企业批量采购单</p>
                  </div>
                  <span className="bg-blue-50 text-[#2563eb] text-xs px-2.5 py-1 rounded-full font-semibold">
                    +15.2% 同比
                  </span>
                </div>

                {/* Handmade beautiful SVG line graph */}
                <div className="h-64 relative w-full pt-4">
                  <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                    {/* Gridlines */}
                    <line x1="40" y1="20" x2="580" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4"/>
                    <line x1="40" y1="70" x2="580" y2="70" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4"/>
                    <line x1="40" y1="120" x2="580" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4"/>
                    <line x1="40" y1="170" x2="580" y2="170" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4"/>
                    
                    {/* Y-Axis Value Labels */}
                    <text x="5" y="25" className="text-[10px] fill-slate-400 font-mono">¥200k</text>
                    <text x="5" y="75" className="text-[10px] fill-slate-400 font-mono">¥150k</text>
                    <text x="5" y="125" className="text-[10px] fill-slate-400 font-mono">¥100k</text>
                    <text x="5" y="175" className="text-[10px] fill-slate-400 font-mono">¥50k</text>

                    {/* Gradient Area Fill */}
                    <path
                      d="M 40,220 L 40,170 Q 148,150 148,160 T 256,120 T 364,180 T 472,110 T 580,75 L 580,220 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* Polyline line representation */}
                    <path
                      d="M 40,170 Q 148,150 148,160 T 256,120 T 364,180 T 472,110 T 580,75"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Hotspots / Dots on line */}
                    <circle cx="40" cy="170" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                    <circle cx="148" cy="160" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                    <circle cx="256" cy="120" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                    <circle cx="364" cy="180" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                    <circle cx="472" cy="110" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                    <circle cx="580" cy="75" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                  </svg>
                  
                  {/* X-Axis Labels */}
                  <div className="flex justify-between pl-8 pr-2 mt-2 text-[10px] text-slate-400 font-medium">
                    <span>1月</span>
                    <span>2月</span>
                    <span>3月</span>
                    <span>4月</span>
                    <span>5月</span>
                    <span>6月 (当前)</span>
                  </div>
                </div>
              </div>

              {/* Categorization & Efficiency Gauges */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">采购品类占比及综合效能</h3>
                  <p className="text-xs text-slate-400 mt-0.5">多维采购分析指标</p>
                </div>

                <div className="space-y-4">
                  {/* Category Progress lines */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">数码办公设备</span>
                      <span className="font-semibold text-slate-600">62% (¥11.9万)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2563eb] h-full rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">员工福利采购</span>
                      <span className="font-semibold text-slate-600">23% (¥4.5万)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">办公家具 & 基建采购</span>
                      <span className="font-semibold text-slate-600">15% (¥2.5万)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Key performance highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-medium">询价成交比</p>
                    <h4 className="text-base font-bold text-slate-800 mt-0.5">88.5%</h4>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-medium">准时交期率</p>
                    <h4 className="text-base font-bold text-emerald-600 mt-0.5">99.2%</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* General Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-50/25 rounded-xl p-4 border border-blue-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2563eb] text-white rounded-lg flex items-center justify-center font-bold">A</div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-700">最快交期商</h4>
                  <p className="text-[11px] text-slate-500">秋叶原线缆 (2天送达)</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold">B</div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-700">最高性价比</h4>
                  <p className="text-[11px] text-slate-500">五芳斋团标优惠价</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 text-white rounded-lg flex items-center justify-center font-bold">C</div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-700">待审批订单额</h4>
                  <p className="text-[11px] text-slate-500">PO-20260601 (¥12万)</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 text-white rounded-lg flex items-center justify-center font-bold">D</div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-700">累积返金信用</h4>
                  <p className="text-[11px] text-slate-500">当前返还 ¥3,200 额度</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div
            key="messages-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-800 text-base">系统消息 & 交易通告</h3>
              <button 
                onClick={handleMarkAllRead}
                className="text-xs text-[#2563eb] hover:text-blue-800 font-medium transition-colors"
              >
                全部标为已读
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm">
                消息中心空空如也，太棒了！
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => {
                  let badgeColor = '';
                  let badgeText = '';
                  if (msg.type === 'order') { badgeColor = 'bg-blue-50 border-blue-100 text-blue-700'; badgeText = '订单'; }
                  else if (msg.type === 'inquiry') { badgeColor = 'bg-purple-50 border-purple-100 text-purple-700'; badgeText = '询价'; }
                  else if (msg.type === 'finance') { badgeColor = 'bg-rose-50 border-rose-100 text-rose-700'; badgeText = '财务'; }
                  else { badgeColor = 'bg-slate-100 border-slate-200 text-slate-600'; badgeText = '系统'; }

                  return (
                    <div 
                      key={msg.id}
                      className={`p-4 border rounded-xl flex items-start gap-4 transition-all ${
                        msg.read ? 'bg-slate-50/50 border-slate-100 opacity-75' : 'bg-white border-blue-100/50 shadow-sm'
                      }`}
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 border rounded-md text-[10px] font-bold ${badgeColor}`}>
                            {badgeText}
                          </span>
                          <span className={`text-sm font-semibold ${msg.read ? 'text-slate-600' : 'text-slate-800'}`}>
                            {msg.title}
                          </span>
                          {!msg.read && (
                            <span className="w-2 x-y h-2 rounded-full bg-rose-500"></span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {msg.content}
                        </p>
                        <div className="flex justify-between items-center text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {msg.time}
                          </span>
                          
                          <div className="flex gap-3">
                            {!msg.read && (
                              <button
                                onClick={() => handleMarkAsRead(msg.id)}
                                className="text-[#2563eb] hover:text-blue-800 font-medium"
                              >
                                标为已读
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-rose-500 hover:text-rose-700 font-medium"
                            >
                              删除记录
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
