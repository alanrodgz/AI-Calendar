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

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 p-4 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <CalendarIcon />
          <h1 className="text-xl font-bold text-gray-800">AI Calendar</h1>
        </div>
        <div className="flex items-center space-x-4">
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
          <div className="pt-16 md:pt-24 pb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Your Calendar, <span className="text-indigo-600">Intelligently</span> Organized
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of time management with our AI-powered calendar that learns your preferences and helps you build the perfect schedule.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <div className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
                <LoginButton />
              </div>
              <button 
                onClick={() => setShowDemo(true)} 
                className="px-8 py-3 rounded-lg bg-white text-indigo-600 font-medium border border-indigo-200 hover:border-indigo-300 hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
              >
                See Demo
              </button>
            </div>
          </div>

          {/* Demo Calendar Preview */}
          {showDemo && (
            <div className="mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>
              <div className="border border-gray-200 rounded-xl shadow-2xl overflow-hidden bg-white">
                <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-white">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon />
                    <h2 className="text-lg font-semibold text-gray-800">AI Calendar</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                      D
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                    {Array(35).fill(0).map((_, i) => {
                      const isToday = i === 15;
                      const hasEvents = [12, 15, 16, 19, 22, 25].includes(i);
                      return (
                        <div 
                          key={i} 
                          className={`aspect-square rounded-lg flex flex-col justify-start p-1 ${
                            isToday ? 'bg-indigo-100 text-indigo-800 font-medium' : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-xs text-right w-full">{i < 3 ? 28 + i : ((i - 3) % 31) + 1}</span>
                          {hasEvents && (
                            <div className="mt-auto mb-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mx-auto"></div>
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
          <div id="features" className="py-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Smart Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <BrainIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Learns Your Preferences</h3>
                <p className="text-gray-600">
                  Our AI studies your scheduling patterns and adapts to your preferred work hours, meeting times, and break periods.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <ClockIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Time Blocking</h3>
                <p className="text-gray-600">
                  Automatically blocks out time for deep work, meetings, and personal activities based on your productivity patterns.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <UsersIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Meeting Scheduling</h3>
                <p className="text-gray-600">
                  Suggests optimal meeting times based on participants availability and previous scheduling preferences.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div id="how-it-works" className="py-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-4 font-bold">1</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Calendar</h3>
                <p className="text-gray-600 text-sm">
                  Link your existing calendars and accounts. Well start analyzing your schedule patterns.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-4 font-bold">2</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Learns Your Style</h3>
                <p className="text-gray-600 text-sm">
                  Our AI observes how you organize your time and begins to understand your preferences.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-4 font-bold">3</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enjoy Smart Scheduling</h3>
                <p className="text-gray-600 text-sm">
                  Get intelligent suggestions and automated scheduling that respects your work-life balance.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="py-16 border-t border-gray-200">
            <div className="max-w-3xl mx-auto text-center px-4">
              <div className="text-indigo-600 mb-4">
                <ZapIcon />
              </div>
              <p className="text-xl md:text-2xl italic text-gray-700 mb-6">
                This AI calendar has completely transformed how I manage my time. Its like having a personal assistant who knows exactly how I work.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="ml-4 text-left">
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Product Manager</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-16 border-t border-gray-200">
            <div className="bg-indigo-600 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to transform your calendar experience?
              </h2>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are saving time and boosting productivity with AI-powered scheduling.
              </p>
              <div className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-indigo-600 font-medium hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl">
                <LoginButton />
                <ArrowRightIcon />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="py-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <CalendarIcon />
                <span className="text-lg font-semibold text-gray-800">AI Calendar</span>
              </div>
              <div className="flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} AI Calendar. All rights reserved.
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}