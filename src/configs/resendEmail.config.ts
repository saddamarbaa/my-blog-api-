import { Resend } from 'resend';

import { environmentConfig } from './custom-environment-variables.config';

export const resend = new Resend(environmentConfig?.RESEND_EMAIL_API_KEY);

export default resend;
