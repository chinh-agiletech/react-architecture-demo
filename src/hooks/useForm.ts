import { useState, useCallback } from 'react';

/**
 * Hook for managing form inputs
 * @param initialValues Initial form values
 * @returns Object containing form values, handleChange function, reset function, and setValues function
 */
function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value,
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  // Controlled update of all values at once
  const updateValues = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }));
  }, []);

  return {
    values,
    handleChange,
    reset,
    setValues: updateValues,
  };
}

export default useForm;
