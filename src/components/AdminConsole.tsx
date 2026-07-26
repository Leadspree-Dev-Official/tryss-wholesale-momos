import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { MomoVariety, Order } from '../types';
import { 
  Lock, KeyRound, LayoutDashboard, ShoppingBag, Settings, RefreshCw, 
  Plus, Edit, Trash2, CheckCircle2, Clock, Truck, ShieldAlert, X, 
  Search, ExternalLink, Save, LogOut, Check
} from 'lucide-react';

export default function AdminConsole() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    momoVarieties,
    addMomoVariety,
    updateMomoVariety,
    deleteMomoVariety,
    resetCatalog,
    orders,
    updateOrderStatus,
    deleteOrder,
    clearOrders,
    siteSettings,
    updateSiteSettings,
    resetAllData,
    resetVisitorSession,
    addToast
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'orders' | 'settings' | 'reset'>('orders');
  
  // Search & Filter States
  const [orderFilter, setOrderFilter] = useState<'All' | Order['status']>('All');
  const [orderSearch, setOrderSearch] = useState('');
  
  // Catalog Edit / Add Modal state
  const [editingItem, setEditingItem] = useState<MomoVariety | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemForm, setItemForm] = useState<Partial<MomoVariety>>({
    name: '',
    category: 'Veg',
    pricePerPcWholesale: 5,
    recommendedRetailPrice: 12,
    ingredients: '',
    packagingSize: 'Packet of 50 Pcs',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    isPopular: false
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(siteSettings);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(passcode);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMomoVariety(editingItem.id, itemForm);
      setEditingItem(null);
    } else if (isAddingItem) {
      const newItem: MomoVariety = {
        id: `custom-${Date.now()}`,
        name: itemForm.name || 'New Momo Variety',
        category: (itemForm.category as 'Veg' | 'Chicken' | 'Specialty') || 'Veg',
        pricePerPcWholesale: Number(itemForm.pricePerPcWholesale) || 5,
        recommendedRetailPrice: Number(itemForm.recommendedRetailPrice) || 12,
        ingredients: itemForm.ingredients || 'Fresh high-quality ingredients',
        packagingSize: itemForm.packagingSize || 'Packet of 50 Pcs',
        image: itemForm.image || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
        isPopular: Boolean(itemForm.isPopular)
      };
      addMomoVariety(newItem);
      setIsAddingItem(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = orderFilter === 'All' || o.status === orderFilter;
    const matchesSearch = o.businessName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.contactName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          o.location.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto text-white">
        
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 bg-gray-900 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-600 text-white font-black text-lg border border-amber-400">
              🔑
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Executive Portal</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                TrySS Wholesale Admin Control Console
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 border border-white/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Password Authentication Screen */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-8 space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Protected Admin Access</h3>
              <p className="text-xs text-gray-400 mt-1">
                Enter security passcode to manage live product catalog, track wholesale inquiries, and configure global settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="Enter Passcode (Default: 1234)"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  className="w-full bg-[#1e293b] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-mono text-center text-amber-400 placeholder-gray-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-mono">
                Hint: Passcode is <strong>1234</strong>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-600/30"
              >
                Unlock Console
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div>
            {/* Tab Navigation */}
            <div className="flex flex-wrap border-b border-white/10 bg-gray-900/50 px-6 pt-2 gap-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'orders'
                    ? 'border-red-500 text-red-400 bg-white/5 rounded-t-xl'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Orders & Inquiries</span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px]">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'content'
                    ? 'border-red-500 text-red-400 bg-white/5 rounded-t-xl'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Live Catalog Editor</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px]">
                  {momoVarieties.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'settings'
                    ? 'border-red-500 text-red-400 bg-white/5 rounded-t-xl'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Site Settings</span>
              </button>

              <button
                onClick={() => setActiveTab('reset')}
                className={`px-4 py-3 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all ml-auto ${
                  activeTab === 'reset'
                    ? 'border-amber-500 text-amber-400 bg-white/5 rounded-t-xl'
                    : 'border-transparent text-gray-400 hover:text-amber-400'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Demo Data</span>
              </button>
            </div>

            {/* Tab 1: Order Tracker */}
            {activeTab === 'orders' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Order Stats Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#1e293b] border border-white/10">
                    <span className="text-[10px] font-bold uppercase text-gray-400 block">Total Received</span>
                    <span className="text-xl font-black text-white">{orders.length} Leads</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    <span className="text-[10px] font-bold uppercase text-amber-400 block">New Requests</span>
                    <span className="text-xl font-black text-amber-400">
                      {orders.filter(o => o.status === 'New').length} New
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                    <span className="text-[10px] font-bold uppercase text-blue-400 block">Out for Delivery</span>
                    <span className="text-xl font-black text-blue-400">
                      {orders.filter(o => o.status === 'Out for Delivery').length} Active
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 block">Completed</span>
                    <span className="text-xl font-black text-emerald-400">
                      {orders.filter(o => o.status === 'Completed').length} Orders
                    </span>
                  </div>
                </div>

                {/* Filter and Search controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#1e293b] p-3 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                    {(['All', 'New', 'Confirmed', 'Out for Delivery', 'Completed'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setOrderFilter(status)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                          orderFilter === status
                            ? 'bg-red-600 text-white'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search business or location..."
                      value={orderSearch}
                      onChange={e => setOrderSearch(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-1.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Order Table */}
                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1e293b]">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-gray-900/80 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-white/10">
                      <tr>
                        <th className="p-3.5">ID / Date</th>
                        <th className="p-3.5">Business & Contact</th>
                        <th className="p-3.5">Shop & Location</th>
                        <th className="p-3.5">Order Requirements</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-500">
                            No orders found matching criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => (
                          <tr key={order.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-3.5 font-mono text-[11px]">
                              <span className="font-bold text-amber-400 block">{order.id}</span>
                              <span className="text-[10px] text-gray-500">{order.createdAt}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-bold text-white block">{order.businessName}</span>
                              <span className="text-gray-400 text-[11px] block">{order.contactName} ({order.phone})</span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 font-medium inline-block mb-1 text-[10px]">
                                {order.shopType}
                              </span>
                              <span className="text-gray-400 block text-[11px]">{order.location}</span>
                            </td>
                            <td className="p-3.5 max-w-xs">
                              <p className="text-gray-300 line-clamp-2 text-[11px]">{order.requirements}</p>
                              {order.estimatedTotal && (
                                <span className="text-amber-400 font-bold text-[10px] block mt-0.5">
                                  Est. Value: ₹{order.estimatedTotal.toLocaleString()}
                                </span>
                              )}
                            </td>
                            <td className="p-3.5">
                              <select
                                value={order.status}
                                onChange={e => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                className={`px-2.5 py-1 rounded-xl font-bold text-[11px] border focus:outline-none cursor-pointer ${
                                  order.status === 'New' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                  order.status === 'Confirmed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                  order.status === 'Out for Delivery' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                }`}
                              >
                                <option value="New" className="bg-gray-900 text-amber-400">New</option>
                                <option value="Confirmed" className="bg-gray-900 text-blue-400">Confirmed</option>
                                <option value="Out for Delivery" className="bg-gray-900 text-purple-400">Out for Delivery</option>
                                <option value="Completed" className="bg-gray-900 text-emerald-400">Completed</option>
                              </select>
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => deleteOrder(order.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                title="Delete Order"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={clearOrders}
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Order Records</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Catalog Content Editor */}
            {activeTab === 'content' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Wholesale Momo Catalog Items</h3>
                    <p className="text-xs text-gray-400">Edit prices, descriptions, images, or add custom momo varieties.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetCatalog}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 border border-white/10 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Catalog</span>
                    </button>
                    <button
                      onClick={() => {
                        setItemForm({
                          name: '',
                          category: 'Veg',
                          pricePerPcWholesale: 5,
                          recommendedRetailPrice: 12,
                          ingredients: '',
                          packagingSize: 'Packet of 50 Pcs',
                          image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
                          isPopular: false
                        });
                        setEditingItem(null);
                        setIsAddingItem(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Variety</span>
                    </button>
                  </div>
                </div>

                {/* Catalog Edit Modal / Drawer Form */}
                {(editingItem || isAddingItem) && (
                  <form onSubmit={handleSaveItem} className="p-5 rounded-2xl bg-[#1e293b] border border-amber-500/30 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-sm font-bold text-amber-400">
                        {editingItem ? `Edit Item: ${editingItem.name}` : 'Add New Momo Variety'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => { setEditingItem(null); setIsAddingItem(false); }}
                        className="text-gray-400 hover:text-white text-xs"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Momo Name</label>
                        <input
                          type="text"
                          required
                          value={itemForm.name || ''}
                          onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Category</label>
                        <select
                          value={itemForm.category || 'Veg'}
                          onChange={e => setItemForm({ ...itemForm, category: e.target.value as any })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white"
                        >
                          <option value="Veg">Veg</option>
                          <option value="Chicken">Chicken</option>
                          <option value="Specialty">Specialty</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Packaging Size</label>
                        <input
                          type="text"
                          value={itemForm.packagingSize || ''}
                          onChange={e => setItemForm({ ...itemForm, packagingSize: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Wholesale Price (₹ / Pc)</label>
                        <input
                          type="number"
                          step="0.25"
                          required
                          value={itemForm.pricePerPcWholesale || 4}
                          onChange={e => setItemForm({ ...itemForm, pricePerPcWholesale: parseFloat(e.target.value) })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-amber-400 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Retail Rec. Price (₹ / Pc)</label>
                        <input
                          type="number"
                          step="0.5"
                          required
                          value={itemForm.recommendedRetailPrice || 10}
                          onChange={e => setItemForm({ ...itemForm, recommendedRetailPrice: parseFloat(e.target.value) })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Popularity Tag</label>
                        <label className="flex items-center gap-2 mt-2 text-xs text-gray-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(itemForm.isPopular)}
                            onChange={e => setItemForm({ ...itemForm, isPopular: e.target.checked })}
                            className="rounded border-white/10 bg-black/40 text-red-600 focus:ring-0"
                          />
                          <span>Highlight as Popular</span>
                        </label>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Ingredients & Description</label>
                        <input
                          type="text"
                          value={itemForm.ingredients || ''}
                          onChange={e => setItemForm({ ...itemForm, ingredients: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-300 mb-1">Image URL</label>
                        <input
                          type="text"
                          value={itemForm.image || ''}
                          onChange={e => setItemForm({ ...itemForm, image: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => { setEditingItem(null); setIsAddingItem(false); }}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Product</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Momo Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {momoVarieties.map(item => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#1e293b] border border-white/10 flex gap-3 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            item.category === 'Veg' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {item.category}
                          </span>
                          <span className="text-xs font-black text-amber-400">₹{item.pricePerPcWholesale}/pc</span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-1">{item.name}</h4>
                        <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{item.ingredients}</p>
                        
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setItemForm(item);
                              setIsAddingItem(false);
                            }}
                            className="text-[10px] font-bold text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" /> Edit
                          </button>
                          <button
                            onClick={() => deleteMomoVariety(item.id)}
                            className="text-[10px] font-bold text-red-400 hover:underline flex items-center gap-1 ml-auto"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Site Settings */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto max-w-2xl mx-auto">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white">Global Factory & Business Settings</h3>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Supplier Company Name</label>
                    <input
                      type="text"
                      value={settingsForm.companyName}
                      onChange={e => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                      className="w-full bg-[#1e293b] border border-white/10 rounded-xl p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Official Helpline Phone</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full bg-[#1e293b] border border-white/10 rounded-xl p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Factory Location Address</label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full bg-[#1e293b] border border-white/10 rounded-xl p-3 text-sm text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">FSSAI License No.</label>
                      <input
                        type="text"
                        value={settingsForm.fssaiNumber}
                        onChange={e => setSettingsForm({ ...settingsForm, fssaiNumber: e.target.value })}
                        className="w-full bg-[#1e293b] border border-white/10 rounded-xl p-3 text-sm text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Support Email</label>
                      <input
                        type="text"
                        value={settingsForm.supportEmail}
                        onChange={e => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                        className="w-full bg-[#1e293b] border border-white/10 rounded-xl p-3 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Global Settings</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tab 4: Reset Demo Data */}
            {activeTab === 'reset' && (
              <div className="p-8 max-w-xl mx-auto space-y-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                  <RefreshCw className="w-7 h-7 animate-spin-slow" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Reset & Flush Demo Sessions</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Manage session cache, clear customized visitor branding, or restore factory defaults.
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="p-4 rounded-2xl bg-[#1e293b] border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white">Flush Active Visitor Branding Session</h4>
                      <p className="text-[11px] text-gray-400">Clears current visitor profile and triggers onboarding popup.</p>
                    </div>
                    <button
                      onClick={() => resetVisitorSession(true)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white shrink-0"
                    >
                      Clear Visitor Session
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1e293b] border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white">Reset Product Catalog to Factory</h4>
                      <p className="text-[11px] text-gray-400">Reverts all prices, momo items, and descriptions back to initial state.</p>
                    </div>
                    <button
                      onClick={resetCatalog}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white shrink-0"
                    >
                      Reset Catalog
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-red-400">Full Factory System Reset</h4>
                      <p className="text-[11px] text-red-300/70">Flushes all localStorage cache, order leads, custom products, and settings.</p>
                    </div>
                    <button
                      onClick={resetAllData}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-black text-white shrink-0 shadow-lg"
                    >
                      Factory Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
