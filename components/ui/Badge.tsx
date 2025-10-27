import React from 'react';
import { AssignmentStatus } from '../../types';

interface BadgeProps {
  status: AssignmentStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const statusColors: Record<AssignmentStatus, string> = {
    [AssignmentStatus.ToDo]: 'bg-status-todo/20 text-status-todo',
    [AssignmentStatus.Upcoming]: 'bg-status-upcoming/20 text-status-upcoming',
    [AssignmentStatus.Overdue]: 'bg-status-overdue/20 text-status-overdue',
    [AssignmentStatus.Completed]: 'bg-status-completed/20 text-status-completed',
    [AssignmentStatus.Submitted]: 'bg-gray-500/20 text-gray-400',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default Badge;
