import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Loader } from 'lucide-react';
import useContacts from '../hooks/useContacts';

function Admin() {
  const { contacts, loading, error, updateStatus } = useContacts();
  const [updatingId, setUpdatingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [nextError, setNextError] = useState(null);

  const markAsCompleted = async (id) => {
    setNextError(null);
    setSuccessMessage(null);
    setUpdatingId(id);

    try {
      await updateStatus(id, 'completed');
      setSuccessMessage('Status updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setNextError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'pending':
        return { bgColor: 'bg-yellow-50', badgeColor: 'bg-yellow-100 text-yellow-800', icon: Clock };
      case 'in-progress':
        return { bgColor: 'bg-blue-50', badgeColor: 'bg-blue-100 text-blue-800', icon: Loader };
      case 'completed':
        return { bgColor: 'bg-green-50', badgeColor: 'bg-green-100 text-green-800', icon: CheckCircle };
      default:
        return { bgColor: 'bg-gray-50', badgeColor: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage all contact requests and their status</p>
        </div>

        {(error || nextError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
            <AlertCircle className="w-5 h-5 mr-3" />
            <p>{nextError || error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
            <CheckCircle className="w-5 h-5 mr-3" />
            <p>{successMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-1">Total Requests</p>
            <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {contacts.filter((c) => c.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-1">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {contacts.filter((c) => c.status === 'in-progress').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {contacts.filter((c) => c.status === 'completed').length}
            </p>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No contact requests yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Message</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => {
                    const { badgeColor, icon: StatusIcon } = getStatusStyles(contact.status);
                    return (
                      <tr key={contact._id} className="border-b hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{contact.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.serviceType}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{contact.message}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {contact.status !== 'completed' ? (
                            <button
                              onClick={() => markAsCompleted(contact._id)}
                              disabled={updatingId === contact._id}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                            >
                              {updatingId === contact._id ? (
                                <>
                                  <Loader className="w-4 h-4 animate-spin mr-2" />
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark Done
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-green-600 font-medium flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Done
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t text-sm text-gray-600">
              Showing <span className="font-semibold">{contacts.length}</span> contact requests
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
