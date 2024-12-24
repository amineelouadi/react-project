import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import { supabase } from '../lib/supabase';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { dispatch } = useTask();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          dispatch({ type: 'SET_TASKS', payload: data });
        } catch (error) {
          console.error('Error fetching tasks:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch tasks' });
        }
      };

      fetchTasks();
    }
  }, [user, dispatch]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
          <TaskList />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Create New Task</h2>
          <TaskForm />
        </div>
      </div>
    </div>
  );
};

export default Home;