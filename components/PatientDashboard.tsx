
import React from 'react';
import type { Patient } from '../types';
import Card from './ui/Card';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}
const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => (
    <div className={`bg-surface p-4 rounded-lg shadow-sm flex items-center gap-4`}>
        <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
            {icon}
        </div>
        <div>
            <div className="text-2xl font-bold text-text">{value}</div>
            <div className="text-sm text-muted">{label}</div>
        </div>
    </div>
);


interface PatientDashboardProps {
    patients: Patient[];
    selectedPatientId: string | null;
    onSelectPatient: (id: string) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patients, selectedPatientId, onSelectPatient }) => {
    
    const criticalLabsCount = 4; // Mock data
    const highRiskCount = patients.filter(p => p.predictions.some(pred => pred.riskLevel === 'High')).length;
    
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text">HealthFusion AI Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Patients" value={patients.length} color="text-blue-500" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.28-.24-1.88M7 15H4a2 2 0 00-2 2v2h5M7 15a3 3 0 015.958-1M7 15v-2a3 3 0 013-3h2m-4 6H7m0 0v-2c0-.653.084-1.28.24-1.88" /></svg>} />
                <StatCard label="Critical Labs" value={criticalLabsCount} color="text-red-500" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <StatCard label="High Risk" value={highRiskCount} color="text-orange-500" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
                <StatCard label="Active Meds" value={5} color="text-green-500" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </div>
            
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-text">Patients</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {patients.map(patient => (
                        <button key={patient.id} onClick={() => onSelectPatient(patient.id)} className={`text-left transition-all duration-200 rounded-lg p-4 ${selectedPatientId === patient.id ? 'bg-primary-light ring-2 ring-primary' : 'bg-surface hover:bg-gray-50 shadow-sm'}`}>
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-text">{patient.name}</p>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${patient.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>{patient.gender}</span>
                            </div>
                            <div className="text-sm text-muted mt-2 space-y-1">
                                <p>MRN: {patient.mrn}</p>
                                <p>DOB: {patient.dob}</p>
                                <p>Blood Type: {patient.bloodType}</p>
                                <p>Phone: {patient.phone}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
