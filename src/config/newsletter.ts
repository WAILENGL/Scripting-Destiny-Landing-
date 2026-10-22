/**
 * Waitlist & Newsletter Configuration
 *
 * Configured with Brevo Double Opt-in form action URL, list IDs, and template ID.
 */

export const BREVO_CONFIG = {
  // Brevo subscription form action URL
  formActionUrl:
    (import.meta.env.VITE_BREVO_FORM_ACTION_URL as string) ||
    "https://29f00198.sibforms.com/serve/MUIFAEi1N_8Of1975CSJl4xxtXo0w2P6785AstYTZLw0DmAalx7-3OzLj6KfFuTvXjTJHw1o2y9BK1LqyXQ3j5w9YuGbMZTr206ccmcgHQz6IHlw0vShChDG5M4BO3P2fHdapRlLdh6XS_W-XmGsclFE-5yF7TsBlOtaDXDY3063fvJndqTaJvhad-6vN7xGAC0ZNtk9HTmtyE8PJA==",

  // Brevo list IDs
  listIdWaitlist: 2, // "Scripting Destiny Sign Ups"
  listIdSubstack: 3, // Optional dedicated list for Substack essays

  // Double Opt-in email template ID in Brevo
  templateId: 6, // "Scripting Destiny - Double Opt-In"
};
