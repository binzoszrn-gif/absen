export type UserRole = 'admin' | 'guru' | 'staf';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: any;
}

export interface Student {
  id: string;
  nis: string;
  name: string;
  kelas: string;
}

export interface TeacherAttendance {
  id: string;
  uid: string;
  name: string;
  date: string;
  timeIn: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alfa';
}

export interface StudentAttendance {
  id: string;
  studentId: string;
  date: string;
  kelas: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alfa';
  recordedBy: string; // guru uid
}
