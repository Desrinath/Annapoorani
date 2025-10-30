
import React, { useState, useRef, useEffect } from 'react';
import { queryPatientData } from '../services/geminiService';
import type { ChatMessage, Patient } from '../types';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white bg-muted rounded-full p-1">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

const AiIcon: React.FC = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white bg-primary rounded-full p-1">
    <path d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.278 0-2.507-.19-3.685-.531a1.125 1.125 0 0 1-.65-1.085m3.75-9.611a7.5 7.5 0 0 1 7.5 0c1.278 0 2.507.19 3.685.531a1.125 1.125 0 0 1 .65 1.085m-3.75 9.611a7.5 7.5 0 0 1-7.5 0m7.5 0a7.5 7.5 0 0 0-7.5 0M12 6.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z" />
  </svg>
);

interface ChatbotProps {
    patients: Patient[];
    onPatientFound: (patientId: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ patients, onPatientFound }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: "Hello! I'm HealthFusion AI. I can help you search medical records using natural language. Try asking me about patients, lab results, or disease predictions." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const { summary, patientId } = await queryPatientData(input, patients);
    
    if (patientId) {
        onPatientFound(patientId);
    }

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: summary,
      data: patientId ? patients.find(p => p.id === patientId) : null,
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const examplePrompts = ["Find patient John Doe", "Show me lab results for MRN004", "What are the vital signs for Jane Smith?"];

  return (
    <Card className="flex flex-col h-full sticky top-24">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3v1.5h1.5V8.25Zm3.75 0v1.5h-1.5V8.25h1.5Zm3.75 0v1.5h-1.5V8.25h1.5Zm3.75 0v1.5h-1.5V8.25h1.5Zm3.75 0v1.5h-1.5V8.25h1.5Zm-15 3.75v1.5h-1.5v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Zm-15 3.75v1.5H3v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Zm3.75 0v1.5h-1.5v-1.5h1.5Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75h18v10.5H3V6.75Z" />
            </svg>
          </div>
          <div>
            <CardTitle>HealthFusion AI Assistant</CardTitle>
            <CardDescription>Natural Language Medical Query Interface</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col min-h-[60vh]">
        <div className="flex-grow overflow-y-auto pr-4 space-y-4 mb-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && <AiIcon />}
              <div className={`max-w-md lg:max-w-xl rounded-lg p-3 ${msg.sender === 'ai' ? 'bg-primary-light' : 'bg-primary text-white'}`}>
                <p className="text-sm">{msg.text}</p>
                {msg.data && (
                  <pre className="mt-2 bg-gray-800 text-white p-3 rounded-md text-xs overflow-x-auto">
                    <code>{JSON.stringify(msg.data, null, 2)}</code>
                  </pre>
                )}
              </div>
              {msg.sender === 'user' && <UserIcon />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-muted mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {examplePrompts.map(prompt => (
                    <button key={prompt} onClick={() => setInput(prompt)} className="text-xs bg-gray-100 hover:bg-gray-200 text-muted rounded-full px-3 py-1 transition-colors">
                        {prompt}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <Input 
                    type="text" 
                    placeholder="Ask about patients, labs, results..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading} className="shrink-0">
                    {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M3.105 3.105a1.5 1.5 0 0 1 2.122-.001l7.694 7.693a.75.75 0 0 1 0 1.06l-7.694 7.694a1.5 1.5 0 1 1-2.121-2.121l6.633-6.634-6.634-6.633a1.5 1.5 0 0 1-.001-2.121Z" />
                    </svg>
                    ) }
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
