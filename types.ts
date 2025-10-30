
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  data?: any; // To display found patient data
}

export interface Prediction {
  disease: string;
  confidence: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  riskFactors: string[];
  recommendations: string[];
}

export interface Patient {
  id: string;
  name: string;
  mrn: string;
  dob: string;
  bloodType: string;
  phone: string;
  gender: 'Male' | 'Female';
  predictions: Prediction[];
}
