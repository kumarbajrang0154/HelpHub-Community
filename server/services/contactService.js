const Contact = require('../models/Contact');

const createContact = async ({ name, email, serviceType, message }) => {
  const contact = new Contact({ name, email, serviceType, message, status: 'pending' });
  return contact.save();
};

const getAllContacts = async () => {
  return Contact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const updateContactStatus = async (id, status) => {
  return Contact.findByIdAndUpdate(
    id,
    { status, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );
};

const deleteContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
};
