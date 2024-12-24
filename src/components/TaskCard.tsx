import React, { memo } from 'react';
import { format } from 'date-fns';
import { Clock, AlertTriangle } from 'lucide-react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = memo(({ task }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{task.description}</p>
      
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Clock className="w-4 h-4" />
        <span>Due: {format(new Date(task.due_date), 'MMM d, yyyy')}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[task.status]
          }`}
        >
          {task.status.replace('_', ' ')}
        </span>
        
        {new Date(task.due_date) < new Date() && task.status !== 'completed' && (
          <div className="flex items-center gap-1 text-red-500">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs">Overdue</span>
          </div>
        )}
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;