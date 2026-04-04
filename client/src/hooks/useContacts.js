import { useEffect, useState, useCallback } from 'react';
import * as api from '../services/api';

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.getContacts();
      setContacts(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (id, status) => {
    setError(null);
    try {
      const updatedContact = await api.updateContactStatus(id, status);
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c._id === id ? updatedContact : c))
      );
      return updatedContact;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update status';
      setError(message);
      throw new Error(message);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return { contacts, loading, error, loadContacts, updateStatus };
};

export default useContacts;
