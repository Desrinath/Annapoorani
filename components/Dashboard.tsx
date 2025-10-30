import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import PatientDashboard from './PatientDashboard';
import DiseasePrediction from './DiseasePrediction';
import DiseaseRiskAnalyzer from './DiseaseRiskAnalyzer';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types';

const Dashboard: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>(mockPatients);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    // Default to selecting the first patient on initial load or when list changes
    useEffect(() => {
        if (!selectedPatientId && patients.length > 0) {
            setSelectedPatientId(patients[0].id);
        }
    }, [patients, selectedPatientId]);

    const handleAddPatient = (newPatient: Patient) => {
        setPatients(prevPatients => [newPatient, ...prevPatients]);
        // Automatically select the newly added patient
        setSelectedPatientId(newPatient.id);
    };

    const selectedPatient = patients.find(p => p.id === selectedPatientId) || null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-1 xl:col-span-1">
                <Chatbot patients={patients} onPatientFound={setSelectedPatientId} />
            </div>
            <div className="lg:col-span-2 xl:col-span-3 space-y-8">
                <PatientDashboard 
                    patients={patients} 
                    selectedPatientId={selectedPatientId} 
                    onSelectPatient={setSelectedPatientId} 
                />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                    <DiseasePrediction patient={selectedPatient} />
                    <DiseaseRiskAnalyzer onAddPatient={handleAddPatient} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
