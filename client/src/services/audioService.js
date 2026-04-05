// Audio Service for notification sounds

const AUDIO_CACHE = {};

// Generate a simple beep sound using Web Audio API
export const playNotificationSound = async () => {
  try {
    // Check if audio is enabled in localStorage
    const soundEnabled = localStorage.getItem("chatbot_sound_enabled") !== "false";
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create oscillator for a pleasant ding sound
    const now = audioContext.currentTime;
    const duration = 0.3;

    // Create a simple ding: high note that fades
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + duration);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  } catch (error) {
    console.log("Audio playback not available:", error.message);
  }
};

// Toggle sound notifications
export const toggleSoundNotifications = (enabled) => {
  localStorage.setItem("chatbot_sound_enabled", enabled ? "true" : "false");
};

// Check if sound is enabled
export const isSoundEnabled = () => {
  return localStorage.getItem("chatbot_sound_enabled") !== "false";
};
