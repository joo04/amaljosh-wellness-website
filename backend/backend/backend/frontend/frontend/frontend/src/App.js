import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    health_concern: '',
    health_goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await axios.post(`${API}/contact`, formData);
      setSubmitStatus('success');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        health_concern: '',
        health_goals: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Get Your Free Consultation</h3>
      
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Thank you! Your message has been sent. We'll contact you within 24 hours.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Sorry, there was an error sending your message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Primary Health Concern
          </label>
          <select
            name="health_concern"
            value={formData.health_concern}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a concern</option>
            <option value="weight-management">Weight Management</option>
            <option value="diabetes">Diabetes</option>
            <option value="pcos">PCOS</option>
            <option value="digestive-issues">Digestive Issues</option>
            <option value="heart-health">Heart Health</option>
            <option value="skin-issues">Skin Issues</option>
            <option value="family-health">Family Health</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tell me about your health goals *
          </label>
          <textarea
            name="health_goals"
            value={formData.health_goals}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Describe your health goals and what you'd like to achieve..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

// Main App Component
function App() {
  useEffect(() => {
    // Test API connection
    const testConnection = async () => {
      try {
        const response = await axios.get(`${API}/health`);
        console.log('API connected successfully:', response.data);
      } catch (error) {
        console.error('API connection error:', error);
      }
    };
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-green-600">Amal Josh</h1>
              <span className="ml-2 text-gray-600">Wellness Centre</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600">Home</a>
              <a href="#about" className="text-gray-700 hover:text-green-600">About</a>
              <a href="#services" className="text-gray-700 hover:text-green-600">Services</a>
              <a href="#testimonials" className="text-gray-700 hover:text-green-600">Success Stories</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Renukadevi M
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Dietician & Wellness Transformation Coach
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg inline-block mb-8">
              <p className="text-2xl font-semibold text-green-600 mb-2">
                ✨ "From Illness to Wellness, From Family to Forever." ✨
              </p>
              <p className="text-lg text-gray-700">
                "Turning Personal Struggles into Family Wellness Stories"
              </p>
            </div>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8">
              From battling my family's health challenges including cancer, PCOS, and chronic conditions, 
              I discovered the power of natural healing. Now I help 100+ families transform their lives 
              through personalized nutrition and holistic wellness.
            </p>
            <p className="text-lg font-semibold text-blue-600 mb-8">
              🌍 Serving Online & Offline Globally | Wide Community across India, Singapore, Australia, UK, UAE, Middle East, US, Switzerland & more
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                Join My Wellness Community
              </a>
              <a href="#about" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                Read My Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Amal Josh Mission 2030</h2>
            <p className="text-xl text-gray-600">Making 100,000 Families Healthier and Happier on or before 2030</p>
            <p className="text-lg text-green-600 mt-2">Value-Added Holistic Wellness Services | Mind • Body • Spirit Integration</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100K+</div>
              <div className="text-gray-700">Mission by 2030</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">Global</div>
              <div className="text-gray-700">Community Reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Holistic Wellness Services</h2>
            <p className="text-xl text-gray-600 mb-2">
              From Ayurvedic nutrition to specialized family health programs, I offer personalized solutions for every stage of life and every health challenge through our value-added holistic approach.
            </p>
            <p className="text-lg text-green-600">
              🌿 Holistic Healing Approach: Mind • Body • Spirit Integration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ayurvedic Nutrition",
                description: "Ancient wisdom meets modern nutrition science for holistic healing and balance."
              },
              {
                title: "Family Health Reversal",
                description: "Comprehensive health transformation programs for the entire family unit."
              },
              {
                title: "Obesity & Fat Management",
                description: "Natural, sustainable weight management without crash diets or surgery."
              },
              {
                title: "Skin Care - Inner & Outer",
                description: "Healing skin conditions from within through targeted nutrition and care."
              },
              {
                title: "Kids Nutrition",
                description: "Specialized nutrition programs for growing children and adolescents."
              },
              {
                title: "Heart Health",
                description: "Cardiovascular wellness through natural nutrition and lifestyle changes."
              },
              {
                title: "Digestive Health",
                description: "Restore gut health and digestive harmony through targeted nutrition."
              },
              {
                title: "Bone & Joint Health",
                description: "Strengthen bones and joints naturally for long-term mobility and comfort."
              },
              {
                title: "Women and Men Nutrition",
                description: "Specialized nutrition programs addressing gender-specific health needs, hormonal balance, and life stage requirements."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Wellness Journey</h2>
            <p className="text-xl text-gray-600">
              Ready to transform your health naturally? Let's discuss your unique needs and create a personalized wellness plan that works for you and your family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="font-bold text-gray-700 w-20">Email:</span>
                    <a href="mailto:devirenuka301@gmail.com" className="text-blue-600 hover:underline">
                      devirenuka301@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-gray-700 w-20">Phone:</span>
                    <a href="tel:+918144925468" className="text-blue-600 hover:underline">
                      +91-8144925468
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Global Service Area</h4>
                <p className="text-gray-600">Online & Offline Worldwide</p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Response Time</h4>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-green-700 mb-3">🎯 Join Our Global Mission</h4>
                <p className="text-green-600 mb-2">Amal Josh Wellness Centre</p>
                <p className="text-sm text-gray-600 mb-2">GST No: 33AXIPR7042L2Z2</p>
                <p className="text-green-700 font-semibold">
                  ✨ "From Illness to Wellness, From Family to Forever." ✨
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Mission 2030: Make 100,000 Families Healthier and Happier
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4">
            "Transforming pain into power, struggles into strength, and every home into a sanctuary of health, hope, and happiness."
          </p>
          <p className="text-gray-400">
            © 2024 Amal Josh Wellness Centre. All rights reserved. | Registered Global Wellness Practice | Value-Added Holistic Services
          </p>
        </div>
      </footer>
    </div>
  );
}
