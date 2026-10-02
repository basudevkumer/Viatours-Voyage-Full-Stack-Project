// TODO(analytics): Connect this stable interface to the approved analytics provider.
export function track(eventName, props = {}) {
  return { eventName, props };
}

export function trackElement(element, props = {}) {
  const analyticsId = element?.dataset?.analyticsId;
  if (!analyticsId) return null;
  return track(analyticsId, props);
}
