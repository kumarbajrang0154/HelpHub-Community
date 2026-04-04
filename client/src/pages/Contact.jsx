import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { createContact } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Java',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await createContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', serviceType: 'Java', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit form. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-16 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container-max">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Submit your project details and we'll get back to you within 24 hours
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container-max">
          <div className="max-w-2xl mx-auto card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="Java">Java Project Help</option>
                  <option value="Bug Fix">Bug Fixing</option>
                  <option value="Website">Website Development</option>
                  <option value="Assignment">Assignment Help</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Describe your project or issue..."
                ></textarea>
              </div>

              {/* Messages */}
              {success && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <CheckCircle size={20} />
                  <span>Thank you! Your message has been sent successfully. We'll contact you soon.</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container-max">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-900">How quickly will I get a response?</h3>
              <p className="text-gray-600">We typically respond within 24 hours of your request.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-900">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major payment methods including PayPal, credit cards, and bank transfers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-900">Is my project information confidential?</h3>
              <p className="text-gray-600">Yes, all your project details are kept completely confidential and secure.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-900">Can you help with urgent requests?</h3>
              <p className="text-gray-600">Yes, we offer expedited services. Contact us to discuss your timeline.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
