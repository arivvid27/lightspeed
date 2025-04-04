import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addEntry, getUserCustomOptions } from '../../firebase/firestore';
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

export default function EntryForm({ onSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [customOptions, setCustomOptions] = useState({});
  const [formData, setFormData] = useState({
    type: 'food',
    category: '',
    description: '',
    value: '',
    notes: ''
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (user) {
      loadCustomOptions();
    }
  }, [user]);

  useEffect(() => {
    if (user && formData.type) {
      // Set options based on type
      const defaultOptions = user.settings?.defaultCategories?.[formData.type] || [];
      const customTypeOptions = customOptions[formData.type] || [];
      
      setOptions([...defaultOptions, ...customTypeOptions]);
      // Reset category when type changes
      setFormData(prev => ({ ...prev, category: '' }));
    }
  }, [user, formData.type, customOptions]);

  const loadCustomOptions = async () => {
    try {
      const options = await getUserCustomOptions(user.uid);
      
      // Group options by type
      const groupedOptions = options.reduce((acc, option) => {
        if (!acc[option.type]) {
          acc[option.type] = [];
        }
        acc[option.type].push(option.name);
        return acc;
      }, {});
      
      setCustomOptions(groupedOptions);
    } catch (error) {
      console.error('Error loading custom options', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addEntry(user.uid, {
        ...formData,
        date: new Date().toISOString()
      });
      
      // Reset form
      setFormData({
        type: 'food',
        category: '',
        description: '',
        value: '',
        notes: ''
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting entry', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomOption = () => {
    // Open modal or form to add custom option
    // This would be implemented in a separate component
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Entry Type</label>
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
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium mb-1">Category</label>
          <button 
            type="button"
            onClick={handleAddCustomOption}
            className="text-sm text-blue-500 hover:underline"
          >
            + Add Custom
          </button>
        </div>
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
          options={options.map(option => ({
            value: option,
            label: option
          }))}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          placeholder="Brief description"
        />
      </div>
      
      {formData.type === 'progress' && (
        <div>
          <label className="block text-sm font-medium mb-1">Progress Value</label>
          <Select
            name="value"
            value={formData.value}
            onChange={handleChange}
            disabled={loading}
            options={[
              { value: '-2', label: 'Major Regression (-2)' },
              { value: '-1', label: 'Minor Regression (-1)' },
              { value: '0', label: 'No Change (0)' },
              { value: '1', label: 'Minor Improvement (+1)' },
              { value: '2', label: 'Major Improvement (+2)' }
            ]}
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          disabled={loading}
          placeholder="Additional notes or observations"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className="w-full"
      >
        Save Entry
      </Button>
    </form>
  );
}