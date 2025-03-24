"use client";
import { useState } from 'react';
import { useAuth } from './components/auth/AuthProvider';
import LoginButton from './components/auth/LoginButton';
import UserProfile from './components/auth/UserProfile';
import CalendarHeader from './components/calendar/CalendarHeader';
import CalendarGrid from './components/calendar/CalendarGrid';

// Simple icon components to replace Lucide icons
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.5H2.5a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.5h4.54a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5z"></path>
    <path d="M12 4.5v15"></path>
    <path d="M9 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
    <path d="M15 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

// const ZapIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
//   </svg>
// );

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default function Home() {
  const { user } = useAuth();
  const [showDemo, setShowDemo] = useState(false);
  
  // Smooth scroll to section with proper type annotation
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 py-4 px-6 flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="text-indigo-600">
            <CalendarIcon />
          </div>
          <h1 className="text-xl font-bold text-gray-800">AI Calendar</h1>
        </div>
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('features')}
            className="hidden md:block text-gray-600 font-medium hover:text-indigo-600 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="hidden md:block text-gray-600 font-medium hover:text-indigo-600 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="hidden md:block text-gray-600 font-medium hover:text-indigo-600 transition-colors"
          >
            Testimonials
          </button>
          {user ? <UserProfile /> : <LoginButton />}
        </div>
      </nav>

      {/* If logged in, show calendar app */}
      {user ? (
        <>
          <CalendarHeader />
          <CalendarGrid />
        </>
      ) : (
        // Landing page content for non-logged in users
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="pt-20 md:pt-28 pb-20 text-center">
            <div className="animate-fade-in-down">
              <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
                AI-Powered Scheduling
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Your Calendar, <span className="text-indigo-600 relative">
                  Intelligently
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-indigo-100 -z-10 transform -rotate-1"></span>
                </span> Organized
              </h1>
              <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience the future of time management with our AI-powered calendar that learns your preferences and helps you build the perfect schedule.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
                <button className="px-8 py-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform flex items-center justify-center gap-2">
                  <span>Get Started For Free</span>
                  <ArrowRightIcon />
                </button>
                <button 
                  onClick={() => setShowDemo(true)} 
                  className="px-8 py-4 rounded-lg bg-white text-indigo-600 font-medium border border-indigo-200 hover:border-indigo-300 hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform mt-4 sm:mt-0"
                >
                  See Demo
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <p className="text-4xl font-bold text-indigo-600">10,000+</p>
                <p className="text-gray-600 mt-2">Active Users</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <p className="text-4xl font-bold text-indigo-600">98%</p>
                <p className="text-gray-600 mt-2">Satisfaction Rate</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <p className="text-4xl font-bold text-indigo-600">5hrs</p>
                <p className="text-gray-600 mt-2">Saved Weekly</p>
              </div>
            </div>
          </div>

          {/* Demo Calendar Preview */}
          {showDemo && (
            <div className="mb-20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-50 to-transparent z-10 pointer-events-none"></div>
              <div className="border border-gray-200 rounded-xl shadow-2xl overflow-hidden bg-white transform perspective-1000 rotate-x-2">
                <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-white">
                  <div className="flex items-center space-x-2">
                    <div className="text-indigo-600">
                      <CalendarIcon />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">AI Calendar</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium">
                      D
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    {Array(35).fill(0).map((_, i) => {
                      const isToday = i === 15;
                      const hasEvents = [12, 15, 16, 19, 22, 25].includes(i);
                      const isWeekend = i % 7 === 0 || i % 7 === 6;
                      return (
                        <div 
                          key={i} 
                          className={`aspect-square rounded-lg flex flex-col justify-start p-2 ${
                            isToday ? 'bg-indigo-600 text-white font-medium' : 
                            isWeekend ? 'bg-gray-50 text-gray-400' : 'hover:bg-indigo-50 text-gray-700'
                          } transition-colors cursor-pointer`}
                        >
                          <span className={`text-sm ${isToday ? 'text-white' : ''}`}>{i < 3 ? 28 + i : ((i - 3) % 31) + 1}</span>
                          {hasEvents && (
                            <div className="mt-auto mb-1 flex gap-1 justify-center">
                              <div className={`h-1.5 w-1.5 rounded-full ${isToday ? 'bg-white' : 'bg-indigo-500'}`}></div>
                              {i === 15 && <div className="h-1.5 w-1.5 rounded-full bg-white"></div>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div id="features" className="py-20 border-t border-gray-200">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Features for Smarter Scheduling</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI-powered calendar comes packed with intelligent features to transform how you manage your time.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow transform hover:-translate-y-1 transition-transform">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 text-indigo-600">
                  <BrainIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Learns Your Preferences</h3>
                <p className="text-gray-600">
                  Our AI studies your scheduling patterns and adapts to your preferred work hours, meeting times, and break periods.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow transform hover:-translate-y-1 transition-transform">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 text-indigo-600">
                  <ClockIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Intelligent Time Blocking</h3>
                <p className="text-gray-600">
                  Automatically blocks out time for deep work, meetings, and personal activities based on your productivity patterns.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow transform hover:-translate-y-1 transition-transform">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 text-indigo-600">
                  <UsersIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Meeting Scheduling</h3>
                <p className="text-gray-600">
                  Suggests optimal meeting times based on participants availability and previous scheduling preferences.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div id="how-it-works" className="py-20 border-t border-gray-200">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Getting started with AI Calendar is simple and straightforward.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Connection line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-indigo-200 -translate-y-1/2 hidden md:block"></div>
              
              <div className="grid md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center p-6 relative">
                  <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-6 font-bold text-xl relative z-10">1</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect Your Calendar</h3>
                  <p className="text-gray-600">
                    Link your existing calendars and accounts. We ll start analyzing your schedule patterns.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 relative">
                  <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-6 font-bold text-xl relative z-10">2</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Learns Your Style</h3>
                  <p className="text-gray-600">
                    Our AI observes how you organize your time and begins to understand your preferences.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 relative">
                  <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-6 font-bold text-xl relative z-10">3</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Enjoy Smart Scheduling</h3>
                  <p className="text-gray-600">
                    Get intelligent suggestions and automated scheduling that respects your work-life balance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div id="testimonials" className="py-20 border-t border-gray-200">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Users Say</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  This AI calendar has completely transformed how I manage my time. Its like having a personal assistant who knows exactly how I work.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">SJ</div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Product Manager</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Ive tried many calendar apps before, but none of them understood my workflow like this one. The AI suggestions are spot-on!
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">MT</div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Michael Thompson</p>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-20 border-t border-gray-200">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-12 text-center relative overflow-hidden">
              {/* Abstract shapes */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Ready to transform your calendar experience?
                </h2>
                <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
                  Join thousands of professionals who are saving time and boosting productivity with AI-powered scheduling.
                </p>
                <button className="px-10 py-4 rounded-lg bg-white text-indigo-600 font-medium hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform inline-flex items-center space-x-3">
                  <span>Get Started For Free</span>
                  <ArrowRightIcon />
                </button>
                <p className="text-indigo-200 mt-6">No credit card required • Free 14-day trial</p>
              </div>
            </div>
          </div>


          {/* Footer */}
          <footer className="py-16 border-t border-gray-200">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-indigo-600">
                    <CalendarIcon />
                  </div>
                  <span className="text-xl font-bold text-gray-800">AI Calendar</span>
                </div>
                <p className="text-gray-600">
                  The intelligent calendar that adapts to your workflow and maximizes your productivity.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Integrations</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Updates</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} AI Calendar. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}