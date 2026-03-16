// Mock data for the EHR system

export interface Newborn {
  id: string;
  rnCode: string;
  name: string;
  motherName: string;
  fatherName: string;
  dateOfBirth: string;
  cns: string;
  weight: number;
  isPremature: boolean;
  motherDOB: string;
  fatherDOB: string;
  motherRace: string;
  fatherRace: string;
  address: string;
  city: string;
  state: string;
  collectionDate?: string;
  collectionTime?: string;
  collectionUnit?: string;
  collectingTechnician?: string;
  internalControl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'liberated';
}

export interface LabResult {
  id: string;
  internalControl: string;
  rnCode: string;
  patientName: string;
  tsh: number;
  pku: number;
  g6pd: number;
  hemoglobinopathies: string;
  biotinidase: number;
  cah: number;
  status: 'normal' | 'altered' | 'pending';
  liberatedDate?: string;
  collectionDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileType: 'Admin' | 'Lab Tech' | 'Collection Unit' | 'Analyst';
  status: 'Active' | 'Inactive';
}

export interface CollectionUnit {
  id: string;
  name: string;
  cnesCode: string;
  municipality: string;
  regionalCode: string;
}

export const mockNewborns: Newborn[] = [
  {
    id: '1',
    rnCode: '202603150001',
    name: 'Lucas Silva Santos',
    motherName: 'Maria Silva Santos',
    fatherName: 'João Santos',
    dateOfBirth: '2026-03-10',
    cns: '123456789012345',
    weight: 3200,
    isPremature: false,
    motherDOB: '1995-05-15',
    fatherDOB: '1992-08-20',
    motherRace: 'Parda',
    fatherRace: 'Branca',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    collectionDate: '2026-03-12',
    collectionTime: '08:30',
    collectionUnit: 'Hospital Santa Maria',
    collectingTechnician: 'Ana Paula Costa',
    internalControl: 'IC2026001',
    status: 'liberated'
  },
  {
    id: '2',
    rnCode: '202603140002',
    name: 'Ana Julia Oliveira',
    motherName: 'Carla Oliveira',
    fatherName: 'Roberto Oliveira',
    dateOfBirth: '2026-03-08',
    cns: '234567890123456',
    weight: 2800,
    isPremature: true,
    motherDOB: '1998-11-22',
    fatherDOB: '1997-03-10',
    motherRace: 'Branca',
    fatherRace: 'Branca',
    address: 'Av. Paulista, 456',
    city: 'São Paulo',
    state: 'SP',
    collectionDate: '2026-03-11',
    collectionTime: '14:15',
    collectionUnit: 'Maternidade São José',
    collectingTechnician: 'Pedro Henrique Lima',
    internalControl: 'IC2026002',
    status: 'approved'
  },
  {
    id: '3',
    rnCode: '202603130003',
    name: 'Gabriel Costa Lima',
    motherName: 'Juliana Costa',
    fatherName: 'Fernando Lima',
    dateOfBirth: '2026-03-05',
    cns: '345678901234567',
    weight: 3500,
    isPremature: false,
    motherDOB: '1993-07-08',
    fatherDOB: '1990-12-15',
    motherRace: 'Negra',
    fatherRace: 'Parda',
    address: 'Rua Santos Dumont, 789',
    city: 'Campinas',
    state: 'SP',
    collectionDate: '2026-03-08',
    collectionTime: '10:45',
    collectionUnit: 'Hospital Universitário',
    collectingTechnician: 'Ana Paula Costa',
    internalControl: 'IC2026003',
    status: 'pending'
  }
];

export const mockLabResults: LabResult[] = [
  {
    id: '1',
    internalControl: 'IC2026001',
    rnCode: '202603150001',
    patientName: 'Lucas Silva Santos',
    tsh: 2.5,
    pku: 1.8,
    g6pd: 8.5,
    hemoglobinopathies: 'Normal (AA)',
    biotinidase: 5.2,
    cah: 12.0,
    status: 'normal',
    liberatedDate: '2026-03-13',
    collectionDate: '2026-03-12'
  },
  {
    id: '2',
    internalControl: 'IC2026002',
    rnCode: '202603140002',
    patientName: 'Ana Julia Oliveira',
    tsh: 15.5,
    pku: 2.1,
    g6pd: 7.8,
    hemoglobinopathies: 'Normal (AA)',
    biotinidase: 4.9,
    cah: 11.5,
    status: 'altered',
    collectionDate: '2026-03-11'
  },
  {
    id: '3',
    internalControl: 'IC2026003',
    rnCode: '202603130003',
    patientName: 'Gabriel Costa Lima',
    tsh: 3.2,
    pku: 1.5,
    g6pd: 9.1,
    hemoglobinopathies: 'Normal (AA)',
    biotinidase: 5.8,
    cah: 13.2,
    status: 'pending',
    collectionDate: '2026-03-08'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Carlos Mendes',
    email: 'carlos.mendes@lab.gov.br',
    profileType: 'Admin',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Ana Paula Costa',
    email: 'ana.costa@coleta.gov.br',
    profileType: 'Collection Unit',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Pedro Henrique Lima',
    email: 'pedro.lima@coleta.gov.br',
    profileType: 'Collection Unit',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Dra. Fernanda Souza',
    email: 'fernanda.souza@lab.gov.br',
    profileType: 'Analyst',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Roberto Santos',
    email: 'roberto.santos@lab.gov.br',
    profileType: 'Lab Tech',
    status: 'Inactive'
  }
];

export const mockCollectionUnits: CollectionUnit[] = [
  {
    id: '1',
    name: 'Hospital Santa Maria',
    cnesCode: '2025698',
    municipality: 'São Paulo',
    regionalCode: 'DRS-01'
  },
  {
    id: '2',
    name: 'Maternidade São José',
    cnesCode: '2025701',
    municipality: 'São Paulo',
    regionalCode: 'DRS-01'
  },
  {
    id: '3',
    name: 'Hospital Universitário',
    cnesCode: '2025834',
    municipality: 'Campinas',
    regionalCode: 'DRS-07'
  },
  {
    id: '4',
    name: 'Maternidade Central',
    cnesCode: '2025967',
    municipality: 'Santos',
    regionalCode: 'DRS-04'
  }
];

export const dashboardMetrics = {
  samplesToday: 24,
  pendingResults: 8,
  liberatedReports: 156,
  rejectedSamples: 3
};

export const weeklyProcessingData = [
  { day: 'Mon', samples: 28 },
  { day: 'Tue', samples: 32 },
  { day: 'Wed', samples: 25 },
  { day: 'Thu', samples: 35 },
  { day: 'Fri', samples: 24 },
  { day: 'Sat', samples: 15 },
  { day: 'Sun', samples: 12 }
];
