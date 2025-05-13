
import React, { createContext, useState, useContext, useCallback } from 'react';
import { EB1AFormData, FormContextType } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from '../components/ui/use-toast';

// Default form data
const defaultFormData: EB1AFormData = {
  fullName: '',
  email: '',
  status: 'draft',
  awards: [],
  memberships: [],
  publishedMaterials: [],
  judgingExperiences: [],
  originalContributions: [],
  scholarlyArticles: [],
  exhibitions: [],
  leadingRoles: [],
  highSalaries: [],
  commercialSuccesses: []
};

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<EB1AFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Save form progress
  const saveProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      
      let formId = formData.id;
      
      if (!formId) {
        // Create a new form entry
        const { data, error } = await supabase
          .from('eb1a_forms')
          .insert([
            { 
              data: formData,
              status: 'draft',
              user_id: null // We're not using authentication for applicants
            }
          ])
          .select('id')
          .single();
          
        if (error) throw error;
        formId = data.id;
        
        // Update local state with the new ID
        setFormData(prev => ({ ...prev, id: formId }));
      } else {
        // Update existing form
        const { error } = await supabase
          .from('eb1a_forms')
          .update({ 
            data: formData,
            updated_at: new Date().toISOString(),
            status: 'draft'
          })
          .eq('id', formId);
          
        if (error) throw error;
      }
      
      toast({
        title: 'Progress saved',
        description: 'Your form progress has been saved successfully.',
      });
    } catch (error: any) {
      console.error('Error saving form:', error);
      toast({
        variant: 'destructive',
        title: 'Error saving progress',
        description: error.message || 'An error occurred while saving your progress.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  // Submit form
  const submitForm = useCallback(async () => {
    try {
      setIsLoading(true);
      
      if (!formData.id) {
        // Create and submit in one step
        const { error } = await supabase
          .from('eb1a_forms')
          .insert([
            { 
              data: { ...formData, status: 'submitted' },
              status: 'submitted',
              submitted_at: new Date().toISOString(),
              user_id: null
            }
          ]);
          
        if (error) throw error;
      } else {
        // Update existing form as submitted
        const { error } = await supabase
          .from('eb1a_forms')
          .update({ 
            data: { ...formData, status: 'submitted' },
            status: 'submitted',
            submitted_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', formData.id);
          
        if (error) throw error;
      }
      
      toast({
        title: 'Application submitted',
        description: 'Your EB1A application has been submitted successfully.',
      });
      
      // Update local state
      setFormData(prev => ({ ...prev, status: 'submitted' }));
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Error submitting application',
        description: error.message || 'An error occurred while submitting your application.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  // Context value
  const contextValue: FormContextType = {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    saveProgress,
    submitForm,
    isLoading
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
