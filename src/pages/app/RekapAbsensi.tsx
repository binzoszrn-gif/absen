import { useState } from 'react';
import { Download, FileText, Calendar, Filter, ChevronRight } from 'lucide-react';
import { UserProfile } from '../../types';

export default function RekapAbsensi({ user }: { user: UserProfile }) {
  const [tab, setTab] = useState<'siswa' | 'karyawan'>(user.role === 'admin' ? 'karyawan' : 'siswa');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rekapitulasi Absensi</h1>
          <p className="text-gray-500 mt-1">Laporan kehadiran harian, mingguan, dan bulanan.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Ekspor PDF/Excel
        </button>
      </div>

      {/* Tabs */}
      {user.role === 'admin' && (
        <div className="flex p-1 bg-gray-100 rounded-2xl w-fit">
          <button
            onClick={() => setTab('karyawan')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'karyawan' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Absensi Karyawan
          </button>
          <button
            onClick={() => setTab('siswa')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'siswa' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Absensi Siswa
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Periode</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm font-semibold outline-none border border-transparent focus:border-primary/20">
                  <option>Bulan Ini</option>
                  <option>Minggu Ini</option>
                  <option>Tentukan Tanggal</option>
                </select>
              </div>
            </div>
            {tab === 'siswa' && (
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Kelas</label>
                <select className="w-full px-4 py-2 bg-gray-50 rounded-xl text-sm font-semibold outline-none border border-transparent focus:border-primary/20">
                  <option>Semua Kelas</option>
                  <option>XII TKJ 1</option>
                  <option>XII TKJ 2</option>
                </select>
              </div>
            )}
            <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-black transition-colors">
              <Filter className="w-4 h-4" />
              Terapkan Filter
            </button>
          </div>
        </div>

        {/* Main report area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">
                {tab === 'karyawan' ? 'Laporan Kehadiran Karyawan' : 'Laporan Kehadiran Siswa'}
              </h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">April 2024</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 font-bold">
                    <th className="px-6 py-4">Nama</th>
                    <th className="px-6 py-4 text-center">Hadir</th>
                    <th className="px-6 py-4 text-center">Izin</th>
                    <th className="px-6 py-4 text-center">Sakit</th>
                    <th className="px-6 py-4 text-center">Alfa</th>
                    <th className="px-6 py-4 text-right">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Ahmad Faisal', h: 18, i: 1, s: 0, a: 0, p: '94%' },
                    { name: 'Bunga Citra', h: 19, i: 0, s: 0, a: 0, p: '100%' },
                    { name: 'Candra Wijaya', h: 15, i: 1, s: 2, a: 1, p: '78%' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 font-bold text-gray-900 flex items-center justify-between">
                        {row.name}
                        <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all" />
                      </td>
                      <td className="px-6 py-4 text-center text-green-600 font-bold">{row.h}</td>
                      <td className="px-6 py-4 text-center text-blue-600 font-bold">{row.i}</td>
                      <td className="px-6 py-4 text-center text-orange-600 font-bold">{row.s}</td>
                      <td className="px-6 py-4 text-center text-red-600 font-bold">{row.a}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-1 bg-primary/5 text-primary rounded-lg font-black">{row.p}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
