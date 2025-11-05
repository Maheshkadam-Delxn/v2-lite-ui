// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// // Create the AuthContext
// const AuthContext = createContext();

// // AuthProvider component to wrap around your app
// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);

//   // Load token and user from sessionStorage on mount
//   useEffect(() => {
//     const storedToken = sessionStorage.getItem('token');
//     const storedUser = sessionStorage.getItem('user');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Function to handle login and store token/user
//   const login = (token, user) => {
//     sessionStorage.setItem('token', token);
//     sessionStorage.setItem('user', JSON.stringify(user));
//     setToken(token);
//     setUser(user);
//   };

//   // Function to handle logout
//   const logout = () => {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('user');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load token and user from sessionStorage on mount
  useEffect(() => {
    refreshAuth();
  }, []);

  // Helper to refresh state from sessionStorage
  const refreshAuth = () => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    setToken(storedToken || null);
    try {
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error('Invalid user data in sessionStorage:', error);
      setUser(null);
      sessionStorage.removeItem('user');
    }
  };

  // Function to handle login and store token/user
  const login = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);

    //redirectBasedOnRole(user);
  };

  // const redirectBasedOnRole = (user) =>{
  //   if(!user || !user.role){
  //     router.push('/login');
  //     return;
  //   }

  //   switch(user.role.toLowerCase()){
  //     case 'member':
  //       router.push('/member')
  //       break;
  //     case 'admin':
  //       router.push('/admin');
  //       break;
  //     case 'superadmin':
  //       router.push('/admin');
  //       break;
  //     case 'customer':
  //       router.push('/customer');
  //       break;
  //     default:
  //       router.push('/login');
  //   }
  // }

  // Function to handle logout
  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // Redirect to login page
    router.replace('/login'); // Use replace to avoid history pollution
  };

  const hasRole = (role) =>{
    return user?.role?.toLowerCase() === role?.toLowerCase();
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};