// Default password for new users
export const DEFAULT_USER_PASSWORD = 'AGD@2025';

// Password policies
export const PASSWORD_POLICY = {
  minLength: 8,
  requireSpecialChar: true,
  requireNumber: true,
  requireUppercase: true,
} as const;

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMINISTRATOR: 'administrator',
} as const;

// User status
export const USER_STATUS = {
  ACTIVE: true,
  INACTIVE: false,
} as const;