import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, User, CornerDownLeft } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Greeting Agent. I am Srashti's autonomous neural intelligence. Ask me anything about her experience, projects, or core tech stack.",
      time: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Preset query buttons
  const presets = [
    { label: 'Tell me about Srashti', text: 'Tell me about Srashti.' },
    { label: 'Show projects', text: 'Show her projects.' },
    { label: 'Download Resume', text: 'Download her resume.' },
    { label: 'Core Skills', text: 'What technologies does she know?' },
    { label: 'Explain InterviewAI', text: 'Explain the InterviewAI project.' },
    { label: 'Open GitHub', text: 'Open her GitHub.' },
  ];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: textToSend, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Dynamic responses matching user queries
    setTimeout(() => {
      let botResponse = "";
      const text = textToSend.toLowerCase();

      if (text.includes('about srashti') || text.includes('who is') || text.includes('summary')) {
        botResponse = `Srashti Shakya is a Software Developer based in Ajmer, Rajasthan. She is currently pursuing her Bachelor’s of Computer Application (BCA) at Dezyne École College (graduating in 2027). Her core passion is building scalable, AI-powered web applications using React.js, Node.js, Express, and MongoDB.`;
      } else if (text.includes('project') || text.includes('portfolio') || text.includes('show case')) {
        botResponse = `Srashti has developed several key production-style projects:
1. **Interview AI Platform**: An AI mock interviewer featuring live lip-synced audio/video avatars.
2. **HireMate AI**: An intelligent career assistant automating application processes using n8n agents and Google Gemini.
3. **ATM Management System**: A secure C++ console application utilizing relational MySQL transaction controls.

I will now scroll you down to the Projects section!`;
        // Trigger scroll
        scrollToSection('projects');
      } else if (text.includes('resume') || text.includes('download')) {
        botResponse = `Certainly! I am triggering the download for Srashti Shakya's professional resume. Please review her academic qualifications and technical accomplishments. Let me know if you need help contacting her.`;
        triggerDownload();
      } else if (text.includes('skill') || text.includes('technologies') || text.includes('languages') || text.includes('stack')) {
        botResponse = `Srashti's core technical profile consists of:
• **Languages**: C, C++, Java, JavaScript, VB.NET
• **Frontend**: React.js, HTML5, CSS3, Tailwind CSS
• **Backend**: Node.js, Express.js
• **Databases**: MongoDB, MySQL
• **Tools & Platforms**: Git, GitHub, n8n, Postman, REST APIs
• **Core Concepts**: OOP, Data Structures & Algorithms, Responsive Web Designs.`;
        scrollToSection('skills');
      } else if (text.includes('interviewai') || text.includes('interview ai')) {
        botResponse = `The **Interview AI Platform** is Srashti's flagship project. It simulates realistic, one-on-one interview experiences for job seekers. It features a real-time voice-interactive lip-synced AI avatar, dynamic resume-based question generation, and detailed performance reports. Built on React.js, Node.js/Express, MongoDB, and custom AI/Voice endpoints.`;
        scrollToSection('projects');
      } else if (text.includes('github') || text.includes('git')) {
        botResponse = `Opening Srashti's GitHub profile (github.com/srashti0709) in a new tab. She has repositories showcasing her projects, n8n automations, and C++ transactional architectures.`;
        window.open(portfolioData.profile.github, '_blank');
      } else if (text.includes('linkedin') || text.includes('link')) {
        botResponse = `Opening Srashti's LinkedIn profile in a new tab. Feel free to connect with her for job opportunities or collaborations!`;
        window.open(portfolioData.profile.linkedin, '_blank');
      } else if (text.includes('contact') || text.includes('hire') || text.includes('phone') || text.includes('email')) {
        botResponse = `You can reach out to Srashti directly:
• **Email**: srashtishakya07@gmail.com
• **Phone**: +91 8955054841
• **Location**: Ajmer, Rajasthan, India
I will scroll you to the Contact Form now.`;
        scrollToSection('contact');
      } else {
        botResponse = `I processed your request, but as Srashti's local model, I suggest exploring her credentials:
• Type 'projects' to inspect her full-stack AI platform.
• Type 'resume' to download her PDF credentials.
• Type 'skills' to check her technical expertise.
Or, you can type 'contact' to send her an email instantly.`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse, time: new Date() }]);
      setIsTyping(false);
    }, 1200);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 500);
    }
  };

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = portfolioData.profile.resumeUrl;
    link.download = 'Srashti_Shakya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-outfit">
      {/* Floating Chat Bubble trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-purplePrimary to-purpleGlow text-bgPrimary shadow-[0_0_25px_rgba(217,70,239,0.6)] flex items-center justify-center relative hover:scale-105 transition-all duration-300 border border-purpleSoft/30"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-pulse" />}
        <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-purpleSoft rounded-full border-2 border-bgPrimary animate-pulse" />
      </motion.button>

      {/* Expanded AI Widget Dialog Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] glass-panel bg-bgCard/95 border-purplePrimary/25 rounded-2xl flex flex-col overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          >
            {/* Widget Header */}
            <div className="p-4 border-b border-purplePrimary/20 bg-bgPrimary/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purplePrimary/20 flex items-center justify-center border border-purplePrimary/40 text-purpleSoft">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-textWhite flex items-center gap-1.5">
                    Srashti AI Agent <Sparkles className="w-3 h-3 text-purpleGlow animate-pulse" />
                  </h4>
                  <span className="text-[10px] uppercase font-space text-purpleSoft">Neural Query Engine</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-textMuted hover:text-textWhite transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Conversational Screen */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 scrollbar-thin">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex gap-2.5 max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 border ${
                    msg.sender === 'user' 
                      ? 'bg-purplePrimary/10 border-purplePrimary/30 text-purpleSoft' 
                      : 'bg-bgSecondary border-purpleSoft/30 text-textWhite'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  
                  <div className={`rounded-xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-purplePrimary text-bgPrimary font-semibold shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
                      : 'bg-bgSecondary/80 text-textSecondary border border-purplePrimary/10'
                  }`}>
                    {/* Preserve line breaks for lists */}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Bot typing loading bubble */}
              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%] self-start">
                  <div className="w-7 h-7 rounded-full bg-bgSecondary border border-purpleSoft/30 text-textWhite flex items-center justify-center text-xs flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="rounded-xl p-3 bg-bgSecondary/80 text-textSecondary border border-purplePrimary/10 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-purpleSoft rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-purpleSoft rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-purpleSoft rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Presets Grid */}
            <div className="px-4 py-2 bg-bgPrimary/40 border-t border-purplePrimary/10 flex gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(preset.text)}
                  className="px-2.5 py-1 text-[10px] font-space font-semibold rounded bg-bgCard hover:bg-purplePrimary/10 border border-purplePrimary/15 hover:border-purpleSoft/40 text-textSecondary hover:text-purpleSoft whitespace-nowrap transition-all duration-200"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Input Submission bar */}
            <div className="p-3 border-t border-purplePrimary/20 bg-bgPrimary/60 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask neural model..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
                className="flex-1 bg-bgCard border border-purplePrimary/15 focus:border-purpleSoft/50 rounded-xl px-3.5 py-2 text-xs text-textWhite placeholder-textMuted outline-none"
              />
              <button
                onClick={() => handleSendMessage(input)}
                className="p-2 rounded-xl bg-purplePrimary hover:bg-purpleSoft text-bgPrimary transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
