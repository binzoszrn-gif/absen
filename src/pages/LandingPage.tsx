import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, Monitor, Camera, DollarSign, Radio, Briefcase, ShoppingBag } from 'lucide-react';

const programs = [
  { name: 'TKJ', desc: 'Teknik Komputer Jaringan', icon: Monitor },
  { name: 'DKV', desc: 'Desain Komunikasi Visual', icon: Camera },
  { name: 'AK', desc: 'Akuntansi', icon: DollarSign },
  { name: 'BC', desc: 'Broadcasting', icon: Radio },
  { name: 'MPLB', desc: 'Manajemen Perkantoran', icon: Briefcase },
  { name: 'BD', desc: 'Bisnis Digital', icon: ShoppingBag },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              PU
            </div>
            <span className="font-bold text-xl tracking-tight text-primary">SMK PRIMA UNGGUL</span>
          </div>
          <Link
            to="/login"
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
          >
            Masuk ke Aplikasi
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Membangun Generasi <br />
              <span className="text-primary">Unggul & Berkarakter</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              SMK Prima Unggul berkomitmen untuk mencetak lulusan yang siap kerja, mandiri, dan inovatif di era digital.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="btn-primary group flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#programs"
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
              >
                Lihat Jurusan
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Siswa Aktif', value: '1.200+', icon: Users },
            { label: 'Program Keahlian', value: '6', icon: BookOpen },
            { label: 'Penghargaan', value: '25', icon: Award },
            { label: 'Lulusan Terserap', value: '92%', icon: Briefcase },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Keahlian</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <prog.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{prog.name}</h3>
              <p className="text-gray-500 leading-relaxed">
                {prog.desc}. Kurikulum berbasis industri dengan fasilitas lab yang lengkap.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
              PU
            </div>
            <div className="text-left">
              <div className="font-bold text-xl">SMK Prima Unggul</div>
              <div className="text-xs text-gray-400">Pusat Keunggulan & Inovasi</div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 SMK Prima Unggul. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
