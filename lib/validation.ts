// Input validation and sanitization utilities
// Server-side validation only - no browser bundle overhead

/**
 * Sanitizes text input by removing potentially dangerous characters
 * Server-side only - safe for XSS prevention without heavy library
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates and sanitizes form data
 */
export const validateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Invalid email address");
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.push("Subject must be at least 5 characters");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitizes contact form data
 */
export const sanitizeContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return {
    name: sanitizeInput(data.name.trim()),
    email: data.email.trim().toLowerCase(),
    subject: sanitizeInput(data.subject.trim()),
    message: sanitizeInput(data.message.trim()),
  };
};
