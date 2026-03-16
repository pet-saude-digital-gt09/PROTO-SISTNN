import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './pages/Login';
import { PasswordRecovery } from './pages/PasswordRecovery';
import { Dashboard } from './pages/Dashboard';
import { PatientSearch } from './pages/PatientSearch';
import { RegisterPatient } from './pages/RegisterPatient';
import { SampleCollection } from './pages/SampleCollection';
import { Triage } from './pages/Triage';
import { FileImport } from './pages/FileImport';
import { LabResults } from './pages/LabResults';
import { MedicalReports } from './pages/MedicalReports';
import { OperationalReports } from './pages/OperationalReports';
import { DelayedSamples } from './pages/DelayedSamples';
import { UserManagement } from './pages/UserManagement';
import { CollectionUnits } from './pages/CollectionUnits';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/password-recovery',
    Component: PasswordRecovery,
  },
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'patient-search',
        Component: PatientSearch,
      },
      {
        path: 'register-patient',
        Component: RegisterPatient,
      },
      {
        path: 'sample-collection',
        Component: SampleCollection,
      },
      {
        path: 'triage',
        Component: Triage,
      },
      {
        path: 'file-import',
        Component: FileImport,
      },
      {
        path: 'lab-results',
        Component: LabResults,
      },
      {
        path: 'medical-reports',
        Component: MedicalReports,
      },
      {
        path: 'operational-reports',
        Component: OperationalReports,
      },
      {
        path: 'delayed-samples',
        Component: DelayedSamples,
      },
      {
        path: 'users',
        Component: UserManagement,
      },
      {
        path: 'collection-units',
        Component: CollectionUnits,
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
