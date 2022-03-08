import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

// analytics events

export const FBA_SCREEN_VIEW = 'screen_view';
export const FBA_PRODUCT_VIEW = 'product_view';
export const FBA_NAV_CLICKS = 'nav_clicks';
export const FBA_SEARCH_QUERY = 'search_query';
export const FBA_SEARCH_ZERO_RES = 'search_zero_results';
export const FBA_PRODUCT_DETAILS_VIEW = 'view_item';
export const FBA_PRODUCT_AFF_LINK_CLICK = 'aff_link_click';
export const FBA_PRODUCT_WISH_ADD = 'wishlist_add';
export const FBA_PRODUCT_WISH_REM = 'wishlist_rem';
export const FBA_PRODUCT_BOOK_ADD = 'bookmark_add';
export const FBA_PRODUCT_BOOK_REM = 'bookmark_rem';
export const FBA_PRODUCT_SHARE = 'share_product';
export const FBA_SIGNUP_OPEN = 'signup_open';
export const FBA_LOG_error = 'error_log';

export const sendAnalytics = (
  eventName: string,
  parameters: { [key: string]: any }
) => {
  // TODO: uncomment this later
  // if (analytics) {
  //   logEvent(analytics, eventName, parameters);
  // } else {
  //   console.log('Analytics is not enabled in this env.');
  // }
};

export const logScreenView = (parameter: {
  screen_name: 'home' | 'search' | 'product';
}) => {
  sendAnalytics(FBA_SCREEN_VIEW, parameter);
};

export const logProductView = (parameter: { product_id: string }) => {
  sendAnalytics(FBA_PRODUCT_VIEW, parameter);
};

export const logNavClicks = (parameter: {
  nav_link: 'relation' | 'interest' | 'occasion' | 'age' | 'search';
}) => {
  sendAnalytics(FBA_NAV_CLICKS, parameter);
};

export const logSignupOpen = (parameter: {
  source: 'home_cta' | 'nav_link' | 'product_wishlist' | 'product_bookmark';
}) => {
  sendAnalytics(FBA_SIGNUP_OPEN, parameter);
};

export const logSearchQuery = (parameter: {
  source:
    | 'quick_search'
    | 'nav_link'
    | 'showcase_see_all'
    | 'trending_search'
    | 'search_page_filter';
  search_query: { [key: string]: any };
}) => {
  sendAnalytics(FBA_SEARCH_QUERY, parameter);
};
