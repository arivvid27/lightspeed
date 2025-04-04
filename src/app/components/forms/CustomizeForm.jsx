import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addCustomOption } from '../../firebase/firestore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

const entryTypes = [
  { id: 'food', label: 'Food' },
  { id: 'medicine', label: 'Medicine' },
  { id: 'activity', label: 'Activity' },
  { id: 'therapy', label: 'Therapy' },
  { id: 'behavior', label: 'Behavior' },
  { id: 'progress', label: 'Progress' }
];

export default function CustomizeForm({ onSuccess, onCancel }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'food',
    name: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Option name is required');
      return;
    }
    
    setLoading(true);
    
    try {
      await addCustomOption(user.uid, {
        type: formData.type,
        name: formData.name.trim()
      });
      
      // Reset form
      setFormData({
        type: 'food',
        name: '',
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding custom option', error);
      setError('Failed to add custom option. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Category Type</label>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          disabled={loading}
          options={entryTypes.map(type => ({
            value: type.id,
            label: type.label
          }))}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Option Name</label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter new option name"
          error={error}
        />
      </div>
      
      <div className="flex space-x-2 pt-2">
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          className="flex-1"
        >
          Add Option
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}