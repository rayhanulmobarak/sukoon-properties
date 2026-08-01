import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, ProductMode } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  productMode: ProductMode;
  setProductMode: (mode: ProductMode) => void;
  login: (email: string, phone: string, role?: UserRole) => void;
  register: (name: string, email: string, phone: string, companyName?: string, role?: UserRole) => void;
  logout: () => void;
  toggleWishlist: (propertyId: string) => void;
  toggleSaved: (propertyId: string) => void;
  isWishlisted: (propertyId: string) => boolean;
  isSaved: (propertyId: string) => boolean;
  otpRequested: boolean;
  requestOtp: (phoneOrEmail: string) => void;
  verifyOtp: (code: string) => boolean;
}

const defaultUser: User = {
  id: 'usr_001',
  name: 'Rayhanul Mobarak (Director)',
  email: 'sukoonpropertiesltd@gmail.com',
  phone: '+880 1913-780386',
  role: 'super_admin',
  verifiedEmail: true,
  verifiedPhone: true,
  wishlist: ['prop_001', 'prop_003'],
  savedProperties: ['prop_002'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [role, setRoleState] = useState<UserRole>('super_admin');
  const [productMode, setProductMode] = useState<ProductMode>('website');
  const [otpRequested, setOtpRequested] = useState(false);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const login = (email: string, phone: string, assignedRole: UserRole = 'customer') => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0] || 'Sukoon Client',
      email,
      phone: phone || '+880 1700-000000',
      role: assignedRole,
      verifiedEmail: true,
      verifiedPhone: true,
      wishlist: [],
      savedProperties: [],
    };
    setUser(newUser);
    setRoleState(assignedRole);
  };

  const register = (
    name: string,
    email: string,
    phone: string,
    companyName?: string,
    assignedRole: UserRole = 'customer'
  ) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: companyName ? `${name} (${companyName})` : name,
      email,
      phone: phone || '+880 1700-000000',
      role: assignedRole,
      verifiedEmail: true,
      verifiedPhone: true,
      wishlist: [],
      savedProperties: [],
    };
    setUser(newUser);
    setRoleState(assignedRole);
  };

  const logout = () => {
    setUser(null);
    setRoleState('customer');
  };

  const toggleWishlist = (propertyId: string) => {
    if (!user) return;
    const exists = user.wishlist.includes(propertyId);
    const updated = exists
      ? user.wishlist.filter((id) => id !== propertyId)
      : [...user.wishlist, propertyId];
    setUser({ ...user, wishlist: updated });
  };

  const toggleSaved = (propertyId: string) => {
    if (!user) return;
    const exists = user.savedProperties.includes(propertyId);
    const updated = exists
      ? user.savedProperties.filter((id) => id !== propertyId)
      : [...user.savedProperties, propertyId];
    setUser({ ...user, savedProperties: updated });
  };

  const isWishlisted = (propertyId: string) => {
    return user ? user.wishlist.includes(propertyId) : false;
  };

  const isSaved = (propertyId: string) => {
    return user ? user.savedProperties.includes(propertyId) : false;
  };

  const requestOtp = (phoneOrEmail: string) => {
    setOtpRequested(true);
  };

  const verifyOtp = (code: string) => {
    if (code === '1234' || code.length === 4) {
      setOtpRequested(false);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        productMode,
        setProductMode,
        login,
        register,
        logout,
        toggleWishlist,
        toggleSaved,
        isWishlisted,
        isSaved,
        otpRequested,
        requestOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
