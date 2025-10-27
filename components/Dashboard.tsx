import React, { useState } from 'react';
import Card from './ui/Card';
import PageHeader from './ui/PageHeader';
import Badge from './ui/Badge';
import { sampleAssignments } from '../data/sampleData';
import { Assignment, AssignmentStatus, Page } from '../types';
import { TimeIcon, PointsIcon, AiToolsIcon, AssignmentsIcon } from './Icons';
import AiToolDialog from './AiToolDialog';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card className="flex items-center p-6">
        <div className="p-3 rounded-full bg-primary/10 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-text-secondary text-sm">{title}</p>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
        </div>
    </Card>
);

const AssignmentCard: React.FC<{ assignment: Assignment }> = ({ assignment }) => (
    <Card className="flex flex-col justify-between h-full">
        <div>
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-text-primary pr-2">{assignment.title}</h3>
                <Badge status={assignment.status} />
            </div>
            <p className="text-sm text-text-secondary mb-4">{assignment.courseCode} - {assignment.courseName}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-text-secondary mt-auto pt-2 border-t border-border">
            <div className="flex items-center">
                <TimeIcon />
                <span className="ml-1.5">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
                <PointsIcon />
                <span className="ml-1.5">{assignment.points} points</span>
            </div>
        </div>
    </Card>
);

const AiToolCard: React.FC<{ title: string; description: string, onClick: () => void }> = ({ title, description, onClick }) => (
    <Card className="text-center" onClick={onClick}>
        <div className="mx-auto w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
             <AiToolsIcon/>
        </div>
        <h3 className="font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary mt-1">{description}</p>
    </Card>
);

interface DashboardProps {
  setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
    const urgentAssignments = sampleAssignments
        .filter(a => a.status !== AssignmentStatus.Completed && a.status !== AssignmentStatus.Submitted)
        .slice(0, 3);
    
    const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

    const openStudyPlanDialog = () => {
        setIsAiDialogOpen(true);
    };

    return (
        <>
            <div className="p-8 h-full overflow-y-auto">
                <PageHeader title="Welcome back, Student! 👋" description="Here's what's happening with your courses today">
                     <button onClick={openStudyPlanDialog} className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        AI Study Plan
                    </button>
                </PageHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Active Assignments" value="8" icon={<AssignmentsIcon/>} />
                    <StatCard title="Completed This Week" value="5" icon={<div className="text-status-completed"><PointsIcon/></div>} />
                    <StatCard title="Average Score" value="92%" icon={<div className="text-primary"><AiToolsIcon/></div>} />
                </div>
                
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-text-primary">Urgent Assignments</h2>
                        <button onClick={() => setActivePage(Page.Assignments)} className="text-sm font-semibold text-primary hover:underline">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {urgentAssignments.map(assignment => (
                            <AssignmentCard key={assignment.id} assignment={assignment} />
                        ))}
                    </div>
                </section>
                
                <section>
                     <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center"><AiToolsIcon/> <span className="ml-2">AI-Powered Study Tools</span></h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AiToolCard title="Generate Study Plan" description="Personalized schedules" onClick={openStudyPlanDialog}/>
                        <AiToolCard title="Summarize Content" description="Lectures and readings" onClick={() => setActivePage(Page.AiTools)}/>
                        <AiToolCard title="AI Tutor Chat" description="Ask course questions" onClick={() => setActivePage(Page.AiTools)}/>
                        <AiToolCard title="Estimate Time" description="Predict assignment duration" onClick={() => setActivePage(Page.AiTools)}/>
                     </div>
                </section>

            </div>
            {isAiDialogOpen && (
                <AiToolDialog
                    isOpen={isAiDialogOpen}
                    onClose={() => setIsAiDialogOpen(false)}
                    title="Generate Study Plan"
                    initialPrompt="Generate a detailed study plan for the following topic/assignment: "
                />
            )}
        </>
    );
};

export default Dashboard;