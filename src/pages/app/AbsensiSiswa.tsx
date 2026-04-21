import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, GraduationCap, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { UserProfile, Student } from '../../types';

const mockStudents: Student[] = [
  { id: '1', nis: '2024001', name: 'Ahmad Faisal', kelas: 'XII TKJ 1' },
  { id: '2', nis: '2024002', name: 'Bunga Citra', kelas: 'XII TKJ 1' },
  { id: '3', nis: '2024003', name: 'Candra Wijaya', kelas: 'XII TKJ 1' },
  { id: '4', nis: '2024004', name: 'Dedi Kurniawan', kelas: 'XII TKJ 1' },
  { id: '5', nis: '2024005', name: 'Eva Natalia', kelas: 'XII TKJ 1' },
];

export default function AbsensiSiswa({ user }: { user: UserProfile }) {
  const [selectedKelas, setSelectedKelas] = useState('XII TKJ 1');
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const isAllAbsen = Object.keys(attendance).length === mockStudents.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Absensi Siswa</h1>
          <p className="text-gray-500 mt-1">Lakukan presensi siswa untuk kelas yang diajar hari ini.</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedKelas}
            onChange={(e) => setSelectedKelas(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-semibold outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option>XII TKJ 1</option>
            <option>XII TKJ 2</option>
            <option>XI DKV 1</option>
          </select>
          <button className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-hover disabled:opacity-50" disabled={!isAllAbsen}>
            Simpan Absensi
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">NIS</th>
                <th className="px-6 py-4">Nama Siswa</th>
                <th className="px-6 py-4">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">{student.nis}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {[
                        { id: 'hadir', label: 'H', color: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50' },
                        { id: 'izin', label: 'I', color: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50' },
                        { id: 'sakit', label: 'S', color: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50' },
                        { id: 'alfa', label: 'A', color: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleStatusChange(student.id, s.id)}
                          className={`w-10 h-10 rounded-xl font-bold transition-all border-2 ${
                            attendance[student.id] === s.id 
                              ? `${s.color} border-transparent text-white shadow-lg` 
                              : `border-gray-100 ${s.text} bg-white hover:bg-gray-50`
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
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
