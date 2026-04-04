const statusValues = ['pending', 'in-progress', 'completed'];

const validateCreateContact = (payload) => {
  const errors = [];

  if (!payload.name || typeof payload.name !== 'string' || payload.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!payload.email || typeof payload.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailPattern.test(payload.email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }

  const serviceTypes = ['Java', 'Bug Fix', 'Website', 'Assignment'];
  if (!payload.serviceType || !serviceTypes.includes(payload.serviceType)) {
    errors.push('Please select a valid service type');
  }

  if (!payload.message || typeof payload.message !== 'string' || payload.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateStatusUpdate = (payload) => {
  const errors = [];

  if (!payload.status || typeof payload.status !== 'string' || !statusValues.includes(payload.status)) {
    errors.push(`Status must be one of: ${statusValues.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateCreateContact,
  validateStatusUpdate,
  statusValues
};
