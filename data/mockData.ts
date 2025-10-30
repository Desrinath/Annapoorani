
import type { Patient } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'p001',
    name: 'John Doe',
    mrn: 'MRN001',
    dob: '01/15/1975',
    bloodType: 'O+',
    phone: '555-0101',
    gender: 'Male',
    predictions: [
      {
        disease: 'Type 2 Diabetes',
        confidence: 0.70,
        riskLevel: 'Moderate',
        riskFactors: ['Elevated glucose levels', 'High BMI', 'Family history'],
        recommendations: [
          'Regular blood glucose monitoring',
          'Maintain healthy weight through diet and exercise',
          'Consult with an endocrinologist',
          'Consider HbA1c testing'
        ]
      },
      {
        disease: 'Cardiovascular Disease',
        confidence: 0.85,
        riskLevel: 'High',
        riskFactors: ['High blood pressure', 'Smoking', 'Family history'],
        recommendations: [
          'Lipid panel and cardiac assessment',
          'Heart-healthy diet (low saturated fat)',
          'Regular cardiovascular exercise',
          'Quit smoking',
          'Consider statin therapy consultation'
        ]
      }
    ]
  },
  {
    id: 'p002',
    name: 'Jane Smith',
    mrn: 'MRN002',
    dob: '05/22/1982',
    bloodType: 'A-',
    phone: '555-0102',
    gender: 'Female',
    predictions: [
       {
        disease: 'Type 2 Diabetes',
        confidence: 0.35,
        riskLevel: 'Low',
        riskFactors: ['Normal glucose levels', 'Healthy BMI'],
        recommendations: [
          'Continue annual check-ups',
          'Maintain current lifestyle',
        ]
      },
      {
        disease: 'Cardiovascular Disease',
        confidence: 0.55,
        riskLevel: 'Moderate',
        riskFactors: ['Slightly elevated cholesterol', 'Family history'],
        recommendations: [
          'Monitor cholesterol levels',
          'Incorporate more omega-3 fatty acids into diet',
        ]
      }
    ]
  },
   {
    id: 'p003',
    name: 'Robert Johnson',
    mrn: 'MRN003',
    dob: '11/08/1960',
    bloodType: 'B-',
    phone: '555-0103',
    gender: 'Male',
    predictions: [
       {
        disease: 'Type 2 Diabetes',
        confidence: 0.65,
        riskLevel: 'Moderate',
        riskFactors: ['Prediabetes diagnosis', 'Sedentary lifestyle'],
        recommendations: [
          'Increase daily physical activity',
          'Follow a low-glycemic diet',
          'Quarterly HbA1c monitoring'
        ]
      },
      {
        disease: 'Cardiovascular Disease',
        confidence: 0.78,
        riskLevel: 'High',
        riskFactors: ['High triglycerides', 'History of smoking'],
        recommendations: [
          'Strict adherence to lipid-lowering medication',
          'Echocardiogram assessment',
          'Dietary consultation'
        ]
      }
    ]
  },
  {
    id: 'p004',
    name: 'Maria Garcia',
    mrn: 'MRN004',
    dob: '07/30/1990',
    bloodType: 'AB+',
    phone: '555-0104',
    gender: 'Female',
    predictions: [
       {
        disease: 'Type 2 Diabetes',
        confidence: 0.20,
        riskLevel: 'Low',
        riskFactors: ['Active lifestyle', 'No family history'],
        recommendations: [
          'Maintain healthy diet and exercise habits',
          'Annual wellness visits'
        ]
      },
      {
        disease: 'Cardiovascular Disease',
        confidence: 0.15,
        riskLevel: 'Low',
        riskFactors: ['Excellent lipid profile'],
        recommendations: [
          'Continue current lifestyle',
          'Be mindful of sodium intake'
        ]
      }
    ]
  }
];
