import { useState } from 'react';
import { Icons } from './Icons';

export default function LeadForm({ variant = 'default', source = 'general' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    honeypot: '', // Spam protection
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      setSubmitted(true);
      return;
    }
    
    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className={`bg-white rounded-2xl p-8 text-center ${variant === 'compact' ? '' : 'shadow-lg'}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.checkCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received!</h3>
        <p className="text-slate-600 mb-4">
          A technician from our network will contact you shortly.
        </p>
        <p className="text-sm text-slate-500">
          We typically respond within 30 minutes during business hours.
        </p>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`bg-white rounded-2xl ${variant === 'compact' ? 'p-6' : 'p-8 shadow-lg'}`}
    >
      {variant !== 'compact' && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Get a Free Quote</h3>
          <p className="text-slate-600 text-sm">Fast response • No obligation</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="absolute opacity-0 pointer-events-none"
          tabIndex={-1}
          autoComplete="off"
        />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Your Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="input"
            placeholder="John Smith"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="input"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            placeholder="john@example.com"
          />
        </div>
        
        {variant !== 'compact' && (
          <>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
                Service Needed
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select a service...</option>
                <option value="repair">Garage Door Repair</option>
                <option value="installation">New Door Installation</option>
                <option value="opener">Opener Repair/Install</option>
                <option value="spring">Spring Replacement</option>
                <option value="emergency">Emergency Service</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                Describe the Problem
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="input"
                placeholder="Tell us what's happening with your garage door..."
              />
            </div>
          </>
        )}
        
        <button 
          type="submit" 
          className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Get Free Quote'}
        </button>
        
        <p className="text-xs text-slate-500 text-center">
          By submitting, you agree to be contacted about your service request.
        </p>
      </div>
    </form>
  );
}
