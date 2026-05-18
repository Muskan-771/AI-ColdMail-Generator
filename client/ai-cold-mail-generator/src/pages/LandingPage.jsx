import React from "react";
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import { ArrowRightIcon, BoltIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
    const {user} = useAuth();

    const features = [
        {
            name: 'Lightning Fast Generation',
            description: 'Generate highly custom cold emails in seconds using state-of-the-art AI.',
            icon: BoltIcon,
        },
        {
            name: 'Omnichannel Outreach',
            description: 'Get an email, a follow-up, and a LinkedIn DM perfectly synced for your prospect.',
            icon: DocumentTextIcon,
        },
        {
            name: 'Higher Conversion Rates',
            description: 'Personalized copy ensures higher open rates and better reply outcomes.',
            icon: ChartBarIcon
        },
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary-100 selection:text-primary-900">

        {/* Navigation */}
        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md fixed w-full z-50 transition-all">
        
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <span className="text-2xl font-black bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                            MailGen AI
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <Link 
                                to="/dashboard"
                                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-200"
                            >
                                Go to Dashboard
                            </Link>    
                        ): (
                            <>
                              <Link 
                                  to="/login"
                                  className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 text-sm transition-colors"         
                              >
                                Log in
                              </Link>
                              <Link 
                                 to="/signup"
                                 className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-200"
                              >
                              Get Started
                              </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </nav>


        {/* Hero Section */}
        <div className="relative pt-32 pb-20 sm:pb-24 ovh5">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
                    Write Cold Emails That <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600">
                        Actually Get Replies
                    </span>
                </h1>
                <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Stop wasting hours drafting outreach. Enter your prospect's context, and let our AI generate the perfect structured sequence. Email, Follow-up, and LinkedIn DM all at once.
                </p>
                <div className="mt-10 flex justify-center gap-x-6">
                    <Link 
                       to={ user ? "/dashboard" : "/signup" }
                       className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-gray-900 hover:bg-gray-800 hover:scale-105 transition-all duration-200"
                    >
                     Start Generating for Free
                     <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>


        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <span className="text-xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                    MailGen AI
                </span>
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()}
                MailGen AI. All rights reserved.
                </p>
            </div>

        </footer>

        </div>
    )
}

export default LandingPage;