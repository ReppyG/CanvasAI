
import React, { createContext, useContext, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';

interface GeminiContextType {
  ai: GoogleGenAI | null;
  error: string | null;
}

const GeminiContext = createContext<GeminiContextType>({ ai: null, error: null });

export const useGemini = () => {
    const context = useContext(GeminiContext);
    if (!context) {
        throw new Error('useGemini must be used within a GeminiProvider');
    }
    return context;
}

interface GeminiProviderProps {
    children: React.ReactNode;
}

export const GeminiProvider: React.FC<GeminiProviderProps> = ({ children }) => {
    const value = useMemo(() => {
        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY environment variable not set.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            return { ai, error: null };
        } catch (e) {
            return { ai: null, error: e instanceof Error ? e.message : 'An unknown error occurred during initialization.' };
        }
    }, []);

    return (
        <GeminiContext.Provider value={value}>
            {children}
        </GeminiContext.Provider>
    );
};
