// OpenAI Service for chatbot integration
// Uses native mocked responses if API key is not available

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const USE_REAL_API = !!OPENAI_API_KEY;

const mockResponses = {
  services: `We offer amazing AI services:\n✨ AI PDF Summarizer - Summarize PDFs instantly\n💬 AI Chatbot - Get instant answers\n🎤 Voice Doubt Solver - Ask questions by voice\n🚀 Project Support - Get coding help`,
  pricing: `Our pricing:\n• Free Services: PDF Summarizer, Chatbot\n• Premium Services: Voice Solver (₹49), Project Support (₹99)`,
  getStarted: `Here's how to get started:\n1️⃣ Sign up or log in\n2️⃣ Choose a service\n3️⃣ Upload your file or start chatting\n4️⃣ Get instant AI-powered results`,
};

export const getAIResponse = async (userMessage, userPlan = "free") => {
  try {
    if (!USE_REAL_API) {
      return getMockResponse(userMessage, userPlan);
    }

    // Real OpenAI API call
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for an AI learning platform called Edvance Platform. 
            You help students with AI tools for PDF summarization, doubt solving, project support, and chatting.
            The user is a ${userPlan} plan member.
            Keep responses concise and helpful. Mention premium features if user is on free plan.
            Always be friendly and encouraging.`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error:", response.status);
      return getMockResponse(userMessage, userPlan);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return getMockResponse(userMessage, userPlan);
  }
};

const getMockResponse = (userMessage, userPlan) => {
  const lowerMsg = userMessage.toLowerCase();

  if (lowerMsg.includes("service") || lowerMsg.includes("what do you offer")) {
    let response = mockResponses.services;
    if (userPlan === "premium") {
      response += "\n\n🎁 Premium: Access to all advanced features with priority support!";
    } else {
      response += "\n\n💎 Upgrade to Premium for priority support!";
    }
    return response;
  }

  if (lowerMsg.includes("price") || lowerMsg.includes("cost")) {
    let response = mockResponses.pricing;
    if (userPlan === "premium") {
      response += "\n\n✨ You have full premium access!";
    } else {
      response += "\n\nUpgrade now for premium benefits!";
    }
    return response;
  }

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    return `Hey there! 👋 Welcome to Edvance Platform. What would you like to know?`;
  }

  if (lowerMsg.includes("how does it work") || lowerMsg.includes("how to use")) {
    let response = mockResponses.getStarted;
    if (userPlan === "premium") {
      response += "\n\n✨ You have access to all premium features!";
    } else {
      response += "\n\nLooking for premium features? Upgrade your plan!";
    }
    return response;
  }

  if (lowerMsg.includes("pdf") || lowerMsg.includes("summarize")) {
    return `📄 AI PDF Summarizer:\n• Upload any PDF document\n• Get instant AI summary\n• Perfect for research papers, books, articles\n• Available to all users (Free)`;
  }

  if (lowerMsg.includes("premium") || lowerMsg.includes("upgrade")) {
    return `✨ Premium Membership Benefits:\n• Advanced AI responses\n• Priority customer support\n• Exclusive features\n• Special pricing on tools\n\nCurrent Plan: ${userPlan === "premium" ? "👑 Premium" : "📌 Free"}`;
  }

  if (lowerMsg.includes("help") || lowerMsg.includes("support")) {
    let response = `📞 Need help? I'm here for you!\n• Ask about our services\n• Questions about pricing\n• How to use the platform\n• Any other queries`;
    if (userPlan === "premium") {
      response += "\n\n✨ As a premium member, you get priority support!";
    } else {
      response += "\n\nUpgrade to Premium for priority support!";
    }
    return response;
  }

  // Default response based on plan
  if (userPlan === "premium") {
    return `I'm AI Assistant and I'm here to help! You're a premium member, so you get access to advanced features and priority support. What would you like to know about our services?`;
  } else {
    return `I'm AI Assistant! Feel free to ask me about our services, pricing, or how to use the platform. Want premium features? Just ask! 🚀`;
  }
};
