import React, { useState } from 'react';
import { LightBulbIcon, AcademicCapIcon, ChatBubbleBottomCenterTextIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const TechSupport = () => {
    // State for the feedback form (to be submitted by the Village Tech Team)
    const [feedbackType, setFeedbackType] = useState("Adoption Feedback");
    const [feedbackDetails, setFeedbackDetails] = useState("");
    const [villageTeamMember, setVillageTeamMember] = useState("");
    const [submitStatus, setSubmitStatus] = useState(null); // null, 'loading', 'success', 'error'

    // Simulate API call for feedback submission
    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');
        
        // Basic form validation
        if (!villageTeamMember || !feedbackDetails) {
            setSubmitStatus('error');
            return;
        }

        const feedbackData = { feedbackType, feedbackDetails, villageTeamMember };

        try {
            // Placeholder for API call (e.g., fetch('/api/submit-tech-feedback', { method: 'POST', body: JSON.stringify(feedbackData) }))
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            setSubmitStatus('success');
            setFeedbackDetails("");
            // villageTeamMember is typically pre-filled by authentication, but we'll clear for the mock demo
            setVillageTeamMember(""); 

        } catch (error) {
            console.error("Feedback submission failed:", error);
            setSubmitStatus('error');
        }
    };

    // --- Component Structure ---
    return (
        <div className="min-h-screen bg-green-50 p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <header className="mb-10 text-center border-b-2 pb-4 border-green-200">
                    <div className="flex items-center justify-center text-green-700 mb-2">
                        <LightBulbIcon className="h-8 w-8 mr-2" />
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            Village Tech Adoption Team
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600">
                        Bridging the gap between the FW3 platform and the community.
                    </p>
                </header>

                {/* Grid for Information and Form */}
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* 1. Tech Team Mission and Role */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-green-600 h-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <UserGroupIcon className="h-6 w-6 inline mr-2 text-green-600" />
                            Mission & Mandate
                        </h2>
                        
                        <p className="mt-4 text-gray-600">
                            This temporary team, composed of **selected village youth**, is vital for the successful launch of the FW3 platform. Their role is twofold:
                        </p>
                        
                        <ul className="mt-4 space-y-3 text-sm text-gray-700">
                            <li className="flex items-start">
                                <AcademicCapIcon className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
                                <div>
                                    <span className="font-semibold text-gray-900">Education & Onboarding:</span> Teaching farmers and villagers the initial use of the website and its core services.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0" />
                                <div>
                                    <span className="font-semibold text-gray-900">Feedback Channel:</span> Providing real-world adoption feedback and bug reports to the main FW3 Tech Team (in urban/semi-rural areas).
                                </div>
                            </li>
                        </ul>
                        
                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                            <h3 className="font-semibold text-yellow-800">Termination Clause:</h3>
                            <p className="text-sm text-yellow-700">
                                This team is temporary and will be **terminated** once the community is proficient with the platform, ensuring the team is cost-effective and task-oriented.
                            </p>
                        </div>
                    </div>

                    {/* 2. Feedback and Issue Submission Form */}
                    <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-green-700">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Submit Feedback (For Village Team Only)
                        </h2>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 border border-green-300">
                                Feedback submitted successfully! The main Tech Team will review it shortly.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-300">
                                Submission failed. Please fill all fields or check your network connection.
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmitFeedback} className="space-y-4">
                            
                            {/* Member Name (Should be pre-filled via auth in production) */}
                            <div>
                                <label htmlFor="member" className="block text-sm font-medium text-gray-700 mb-1">Your Name / ID</label>
                                <input
                                    id="member"
                                    type="text"
                                    value={villageTeamMember}
                                    onChange={(e) => setVillageTeamMember(e.target.value)}
                                    placeholder="e.g., Sunil Varma (Volunteer ID 45)"
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200 shadow-sm"
                                />
                            </div>

                            {/* Feedback Type Selector */}
                            <div>
                                <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">Type of Report</label>
                                <select
                                    id="feedbackType"
                                    value={feedbackType}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200 shadow-sm bg-white appearance-none"
                                >
                                    <option>Adoption Feedback</option>
                                    <option>Technical Bug Report</option>
                                    <option>Content Clarification Request</option>
                                    <option>Feature Request from Villagers</option>
                                </select>
                            </div>

                            {/* Details Text Area */}
                            <div>
                                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Details & Observations</label>
                                <textarea
                                    id="details"
                                    rows="4"
                                    value={feedbackDetails}
                                    onChange={(e) => setFeedbackDetails(e.target.value)}
                                    placeholder="Describe the issue, common struggle, or suggestion observed..."
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200 shadow-sm"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={submitStatus === 'loading'}
                                className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center"
                            >
                                {submitStatus === 'loading' ? 'Sending Report...' : 'Submit Feedback to FW3 Tech Team'}
                            </button>
                        </form>
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default TechSupport;