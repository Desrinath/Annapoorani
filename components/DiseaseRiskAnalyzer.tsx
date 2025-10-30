import React, { useState } from 'react';
import { analyzeDiseaseRisk } from '../services/geminiService';
import type { Patient, Prediction } from '../types';
import Card, { CardHeader, CardTitle, CardContent, CardDescription } from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

interface DiseaseRiskAnalyzerProps {
    onAddPatient: (patient: Patient) => void;
}

const initialFormData = {
    name: '',
    age: '',
    gender: 'Male',
    bmi: '',
    systolic_bp: '',
    diastolic_bp: '',
    glucose: '',
    temperature: '',
    symptoms: '',
    analysisFocus: '', // Added field for specific check
    is_smoker: false,
    has_family_history_heart: false,
    has_family_history_diabetes: false,
};

const DiseaseRiskAnalyzer: React.FC<DiseaseRiskAnalyzerProps> = ({ onAddPatient }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisCompleted, setAnalysisCompleted] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setAnalysisCompleted(false);

        const patientData = {
            age: parseInt(formData.age, 10),
            gender: formData.gender,
            bmi: parseFloat(formData.bmi),
            blood_pressure: `${formData.systolic_bp}/${formData.diastolic_bp}`,
            fasting_glucose_level: parseInt(formData.glucose, 10),
            temperature_fahrenheit: formData.temperature ? parseFloat(formData.temperature) : undefined,
            symptoms: formData.symptoms || undefined,
            analysisFocus: formData.analysisFocus || undefined,
            is_smoker: formData.is_smoker,
            family_history: {
                heart_disease: formData.has_family_history_heart,
                diabetes: formData.has_family_history_diabetes,
            },
        };
        
        // Remove undefined fields
        Object.keys(patientData).forEach(key => (patientData as any)[key] === undefined && delete (patientData as any)[key]);


        const analysisResults = await analyzeDiseaseRisk(patientData);

        const newPatient: Patient = {
            id: `p${Date.now()}`,
            name: formData.name,
            mrn: `MRN${Math.floor(1000 + Math.random() * 9000)}`,
            dob: new Date(new Date().setFullYear(new Date().getFullYear() - patientData.age)).toLocaleDateString('en-US'),
            bloodType: ['A+', 'O-', 'B+', 'AB-'][Math.floor(Math.random() * 4)],
            phone: `555-0${Math.floor(100 + Math.random() * 900)}`,
            gender: formData.gender as 'Male' | 'Female',
            predictions: analysisResults,
        };

        onAddPatient(newPatient);
        setAnalysisCompleted(true);
        setFormData(initialFormData);
        setIsLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Module 2: Disease Risk Analyzer</CardTitle>
                <CardDescription>Enter patient data to analyze disease risk and add to records.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-muted mb-1">Full Name</label>
                            <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-muted mb-1">Age</label>
                            <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-muted mb-1">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="bmi" className="block text-sm font-medium text-muted mb-1">BMI</label>
                            <Input id="bmi" name="bmi" type="number" step="0.1" value={formData.bmi} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="systolic_bp" className="block text-sm font-medium text-muted mb-1">Systolic BP</label>
                            <Input id="systolic_bp" name="systolic_bp" type="number" value={formData.systolic_bp} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="diastolic_bp" className="block text-sm font-medium text-muted mb-1">Diastolic BP</label>
                            <Input id="diastolic_bp" name="diastolic_bp" type="number" value={formData.diastolic_bp} onChange={handleChange} required />
                        </div>
                         <div>
                            <label htmlFor="glucose" className="block text-sm font-medium text-muted mb-1">Fasting Glucose (mg/dL)</label>
                            <Input id="glucose" name="glucose" type="number" value={formData.glucose} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="temperature" className="block text-sm font-medium text-muted mb-1">Temperature (°F)</label>
                            <Input id="temperature" name="temperature" type="number" step="0.1" value={formData.temperature} onChange={handleChange} />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="analysisFocus" className="block text-sm font-medium text-muted mb-1">Specific Health Concern (optional)</label>
                        <Input id="analysisFocus" name="analysisFocus" type="text" value={formData.analysisFocus} onChange={handleChange} placeholder="e.g., heart, sugar, pressure, fever" />
                    </div>
                    <div>
                        <label htmlFor="symptoms" className="block text-sm font-medium text-muted mb-1">Current Symptoms (e.g., cough, headache)</label>
                        <textarea
                            id="symptoms"
                            name="symptoms"
                            value={formData.symptoms}
                            onChange={handleChange}
                            rows={2}
                            className="flex min-h-[60px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2">
                             <input type="checkbox" id="is_smoker" name="is_smoker" checked={formData.is_smoker} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                             <label htmlFor="is_smoker" className="text-sm text-muted">Is a smoker?</label>
                        </div>
                         <div className="flex items-center gap-2">
                             <input type="checkbox" id="has_family_history_heart" name="has_family_history_heart" checked={formData.has_family_history_heart} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                             <label htmlFor="has_family_history_heart" className="text-sm text-muted">Family history of heart disease?</label>
                        </div>
                         <div className="flex items-center gap-2">
                             <input type="checkbox" id="has_family_history_diabetes" name="has_family_history_diabetes" checked={formData.has_family_history_diabetes} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                             <label htmlFor="has_family_history_diabetes" className="text-sm text-muted">Family history of diabetes?</label>
                        </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                         {isLoading ? 'Analyzing...' : 'Analyze Risk & Add Patient'}
                    </Button>
                </form>

                {analysisCompleted && !isLoading && (
                    <div className="mt-6 text-center text-green-700 bg-green-50 p-3 rounded-md">
                        <p className="font-semibold">✓ Analysis complete. New patient added to the dashboard.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DiseaseRiskAnalyzer;