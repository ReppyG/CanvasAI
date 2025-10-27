import React, { useState } from 'react';
import PageHeader from './ui/PageHeader';
import Card from './ui/Card';
import { AssignmentsIcon, CalendarIcon, ChatIcon, TimeIcon } from './Icons';
import AiToolDialog from './AiToolDialog';

interface AiToolCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
}

type AiToolType = 'Study Plan' | 'Summarize' | 'Tutor Chat' | 'Time Estimator';

interface DialogState {
    isOpen: boolean;
    toolType: AiToolType | null;
    title: string;
    prompt: string;
}

const AiToolCard: React.FC<AiToolCardProps> = ({ title, description, icon, onClick }) => (
    <Card onClick={onClick} className="p-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-text-primary">{title}</h3>
        <p className="text-text-secondary mt-1">{description}</p>
    </Card>
);

const AiTools: React.FC = () => {
    const [dialogState, setDialogState] = useState<DialogState>({ 
        isOpen: false, 
        toolType: null,
        title: '',
        prompt: ''
    });

    const toolConfig: Record<AiToolType, { title: string; prompt: string; icon: React.ReactNode; description: string }> = {
        'Study Plan': {
            title: 'Generate Study Plan',
            prompt: 'Generate a detailed study plan for the following topic/assignment:',
            icon: <CalendarIcon />,
            description: 'AI-powered personalized study schedules'
        },
        'Summarize': {
            title: 'Summarize Content',
            prompt: 'Summarize the following text for me:',
            icon: <AssignmentsIcon />,
            description: 'Quick summaries of lectures and readings'
        },
        'Tutor Chat': {
            title: 'AI Tutor Chat',
            prompt: 'I have a question about my coursework:',
            icon: <ChatIcon />,
            description: 'Ask questions about your coursework'
        },
        'Time Estimator': {
            title: 'Time Estimator',
            prompt: 'Estimate the time it would take to complete the following assignment based on this description:',
            icon: <TimeIcon />,
            description: 'Predict how long assignments will take'
        }
    };

    const openDialog = (toolType: AiToolType) => {
        setDialogState({
            isOpen: true,
            toolType,
            title: toolConfig[toolType].title,
            prompt: toolConfig[toolType].prompt
        });
    };

    const closeDialog = () => {
        setDialogState(prev => ({ ...prev, isOpen: false }));
    };

  return (
    <>
      <div className="p-8 h-full">
        <PageHeader title="AI Study Tools" description="Supercharge your learning with AI-powered study assistants" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.keys(toolConfig) as AiToolType[]).map(toolType => {
            const config = toolConfig[toolType];
            return (
              <AiToolCard 
                key={toolType}
                title={config.title} 
                description={config.description} 
                icon={config.icon}
                onClick={() => openDialog(toolType)}
              />
            );
          })}
        </div>
      </div>
      {dialogState.isOpen && (
         <AiToolDialog
            isOpen={dialogState.isOpen}
            onClose={closeDialog}
            title={dialogState.title}
            initialPrompt={dialogState.prompt}
          />
      )}
    </>
  );
};

export default AiTools;