import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiMessageCircle, FiFileText, FiMic, FiTool, FiCompass, FiArrowRight } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { getProfile } from "../services/authApi";

const services = [
  {
    name: "AI Chat",
    description: "Ask questions, brainstorm study topics, and solve problems instantly.",
    slug: "ai-chatbot",
    icon: FiMessageCircle,
    accent: "accent-blue",
  },
  {
    name: "PDF Summarizer",
    description: "Turn long documents into concise study notes.",
    slug: "ai-pdf-summarizer",
    icon: FiFileText,
    accent: "accent-cyan",
  },
  {
    name: "Voice Help",
    description: "Speak your doubts and get instant answers.",
    slug: "voice-doubt-solver",
    icon: FiMic,
    accent: "accent-amber",
  },
  {
    name: "Project Support",
    description: "Get AI-backed guidance for your next assignment.",
    slug: "project-support-ai",
    icon: FiTool,
    accent: "accent-green",
  },
];

const navItems = [
  { label: "Overview", active: true },
  { label: "AI Chat", route: "/tool/ai-chatbot" },
  { label: "PDF Summarizer", route: "/tool/ai-pdf-summarizer" },
  { label: "Voice Help", route: "/tool/voice-doubt-solver" },
  { label: "Project Support", route: "/tool/project-support-ai" },
];

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle Google OAuth token from URL
    const token = searchParams.get('token');
    console.log('🔍 Services page loaded, token:', token ? 'present' : 'not found');
    
    if (token) {
      console.log('✅ Token detected in URL');
      // Store token
      localStorage.setItem('authToken', token);
      console.log('✅ Token stored in localStorage');
      
      // Fetch user profile
      const fetchUser = async () => {
        try {
          console.log('⏳ Fetching user profile...');
          const userData = await getProfile();
          console.log('✅ User profile fetched:', userData?.email);
          
          // Set user data
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('✅ User data stored in localStorage');
          
          // Update context
          login(userData, token);
          console.log('✅ Auth context updated');
        } catch (error) {
          console.error('❌ Failed to fetch user profile:', error);
          // Still navigate to services, user might be partially authenticated
        }
      };
      
      fetchUser();
      console.log('✅ Cleaning up URL');
      navigate('/services', { replace: true }); // Remove token from URL
    }


    const timer = setTimeout(() => setIsLoading(false), 260);
    return () => clearTimeout(timer);
  }, [searchParams, navigate, login]);

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">E</div>
          <div>
            <p className="brand-title">Edvance</p>
            <p className="brand-copy">AI student suite</p>
          </div>
        </div>

        <div className="sidebar-profile-card">
          <div className="profile-avatar">{user?.name?.[0] || "E"}</div>
          <div>
            <p className="profile-name">{user?.name || "Student"}</p>
            <p className="profile-email">{user?.email || "hello@edvance.ai"}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`sidebar-link ${item.active ? "active" : ""}`}
              onClick={() => item.route && navigate(item.route)}
            >
              <FiCompass size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <div className="eyebrow">Dashboard</div>
            <h1>Unlock powerful AI tools for smarter studying.</h1>
            <p className="dashboard-copy">
              Everything you need to summarize notes, resolve doubts, and build assignments lives in one focused workspace.
            </p>
          </div>
          <div className="topbar-actions">
            <button className="pill-button" type="button" onClick={() => navigate("/tool/ai-chatbot")}>Start Chat</button>
            <button className="pill-button outline" type="button" onClick={() => navigate("/tool/ai-pdf-summarizer")}>Summarize PDF</button>
          </div>
        </header>

        <section className="dashboard-search-panel">
          <div>
            <p className="panel-title">Search tools</p>
            <p className="panel-copy">Find the right AI assistant or explore a new productivity workflow.</p>
          </div>
          <div className="search-input-group">
            <FiSearch size={18} className="search-icon" />
            <input type="search" placeholder="Search AI tools, notes, or workflows" />
          </div>
        </section>

        {isLoading ? (
          <div className="services-loading modern">
            <div className="loader" />
            <p>Loading your workspace...</p>
          </div>
        ) : (
          <section className="service-cards-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.slug} className="dashboard-card">
                  <div className={`dashboard-card-icon ${service.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2>{service.name}</h2>
                    <p>{service.description}</p>
                  </div>
                  <button className="dashboard-card-action" type="button" onClick={() => navigate(`/tool/${service.slug}`)}>
                    Open <FiArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
};

export default Services;
