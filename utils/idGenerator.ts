/**
 * Generates a unique ID using Math.random and timestamp
 * Combines timestamp with random string for uniqueness
 */
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

/**
 * Generates a timestamp-based ID (alternative approach)
 * Combines timestamp with random suffix for uniqueness
 */
export const generateTimestampId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${random}`;
};
