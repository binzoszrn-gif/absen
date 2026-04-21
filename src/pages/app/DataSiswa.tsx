import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import { Student } from '../../types';

const initialStudents: Student[] = [
  { id: '1', nis: '2024001', name: 'Ahmad Faisal', kelas: 'XII TKJ 1' },
  { id: '2', nis: '2024002', name: 'Bunga Citra', kelas: 'XII TKJ 1' },
  { id: '3', nis: '2024003', name: 'Candra Wijaya', kelas: 'XII TKJ 2' },
  { id: '4', nis: '2024004', name: 'Dedi Kurniawan', kelas: 'XII DKV 1' },
  { id: '5', nis: '2024005', name: 'Eva Natalia', kelas: 'XI AK 1' },
];

export default function DataSiswa() {
  const [students] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.nis.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Siswa</h1>
          <p className="text-gray-500 mt-1">Kelola informasi seluruh siswa SMK Prima Unggul.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tambah Siswa
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau NIS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
          <Filter className="w-5 h-5" />
          Filter Kelas
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4 text-center w-16">No</th>
                <th className="px-6 py-4">NIS</th>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">Kelas</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((student, i) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-gray-400 text-center font-medium">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">{student.nis}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{student.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase">{student.kelas}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
