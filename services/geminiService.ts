import { GoogleGenAI, Type } from "@google/genai";
import type { Patient, Prediction } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  alert("API_KEY environment variable not set. The app will not function.");
  throw new Error("API_KEY not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const QUERY_SYSTEM_INSTRUCTION = `
You are a helpful AI assistant for the HealthFusion AI dashboard.
Your task is to find specific patients from a provided list based on the user's natural language query.
The patient data is provided as a JSON array.
Analyze the user's question and the patient data.
If you find a matching patient, respond with a brief confirmation message and the ID of that patient.
If the question is general (e.g., "how many patients?"), provide a helpful summary.
If no specific patient is found or the query is ambiguous, say so.
Return the result as a valid JSON object. Do not add any text before or after the JSON object.
`;

export const queryPatientData = async (question: string, patients: Patient[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Patient Data: ${JSON.stringify(patients.map(p => ({id: p.id, name: p.name, mrn: p.mrn, dob: p.dob})))} \n\nUser Question: "${question}"`,
      config: {
        systemInstruction: QUERY_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A brief summary of the action taken or the answer to the user's question." },
            patientId: { type: Type.STRING, description: "The ID of the patient found, or null if no specific patient was found." },
          },
        },
      },
    });

    const jsonText = response.text;
    const result = JSON.parse(jsonText);
    return { summary: result.summary, patientId: result.patientId || null };
  } catch (error) {
    console.error("Error querying patient data:", error);
    return {
      summary: "An error occurred while communicating with the AI. Please try again.",
      patientId: null,
    };
  }
};

const ANALYSIS_SYSTEM_INSTRUCTION = `
You are an advanced AI medical assistant specializing in disease risk assessment.
Based on the provided patient data, analyze the risk for relevant health conditions. The user may provide a specific health concern to focus on.

Your analysis should cover:
1.  The user's specific concern if provided (e.g., heart issues, sugar levels, pressure, signs of fever).
2.  Chronic conditions like "Type 2 Diabetes" and "Cardiovascular Disease" / "Hypertension".
3.  Potential acute conditions like "Viral Fever" if symptoms like temperature are provided.
4.  A "General Health Status" summary.

For each condition you identify, you must provide:
1.  A confidence score as a number between 0.0 and 1.0, representing your certainty of the assessment.
2.  A risk level string: 'Low', 'Moderate', 'High', or 'Needs Assessment' for acute issues.
3.  A list of strings for the primary risk factors or symptoms from the provided data.
4.  A list of strings for actionable recommendations. **Crucially, if the data suggests a need for further investigation, include recommendations for specific medical tests or scans (e.g., 'Recommend chest X-ray', 'Suggest blood panel test', 'Consider ECG').**

Return the result as a valid JSON array of objects. Do not add any text before or after the JSON object.
`;

export const analyzeDiseaseRisk = async (patientData: any): Promise<Prediction[]> => {
  try {
    const { analysisFocus, ...restOfData } = patientData;
    
    let prompt = `Analyze the following patient data: ${JSON.stringify(restOfData)}`;
    if (analysisFocus) {
      prompt += `\n\nThe user has a specific concern they want to be checked: "${analysisFocus}". Please prioritize analysis related to this concern while also providing a general health assessment.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: ANALYSIS_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              disease: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              riskLevel: { type: Type.STRING },
              riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['disease', 'confidence', 'riskLevel', 'riskFactors', 'recommendations']
          },
        },
      },
    });

    const jsonText = response.text;
    const predictions = JSON.parse(jsonText);
    return predictions;
  } catch (error) {
    console.error("Error analyzing disease risk:", error);
    return [
      {
        disease: "Analysis Error",
        confidence: 0,
        riskLevel: "Low",
        riskFactors: ["Could not connect to the AI model."],
        recommendations: ["Please check your connection and API key, then try again."],
      },
    ];
  }
};