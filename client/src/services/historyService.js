// Chat History Service for saving and retrieving conversations

const HISTORY_KEY = "chatbot_message_history";
const MAX_HISTORY_MESSAGES = 500; // Limit stored messages

export const historyService = {
  // Initialize history
  init: () => {
    const existing = localStorage.getItem(HISTORY_KEY);
    if (!existing) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(existing);
  },

  // Add message to history
  addMessage: (message) => {
    const history = historyService.init();
    const messageWithId = {
      ...message,
      id: `msg_${Date.now()}_${Math.random()}`,
      savedAt: new Date().toISOString(),
    };

    history.push(messageWithId);

    // Keep history size manageable
    if (history.length > MAX_HISTORY_MESSAGES) {
      history.shift();
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return messageWithId;
  },

  // Get all history
  getHistory: () => {
    return historyService.init();
  },

  // Get history with limit
  getRecentHistory: (limit = 50) => {
    const history = historyService.init();
    return history.slice(-limit);
  },

  // Get history by date range
  getHistoryByDateRange: (startDate, endDate) => {
    const history = historyService.init();
    return history.filter((msg) => {
      const msgDate = new Date(msg.savedAt);
      return msgDate >= startDate && msgDate <= endDate;
    });
  },

  // Search history
  searchHistory: (query) => {
    const history = historyService.init();
    const lowerQuery = query.toLowerCase();
    return history.filter((msg) => msg.text.toLowerCase().includes(lowerQuery));
  },

  // Get today's messages
  getTodaysMessages: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return historyService.getHistoryByDateRange(today, tomorrow);
  },

  // Get message count
  getMessageCount: () => {
    return historyService.init().length;
  },

  // Clear all history
  clearHistory: () => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  },

  // Clear old messages (older than X days)
  clearOldMessages: (daysOld = 30) => {
    const history = historyService.init();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const filtered = history.filter((msg) => new Date(msg.savedAt) > cutoffDate);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  },

  // Export history as JSON
  exportHistory: () => {
    const history = historyService.init();
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `chat-history-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  // Get statistics
  getStatistics: () => {
    const history = historyService.init();
    const userMessages = history.filter((m) => m.type === "user");
    const botMessages = history.filter((m) => m.type === "bot");

    return {
      totalMessages: history.length,
      userMessages: userMessages.length,
      botMessages: botMessages.length,
      avgUserMessageLength:
        userMessages.length > 0
          ? (userMessages.reduce((sum, m) => sum + m.text.length, 0) / userMessages.length).toFixed(0)
          : 0,
      avgBotMessageLength:
        botMessages.length > 0
          ? (botMessages.reduce((sum, m) => sum + m.text.length, 0) / botMessages.length).toFixed(0)
          : 0,
      todaysMessages: historyService.getTodaysMessages().length,
    };
  },
};
