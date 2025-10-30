import React from 'react';
import type { Patient, Prediction } from '../types';
import Card, { CardContent } from './ui/Card';

// Helper function to identify scan/test recommendations
const isScanRecommendation = (recommendation: string): boolean => {
  const keywords = ['scan', 'x-ray', 'ecg', 'mri', 'ultrasound', 'blood panel', 'test', 'assessment', 'echocardiogram', 'lipid panel', 'monitoring'];
  const lowerCaseRec = recommendation.toLowerCase();
  return keywords.some(keyword => lowerCaseRec.includes(keyword));
};


const RiskBadge: React.FC<{ level: Prediction['riskLevel'] }> = ({ level }) => {
    const levelStyles = {
        Low: 'bg-green-100 text-green-800',
        Moderate: 'bg-yellow-100 text-yellow-800',
        High: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${levelStyles[level]}`}>
            {level} Risk
        </span>
    );
};

interface DiseasePredictionProps {
    patient: Patient | null;
}

const DiseasePrediction: React.FC<DiseasePredictionProps> = ({ patient }) => {
    if (!patient) {
        return (
            <Card>
                <CardContent className="text-center text-muted h-64 flex items-center justify-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Select a patient to view their disease prediction results.
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-text flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-12a2.25 2.25 0 0 1-2.25-2.25V3.75m0 0v-.75A2.25 2.25 0 0 1 5.25 0h13.5A2.25 2.25 0 0 1 21 2.25v.75m-10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
                Prediction Results for {patient.name}
            </h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {patient.predictions.map(pred => (
                    <Card key={pred.disease}>
                        <CardContent>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-bold text-text">{pred.disease}</h3>
                                <RiskBadge level={pred.riskLevel} />
                            </div>
                            <p className="text-sm text-muted mb-4">Confidence: <span className="font-semibold text-text">{(pred.confidence * 100).toFixed(1)}%</span></p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-sm text-text flex items-center gap-2 mb-2">
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-orange-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                        </svg>
                                        Risk Factors
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-muted space-y-1">
                                        {pred.riskFactors.map(factor => <li key={factor}>{factor}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-text flex items-center gap-2 mb-2">
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        Recommendations
                                    </h4>
                                    <ul className="space-y-1 text-sm text-muted">
                                        {pred.recommendations.map(rec => {
                                            const isScan = isScanRecommendation(rec);
                                            return (
                                                <li key={rec} className={`flex items-start gap-2 p-1.5 rounded-md ${isScan ? 'bg-secondary/20' : ''}`}>
                                                    {isScan ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary shrink-0 mt-0.5">
                                                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500 shrink-0 mt-0.5">
                                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                    <span className={isScan ? 'font-semibold text-primary-dark' : ''}>{rec}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DiseasePrediction;