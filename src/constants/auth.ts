export const AUTHORIZATION_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SUPERVISOR: 'supervisor',
  MODERATOR: 'moderator',
  USER: 'user',
  CLIENT: 'client',
  GUIDE: 'guide'
};

export const GENDER_OPTIONS = ['male', 'female', 'other'] as const;

export const USER_AWARD_OPTIONS = ['Bronze', 'Silver', 'Gold'] as const;

export const USER_PLAN_OPTIONS = ['Free', 'Premium', 'Pro'] as const;

export const STATUS_OPTIONS = ['pending', 'active'] as const;
