/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/app/Dashboard';
import AbsensiKaryawan from './pages/app/AbsensiKaryawan';
import AbsensiSiswa from './pages/app/AbsensiSiswa';
import RekapAbsensi from './pages/app/RekapAbsensi';
import DataSiswa from './pages/app/DataSiswa';
import UserManagement from './pages/app/UserManagement';
import { UserProfile } from './types';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated auth check
    try {
      const savedUser = localStorage.getItem('smk_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to parse saved user:', e);
      localStorage.removeItem('smk_user');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={(u) => setUser(u)} />} />

        {/* Protected App Routes */}
        <Route
          path="/app"
          element={
            user ? (
              <AppLayout user={user} onLogout={() => {
                setUser(null);
                localStorage.removeItem('smk_user');
              }} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Dashboard user={user!} />} />
          <Route path="absensi-karyawan" element={<AbsensiKaryawan user={user!} />} />
          
          {(user?.role === 'admin' || user?.role === 'guru') && (
            <>
              <Route path="absensi-siswa" element={<AbsensiSiswa user={user!} />} />
              <Route path="rekap" element={<RekapAbsensi user={user!} />} />
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Route path="data-siswa" element={<DataSiswa />} />
              <Route path="users" element={<UserManagement />} />
            </>
          )}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

