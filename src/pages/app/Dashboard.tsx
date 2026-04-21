import { motion } from 'motion/react';
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  Calendar,
  Clock,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { UserProfile } from '../../types';

interface DashboardProps {
  user: UserProfile;
}

export default function Dashboard({ user }: DashboardProps) {
  const stats = [
    { label: 'Total Siswa', value: '1.240', info: '+12 New', icon: Users, color: 'text-gray-900' },
    { label: 'Guru & Staff', value: '85', info: 'Aktif', icon: UserCheck, color: 'text-gray-900' },
    { label: 'Kehadiran Siswa', value: '92%', info: 'Today', icon: GraduationCap, color: 'text-primary' },
    { label: 'Kehadiran Staff', value: '98%', info: 'Target: 100%', icon: TrendingUp, color: 'text-primary' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="geometric-card"
          >
            <p className="label-caps mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                stat.info.includes('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {stat.info}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Table Area */}
        <div className="lg:col-span-2 geometric-card !p-0 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Aktifitas Absensi Terbaru</h3>
            <button className="text-xs font-bold text-primary hover:underline">Lihat Semua</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 label-caps">Nama / NIS</th>
                  <th className="px-6 py-3 label-caps">Kelas/Unit</th>
                  <th className="px-6 py-3 label-caps">Status</th>
                  <th className="px-6 py-3 label-caps">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Andi Wijaya', id: '1022394', unit: 'XII TKJ 1', status: 'Hadir', statusColor: 'bg-green-100 text-green-700', time: '07:05:21' },
                  { name: 'Siti Aminah', id: 'Guru Bahasa', unit: 'Staff Pengajar', status: 'Hadir', statusColor: 'bg-green-100 text-green-700', time: '06:58:10' },
                  { name: 'Budi Santoso', id: '1022401', unit: 'XI DKV 3', status: 'Terlambat', statusColor: 'bg-yellow-100 text-yellow-700', time: '07:20:44' },
                  { name: 'Citra Dewi', id: '1022388', unit: 'X AKL 2', status: 'Sakit', statusColor: 'bg-red-100 text-red-700', time: '-' },
                ].map((act, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-800">{act.name}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{act.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-gray-600 px-2 py-1 bg-gray-100 rounded uppercase">{act.unit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${act.statusColor}`}>{act.status}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-mono italic">{act.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Info Panels */}
        <div className="flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-primary text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span className="uppercase tracking-widest text-[10px]">Profile Sekolah</span>
              </h4>
              <p className="text-xs text-primary-light/80 leading-relaxed mb-6">
                SMK Prima Unggul terus berinovasi dalam mencetak generasi unggul di bidang teknologi & bisnis.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { n: 'TKJ', d: 'NETWORK' },
                  { n: 'DKV', d: 'VISUAL' },
                  { n: 'AKL', d: 'ACCOUNT' }
                ].map(p => (
                  <div key={p.n} className="text-center p-2 bg-white/10 rounded-lg">
                    <p className="text-lg font-black leading-none mb-1">{p.n}</p>
                    <p className="text-[7px] uppercase tracking-tighter opacity-70">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative shape */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          </div>

          {/* Admin Shortcuts / Info Panel */}
          <div className="geometric-card flex-1">
            <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-50 pb-2">Shortcut Sistem</h4>
            <div className="space-y-3">
              {[
                { label: 'Input Absensi Siswa', path: '/app/absensi-siswa' },
                { label: 'Cetak Laporan', path: '/app/rekap' },
                { label: 'Informasi Sekolah', path: '/' }
              ].map((link, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-primary-light group transition-all text-left"
                >
                  <span className="text-[11px] font-bold text-gray-600 group-hover:text-primary transition-colors">{link.label}</span>
                  <span className="text-gray-300 group-hover:text-primary">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
