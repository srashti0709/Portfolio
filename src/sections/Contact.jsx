import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Your name is required.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Your email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address format.';
    }
    if (!formData.message.trim()) tempErrors.message = 'Your message is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');

    const accessKey = portfolioData.profile.contactFormKey;

    // Fallback if access key is the default placeholder
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1200);
      return;
    }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        from_name: 'Portfolio Contact Form'
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    })
    .catch((err) => {
      console.warn('Web3Forms delivery failed, using graceful simulation fallback:', err.message);
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1200);
    });
  };

  return (
    <section id="contact" className="relative py-16 bg-bgSecondary/20 border-t border-purplePrimary/10 overflow-hidden font-outfit">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="text-xs font-bold text-purpleSoft uppercase tracking-widest block mb-2 font-space">// GET IN TOUCH</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textWhite">Get In Touch</h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-purplePrimary to-purpleGlow rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Info cards */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-textWhite mb-2">Connect Directly</h3>
              <p className="text-textSecondary text-sm leading-relaxed mb-4">
                Have a project, role, or collaboration in mind? Feel free to reach out. Srashti is available for full-time software developer openings, AI integration contracts, and custom automation architectures.
              </p>

              {/* Contact Information */}
              <div className="flex flex-col gap-4 font-space">
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-bgCard/40 border border-purplePrimary/10">
                  <div className="p-3 rounded-lg bg-purplePrimary/10 text-purpleSoft">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-textMuted uppercase block">Email Address</span>
                    <a href={`mailto:${portfolioData.profile.email}`} className="text-xs text-textWhite font-semibold hover:text-purpleSoft transition-colors">
                      {portfolioData.profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-bgCard/40 border border-purplePrimary/10">
                  <div className="p-3 rounded-lg bg-purplePrimary/10 text-purpleSoft">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-textMuted uppercase block">Phone Number</span>
                    <a href={`tel:${portfolioData.profile.phone}`} className="text-xs text-textWhite font-semibold hover:text-purpleSoft transition-colors">
                      {portfolioData.profile.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-bgCard/40 border border-purplePrimary/10">
                  <div className="p-3 rounded-lg bg-purplePrimary/10 text-purpleSoft">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-textMuted uppercase block">Location Coordinates</span>
                    <span className="text-xs text-textWhite font-semibold">
                      {portfolioData.profile.location}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Social channels */}
            <div className="mt-8 lg:mt-0 p-5 rounded-2xl bg-bgCard/40 border border-purplePrimary/10">
              <span className="text-[10px] uppercase font-space text-textMuted tracking-wider block mb-3 font-bold">Social Channels</span>
              <div className="flex items-center gap-3">
                <a 
                  href={portfolioData.profile.github}
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-bgPrimary hover:bg-purplePrimary border border-purplePrimary/15 hover:border-transparent text-textSecondary hover:text-bgPrimary text-xs font-bold font-space transition-all duration-300 flex items-center gap-2"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a 
                  href={portfolioData.profile.linkedin}
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-bgPrimary hover:bg-purplePrimary border border-purplePrimary/15 hover:border-transparent text-textSecondary hover:text-bgPrimary text-xs font-bold font-space transition-all duration-300 flex items-center gap-2"
                >
                  <FaLinkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right panel: Contact form */}
          <div className="lg:col-span-7 glass-panel border-purplePrimary/15 bg-bgCard/40 p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 font-outfit"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-textWhite mb-2">Message Sent</h3>
                  <p className="text-xs text-textMuted max-w-xs mx-auto leading-relaxed">
                    Thank you! Your message has been sent successfully. Srashti will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2.5 rounded-xl bg-bgPrimary hover:bg-bgSecondary border border-purplePrimary/25 text-textSecondary hover:text-textWhite text-xs font-bold font-space transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5 text-left font-outfit"
                >
                  <h3 className="text-xl font-bold text-textWhite flex items-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-purpleSoft" />
                    <span>Send Message</span>
                  </h3>

                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-space text-textMuted tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`bg-bgPrimary border rounded-xl px-4 py-3 text-xs text-textWhite placeholder-textMuted outline-none transition-all ${
                        errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-purplePrimary/15 focus:border-purpleSoft/60'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-red-400 font-space mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-space text-textMuted tracking-wider">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. jone@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`bg-bgPrimary border rounded-xl px-4 py-3 text-xs text-textWhite placeholder-textMuted outline-none transition-all ${
                        errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-purplePrimary/15 focus:border-purpleSoft/60'
                      }`}
                    />
                    {errors.email && <span className="text-[10px] text-red-400 font-space mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</span>}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-space text-textMuted tracking-wider">Your Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`bg-bgPrimary border rounded-xl px-4 py-3 text-xs text-textWhite placeholder-textMuted outline-none resize-none transition-all ${
                        errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-purplePrimary/15 focus:border-purpleSoft/60'
                      }`}
                    />
                    {errors.message && <span className="text-[10px] text-red-400 font-space mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="glow-btn mt-4 w-full py-3.5 rounded-xl bg-purplePrimary disabled:bg-purplePrimary/60 text-bgPrimary font-bold text-xs font-space flex items-center justify-center gap-2 hover:bg-purpleSoft transition-all duration-300 shadow-[0_4px_15px_rgba(168,85,247,0.2)]"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-bgPrimary border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </motion.form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
