const NOTIFICATION_ACTION_TRANSLATION_KEYS: Record<string, string> = {
	CART_LOADED: 'notifications.actions.CART_LOADED',
	CART_LOAD_FAILED: 'notifications.actions.CART_LOAD_FAILED',
};

/**
 * Returns the i18n key for a known notification action, or null if the
 * action isn't recognized (e.g. an ad-hoc test notification), so callers can
 * fall back to showing the raw action code instead of a missing-key string.
 */
export function getNotificationActionTranslationKey(action: string): string | null {
	return NOTIFICATION_ACTION_TRANSLATION_KEYS[action] ?? null;
}

const ACTIONS_WITH_CAMPAIGN_REFERENCE = new Set(['CART_LOADED', 'CART_LOAD_FAILED']);

/**
 * Returns whether a notification's reference points to a campaign, so
 * callers can offer a shortcut to that campaign's detail page.
 */
export function isCampaignReferenceAction(action: string): boolean {
	return ACTIONS_WITH_CAMPAIGN_REFERENCE.has(action);
}
