import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { UserProfile } from '../../types';

export default function AbsensiKaryawan({ user }: { user: UserProfile }) {
  const [hasAbsen, setHasAbsen] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentTime = new Date();

  const handleAbsen = () => {
    setLoading(true);
    setTimeout(() => {
      setHasAbsen(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Main Card */}
          <div className="geometric-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light rounded-full -mr-16 -mt-16 -z-0"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">Presensi Kehadiran</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                {hasAbsen ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Terverifikasi</span>
                ) : (
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Ready</span>
                )}
              </div>

              {!hasAbsen ? (
                <div className="space-y-8">
                  <div className="flex flex-col items-center py-12 border-2 border-dashed border-gray-100 rounded-2xl bg-surface">
                    <Clock className="w-12 h-12 text-primary/10 mb-4" />
                    <div className="text-center">
                      <p className="text-5xl font-black text-gray-900 mb-1">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                      <p className="label-caps tracking-widest">Waktu Server (WIB)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-primary-light text-primary rounded-xl text-xs font-medium">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>Lokasi terdeteksi: <b className="font-bold">Area SMK Prima Unggul</b>. Anda berada dalam zona presensi.</p>
                  </div>

                  <button
                    onClick={handleAbsen}
                    disabled={loading}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-hover shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Absen Sekarang
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Absensi Berhasil</h3>
                  <p className="text-gray-400 text-sm mt-1">Presensi Anda telah tercatat pada sistem pada pukul 07:15 WIB.</p>
                  <div className="mt-8 pt-8 border-t border-gray-50 uppercase tracking-widest text-[10px] font-bold text-primary">
                    Terima kasih atas disiplin Anda
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="geometric-card">
            <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2 uppercase tracking-tight text-sm">Ketentuan</h4>
            <div className="space-y-4">
              {[
                { title: 'Shift Kerja', val: '07:00 - 15:30' },
                { title: 'Toleransi', val: '15 Menit' },
                { title: 'Status', val: 'Pegawai Aktif' },
              ].map((rule, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-medium">{rule.title}</span>
                  <span className="font-bold text-gray-800">{rule.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-primary-light flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="font-bold text-primary text-[11px] uppercase tracking-wide">Peringatan</p>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-1">Gunakan perangkat pribadi untuk melakukan absensi. Kecurangan akan ditindak tegas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
