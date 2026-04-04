const contactService = require('../services/contactService');
const asyncHandler = require('../utils/asyncHandler');
const { validateCreateContact, validateStatusUpdate } = require('../validation/contactValidation');

exports.createContact = asyncHandler(async (req, res) => {
  const validation = validateCreateContact(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: validation.errors });
  }

  const contact = await contactService.createContact(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Contact message submitted successfully',
    data: {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      serviceType: contact.serviceType,
      createdAt: contact.createdAt,
      status: contact.status
    }
  });
});

exports.getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await contactService.getAllContacts();
  res.json({ status: 'success', count: contacts.length, data: contacts });
});

exports.getContactById = asyncHandler(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  if (!contact) {
    return res.status(404).json({ status: 'error', message: 'Contact not found' });
  }

  res.json({ status: 'success', data: contact });
});

exports.updateContactStatus = asyncHandler(async (req, res) => {
  const validation = validateStatusUpdate(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: validation.errors });
  }

  const contact = await contactService.updateContactStatus(req.params.id, req.body.status);

  if (!contact) {
    return res.status(404).json({ status: 'error', message: 'Contact not found' });
  }

  res.json({ status: 'success', message: 'Contact updated successfully', data: contact });
});

exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactService.deleteContact(req.params.id);

  if (!contact) {
    return res.status(404).json({ status: 'error', message: 'Contact not found' });
  }

  res.json({ status: 'success', message: 'Contact deleted successfully' });
});
