import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VisitorProfile, Order, SiteSettings, MomoVariety, ToastMessage } from './types';
import { MOMO_VARIETIES } from './data';

// Default initial order leads for the Admin Tracker
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
    businessName: 'Royal Momo Corner',
    contactName: 'Vikram Das',
    phone: '+91 98310 98765',
    location: 'Gariahat, Kolkata',
    shopType: 'Momo Stall',
    requirements: '300 pcs Classic Veg Steamed Momo, 200 pcs Premium Chicken Steamed Momo',
    estimatedTotal: 2200,
    status: 'New'
  },
  {
    id: 'ORD-1002',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
    businessName: 'Byte & Bite Cafe',
    contactName: 'Pooja Roy',
    phone: '+91 98301 44321',
    location: 'Salt Lake Sector 5, Kolkata',
    shopType: 'Cafe',
    requirements: '500 pcs Gondhoraj Lime Chicken Momo, 200 pcs Sweet Corn & Cheese',
    estimatedTotal: 4200,
    status: 'Confirmed'
  },
  {
    id: 'ORD-1003',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
    businessName: 'Howrah Hub Cloud Kitchen',
    contactName: 'Sanjay Ghosh',
    phone: '+91 70012 33445',
    location: 'Howrah Maidan, Howrah',
    shopType: 'Cloud Kitchen',
    requirements: '1000 pcs Premium Chicken Steamed Momo (Daily recurring order)',
    estimatedTotal: 5000,
    status: 'Out for Delivery'
  },
  {
    id: 'ORD-1004',
    createdAt: new Date(Date.now() - 1000 * 60 * 1440).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
    businessName: 'Park Street Bistro',
    contactName: 'Amitabha Mukherjee',
    phone: '+91 98300 55667',
    location: 'Park Street, Kolkata',
    shopType: 'Restaurant',
    requirements: '400 pcs Rich Paneer Steamed, 400 pcs Hot Schezwan Chicken',
    estimatedTotal: 4200,
    status: 'Completed'
  }
];

const DEFAULT_SETTINGS: SiteSettings = {
  companyName: 'TrySS Wholesale',
  phone: '+91 70038 37512',
  address: 'Kasba / Tiljala Commercial Industrial Zone, Kolkata, West Bengal 700039',
  fssaiNumber: '12824999000104',
  defaultBrandColor: '#dc2626',
  supportEmail: 'support@trysswholesale.com'
};

const DEFAULT_PROFILE: VisitorProfile = {
  businessName: '',
  contactName: '',
  phone: '',
  address: '',
  brandColor: '#dc2626',
  submittedAt: null
};

// 3 Hours in milliseconds (3 * 60 * 60 * 1000 = 10,800,000)
export const SESSION_DURATION_MS = 3 * 60 * 60 * 1000;

interface AppContextType {
  visitorProfile: VisitorProfile;
  siteSettings: SiteSettings;
  momoVarieties: MomoVariety[];
  orders: Order[];
  toasts: ToastMessage[];
  isOnboardingOpen: boolean;
  isAdminOpen: boolean;
  isAdminAuthenticated: boolean;
  remainingTimeFormatted: string;
  hasActiveSession: boolean;
  
  // Actions
  updateVisitorProfile: (profile: Partial<VisitorProfile>) => void;
  resetVisitorSession: (isManualReset?: boolean) => void;
  setIsOnboardingOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  
  // Catalog actions
  addMomoVariety: (item: MomoVariety) => void;
  updateMomoVariety: (id: string, updated: Partial<MomoVariety>) => void;
  deleteMomoVariety: (id: string) => void;
  resetCatalog: () => void;
  
  // Order actions
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  clearOrders: () => void;
  
  // Settings actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetAllData: () => void;
  
  // Toasts
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  
  // Share link generator
  getShareableDemoUrl: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function hexToRgb(hex: string): string {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return '220, 38, 38';
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visitorProfile, setVisitorProfile] = useState<VisitorProfile>(() => {
    // Check URL token first
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');
      if (token) {
        const decoded = JSON.parse(atob(token));
        if (decoded.businessName) {
          return {
            ...DEFAULT_PROFILE,
            ...decoded,
            submittedAt: Date.now()
          };
        }
      }
      // Check query params
      const bName = searchParams.get('bName');
      if (bName) {
        return {
          businessName: bName,
          contactName: searchParams.get('cName') || '',
          phone: searchParams.get('phone') || '',
          address: searchParams.get('addr') || '',
          brandColor: searchParams.get('color') || '#dc2626',
          submittedAt: Date.now()
        };
      }
    } catch (e) {
      console.warn('Could not parse share token from URL:', e);
    }

    // Check localStorage
    const saved = localStorage.getItem('tryss_visitor_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.submittedAt) {
          // Check if expired
          if (Date.now() - parsed.submittedAt >= SESSION_DURATION_MS) {
            localStorage.removeItem('tryss_visitor_profile');
            return DEFAULT_PROFILE;
          }
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing visitor profile:', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('tryss_site_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_SETTINGS;
  });

  const [momoVarieties, setMomoVarieties] = useState<MomoVariety[]>(() => {
    const saved = localStorage.getItem('tryss_momo_varieties');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOMO_VARIETIES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('tryss_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ORDERS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [remainingTimeFormatted, setRemainingTimeFormatted] = useState<string>('');

  // Auto-open modal on visit/refresh if no active session or if forced
  useEffect(() => {
    // If hash is #/admin, open admin panel
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      setIsAdminOpen(true);
    }

    // Pop up onboarding modal on every visit / refresh
    setIsOnboardingOpen(true);
  }, []);

  // Sync brand color CSS variables
  useEffect(() => {
    const activeColor = visitorProfile.brandColor || siteSettings.defaultBrandColor || '#dc2626';
    const rgb = hexToRgb(activeColor);
    document.documentElement.style.setProperty('--brand-color', activeColor);
    document.documentElement.style.setProperty('--brand-color-rgb', rgb);
  }, [visitorProfile.brandColor, siteSettings.defaultBrandColor]);

  // Persist visitor profile
  useEffect(() => {
    if (visitorProfile.submittedAt) {
      localStorage.setItem('tryss_visitor_profile', JSON.stringify(visitorProfile));
    } else {
      localStorage.removeItem('tryss_visitor_profile');
    }
  }, [visitorProfile]);

  // Persist site settings
  useEffect(() => {
    localStorage.setItem('tryss_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Persist momo varieties
  useEffect(() => {
    localStorage.setItem('tryss_momo_varieties', JSON.stringify(momoVarieties));
  }, [momoVarieties]);

  // Persist orders
  useEffect(() => {
    localStorage.setItem('tryss_orders', JSON.stringify(orders));
  }, [orders]);

  // 3-Hour Auto-Reset Background Timer Polling
  useEffect(() => {
    const interval = setInterval(() => {
      if (visitorProfile.submittedAt) {
        const elapsed = Date.now() - visitorProfile.submittedAt;
        const remainingMs = SESSION_DURATION_MS - elapsed;

        if (remainingMs <= 0) {
          // Time expired! Reset visitor session
          resetVisitorSession(false);
          addToast("🕒 3 hours completed! Your form was reset automatically. Please enter your details.", "warning");
          setIsOnboardingOpen(true);
        } else {
          // Format remaining time
          const totalSeconds = Math.floor(remainingMs / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          
          if (hours > 0) {
            setRemainingTimeFormatted(`${hours}h ${minutes}m`);
          } else if (minutes > 0) {
            setRemainingTimeFormatted(`${minutes}m ${seconds}s`);
          } else {
            setRemainingTimeFormatted(`${seconds}s`);
          }
        }
      } else {
        setRemainingTimeFormatted('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [visitorProfile.submittedAt]);

  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateVisitorProfile = (profile: Partial<VisitorProfile>) => {
    const updated: VisitorProfile = {
      ...visitorProfile,
      ...profile,
      submittedAt: Date.now()
    };
    setVisitorProfile(updated);
    addToast(`🎉 Demo profile updated for ${updated.businessName || 'your business'}!`, 'success');
  };

  const resetVisitorSession = (isManualReset = true) => {
    setVisitorProfile(DEFAULT_PROFILE);
    localStorage.removeItem('tryss_visitor_profile');
    if (isManualReset) {
      addToast("🔄 Visitor branding reset to factory defaults.", "info");
    }
  };

  const loginAdmin = (passcode: string): boolean => {
    if (passcode === '1234') {
      setIsAdminAuthenticated(true);
      addToast("🔓 Welcome, Executive Admin!", "success");
      return true;
    } else {
      addToast("❌ Invalid passcode! Default PIN is 1234", "error");
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    addToast("🔒 Logged out of Admin Console.", "info");
  };

  const addMomoVariety = (item: MomoVariety) => {
    setMomoVarieties(prev => [item, ...prev]);
    addToast(`Added new variety: ${item.name}`, 'success');
  };

  const updateMomoVariety = (id: string, updated: Partial<MomoVariety>) => {
    setMomoVarieties(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    addToast(`Updated product details for ${updated.name || 'item'}`, 'success');
  };

  const deleteMomoVariety = (id: string) => {
    setMomoVarieties(prev => prev.filter(m => m.id !== id));
    addToast(`Product removed from catalog`, 'info');
  };

  const resetCatalog = () => {
    setMomoVarieties(MOMO_VARIETIES);
    addToast(`Catalog reset to factory defaults`, 'info');
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'New'
    };
    setOrders(prev => [newOrder, ...prev]);
    addToast(`🚀 Inquiry/Order submitted for ${orderData.businessName}!`, 'success');
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    addToast(`Order ${id} marked as ${status}`, 'info');
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    addToast(`Order ${id} deleted`, 'info');
  };

  const clearOrders = () => {
    setOrders([]);
    addToast(`Cleared all order records`, 'info');
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
    addToast(`Global site settings updated`, 'success');
  };

  const resetAllData = () => {
    setVisitorProfile(DEFAULT_PROFILE);
    setSiteSettings(DEFAULT_SETTINGS);
    setMomoVarieties(MOMO_VARIETIES);
    setOrders(INITIAL_ORDERS);
    localStorage.clear();
    addToast(`🧹 Factory reset complete! All session data flushed.`, 'warning');
  };

  const getShareableDemoUrl = (): string => {
    const profileData = {
      businessName: visitorProfile.businessName,
      contactName: visitorProfile.contactName,
      phone: visitorProfile.phone,
      address: visitorProfile.address,
      brandColor: visitorProfile.brandColor
    };
    const token = btoa(JSON.stringify(profileData));
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?token=${token}`;
  };

  const hasActiveSession = Boolean(visitorProfile.submittedAt && (Date.now() - visitorProfile.submittedAt < SESSION_DURATION_MS));

  return (
    <AppContext.Provider value={{
      visitorProfile,
      siteSettings,
      momoVarieties,
      orders,
      toasts,
      isOnboardingOpen,
      isAdminOpen,
      isAdminAuthenticated,
      remainingTimeFormatted,
      hasActiveSession,
      updateVisitorProfile,
      resetVisitorSession,
      setIsOnboardingOpen,
      setIsAdminOpen,
      loginAdmin,
      logoutAdmin,
      addMomoVariety,
      updateMomoVariety,
      deleteMomoVariety,
      resetCatalog,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      clearOrders,
      updateSiteSettings,
      resetAllData,
      addToast,
      removeToast,
      getShareableDemoUrl
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
