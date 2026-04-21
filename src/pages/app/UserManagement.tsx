import { useState } from 'react';
import { Plus, UserPlus, Shield, Edit, Trash, Mail, Search } from 'lucide-react';
import { UserProfile } from '../../types';

const mockUsers: UserProfile[] = [
  { uid: '1', name: 'Super Admin', email: 'admin@smk.id', role: 'admin', createdAt: new Date() },
  { uid: '2', name: 'Pak Budi', email: 'guru@smk.id', role: 'guru', createdAt: new Date() },
  { uid: '3', name: 'Siti Rahma', email: 'staf@smk.id', role: 'staf', createdAt: new Date() },
];

export default function UserManagement() {
  const [users] = useState<UserProfile[]>(mockUsers);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-gray-500 mt-1">Kelola akun Admin, Guru, dan Staf kependidikan.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Tambah User Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.uid} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2">
                <button className="p-2 bg-gray-50 text-gray-400 hover:text-primary rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{user.name}</h3>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <Shield className="w-3 h-3 text-primary" />
                  {user.role}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest italic">Aktif</span>
              <button className="text-xs font-bold text-primary hover:underline">
                Reset Password
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
