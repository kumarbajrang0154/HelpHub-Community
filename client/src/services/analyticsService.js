// Analytics Service for tracking chat usage and interactions

const ANALYTICS_KEY = "chatbot_analytics";

export const analytics = {
  // Initialize analytics
  init: () => {
    const existing = localStorage.getItem(ANALYTICS_KEY);
    if (!existing) {
      const initialData = {
        totalSessions: 0,
        totalMessages: 0,
        totalUserMessages: 0,
        totalBotMessages: 0,
        averageMessageLength: 0,
        feedbackRatings: [],
        expandToFullScreen: 0,
        lastSessionDate: null,
        sessionHistory: [],
      };
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(existing);
  },

  // Track new session
  trackSession: () => {
    const data = analytics.init();
    data.totalSessions += 1;
    data.lastSessionDate = new Date().toISOString();
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  },

  // Track message sent
  trackMessage: (messageLength, isUserMessage = true) => {
    const data = analytics.init();
    data.totalMessages += 1;

    if (isUserMessage) {
      data.totalUserMessages += 1;
    } else {
      data.totalBotMessages += 1;
    }

    // Update average message length
    if (data.totalMessages > 0) {
      data.averageMessageLength =
        (data.averageMessageLength * (data.totalMessages - 1) + messageLength) /
        data.totalMessages;
    }

    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  },

  // Track feedback
  trackFeedback: (messageId, rating) => {
    const data = analytics.init();
    data.feedbackRatings.push({
      messageId,
      rating, // "like" or "dislike"
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  },

  // Track expand to full screen
  trackExpand: () => {
    const data = analytics.init();
    data.expandToFullScreen += 1;
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  },

  // Get analytics
  getAnalytics: () => {
    return analytics.init();
  },

  // Get session stats
  getSessionStats: () => {
    const data = analytics.init();
    return {
      totalSessions: data.totalSessions,
      totalMessages: data.totalMessages,
      avgMessagesPerSession:
        data.totalSessions > 0 ? (data.totalMessages / data.totalSessions).toFixed(2) : 0,
      userMessagePercentage:
        data.totalMessages > 0
          ? ((data.totalUserMessages / data.totalMessages) * 100).toFixed(1)
          : 0,
      botMessagePercentage:
        data.totalMessages > 0
          ? ((data.totalBotMessages / data.totalMessages) * 100).toFixed(1)
          : 0,
      positiveRatings: data.feedbackRatings.filter((f) => f.rating === "like").length,
      negativeRatings: data.feedbackRatings.filter((f) => f.rating === "dislike").length,
      expandCount: data.expandToFullScreen,
    };
  },

  // Clear analytics
  clearAnalytics: () => {
    localStorage.removeItem(ANALYTICS_KEY);
    analytics.init();
  },
};
