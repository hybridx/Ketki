export const userIsOnMobile = () => window.screen.width <= 699;
export const scrollToBottom = () =>
  window.scrollTo(0, document.body.scrollHeight);
export const scrollToTop = () => window.scrollTo(document.body.scrollHeight, 0);
