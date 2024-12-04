import { environmentConfig } from '@src/configs';
import { AUTHORIZATION_ROLES } from '@src/constants';

// Utility function to check role
export const getRoleFromEmail = (email: string): string => {
  const { ADMIN_EMAILS, MANGER_EMAILS, MODERATOR_EMAILS, SUPERVISOR_EMAILS, GUIDE_EMAILS } = environmentConfig;

  if (ADMIN_EMAILS && JSON.parse(ADMIN_EMAILS).includes(email)) return AUTHORIZATION_ROLES.ADMIN;
  if (MANGER_EMAILS && JSON.parse(MANGER_EMAILS).includes(email)) return AUTHORIZATION_ROLES.MANAGER;
  if (MODERATOR_EMAILS && JSON.parse(MODERATOR_EMAILS).includes(email)) return AUTHORIZATION_ROLES.MODERATOR;
  if (SUPERVISOR_EMAILS && JSON.parse(SUPERVISOR_EMAILS).includes(email)) return AUTHORIZATION_ROLES.SUPERVISOR;
  if (GUIDE_EMAILS && JSON.parse(GUIDE_EMAILS).includes(email)) return AUTHORIZATION_ROLES.GUIDE;

  return AUTHORIZATION_ROLES.USER;
};
