import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <-- FIXED: Link is now imported
import { FireIcon, CheckCircleIcon, XCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

// --- INTERNAL HEADER COMPONENT (Stronger Branding) ---
const AppHeader = () => {
    return (
        <header className="bg-green-700 text-white shadow-xl sticky top-0 z-10">
            <div className="max-w-7xl mx-auto py-4 px-6 sm:px-8 lg:px-10 flex justify-between items-center">
                <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="text-white">Ministry of Agriculture</span> <span className="ml-2 text-yellow-300">🌾</span>
                </div>
                <nav className="hidden sm:flex space-x-6 text-white">
                    {/* Refactored <a> to use Link component for SPA navigation */}
                    <Link to="/dashboard" className="hover:text-green-300 transition duration-150 font-medium">Dashboard</Link>
                    <Link to="/reports" className="hover:text-green-300 transition duration-150 font-medium">Reports</Link>
                </nav>
            </div>
        </header>
    );
};
// --- INTERNAL FOOTER COMPONENT ---
const AppFooter = () => {
    return (
        <footer className="bg-green-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-6 sm:px-8 lg:px-10 text-center text-sm border-t border-green-800">
                <p>&copy; {new Date().getFullYear()} Government Farmer Assistance Portal. All rights reserved.</p>
                <p className="mt-1 text-green-300">Secure Data Protocol. For Government Use Only.</p>
            </div>
        </footer>
    );
};
// ---------------------------------------------------------------------------------


const GovAssistance = () => {
    const navigate = useNavigate();
    
    // State to hold form inputs
    const [village, setVillage] = useState("");
    const [disasterType, setDisasterType] = useState("");
    const [severity, setSeverity] = useState("Medium"); 
    
    // State for managing the API response and loading status
    const [triggerResponse, setTriggerResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    // Function to handle the form submission and API call
    const handleTrigger = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTriggerResponse(null);

        const triggerData = { village, disasterType, severity };

        try {
            const response = await fetch('http://localhost:3001/api/emergency-trigger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(triggerData),
            });

            const result = await response.json();

            if (response.ok) {
                setTriggerResponse({ 
                    success: true, 
                    ...result, 
                    village, 
                    disasterType 
                });
                
                // Clear form fields after success
                setVillage("");
                setDisasterType("");
                setSeverity("Medium");

            } else {
                setTriggerResponse({ success: false, message: result.message || 'Server error.' });
            }
        } catch (error) {
            console.error('Network Error:', error);
            setTriggerResponse({ success: false, message: 'Network error: Could not connect to the server (Is Node server running?).' });
        } finally {
            setLoading(false);
        }
    };

    // Handler for the navigation button
    const navigateToDashboard = () => {
        navigate('/assistance-dashboard'); 
    };

    // --- PROFESSIONAL STYLES (Focus ring and standard button now use green-700) ---
    const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-green-700 transition duration-200 shadow-sm";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    // Changed to green-700, the primary branding color
    const dashboardButtonClass = "w-full bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 flex items-center justify-center";

    // --- EMERGENCY ACCENT COLOR ---
    const emergencyColor = "red-700";

    return (
        // Main container background: bg-green-100
        <div className="flex flex-col min-h-screen bg-green-100">
            
            {/* 1. Header Component */}
            <AppHeader />
            
            {/* 2. Main Content Area */}
            <main className="flex-grow p-8 flex justify-center items-center"> {/* Changed items-start to items-center for slightly better centering on tall screens */}
                <div className="w-full max-w-lg mx-auto space-y-6">
                    
                    {/* EMERGENCY TRIGGER FORM (Accent red-700 for high alert) */}
                    <div className={`bg-white rounded-xl shadow-2xl overflow-hidden p-10 border-t-8 border-${emergencyColor}`}>
                        <div className="text-center mb-8">
                            <FireIcon className={`h-12 w-12 text-${emergencyColor} mx-auto mb-3 animate-pulse`} /> {/* Icon size increased for impact */}
                            <h2 className={`text-3xl font-extrabold text-${emergencyColor} tracking-tight`}>
                                Emergency Protocol Activation
                            </h2>
                            <p className="text-gray-500 mt-2 text-md">Trigger immediate data sharing for disaster relief claims.</p>
                        </div>

                        <form onSubmit={handleTrigger} className="space-y-6">
                            
                            {/* Input fields use green-700 for non-emergency focus */}
                            <div>
                                <label htmlFor="village" className={labelClass}>Affected Village Name</label>
                                <input
                                    id="village"
                                    type="text"
                                    placeholder="E.g., Shendurjane or Kumtha"
                                    value={village}
                                    onChange={(e) => setVillage(e.target.value)}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="disasterType" className={labelClass}>Disaster Type (Act of God)</label>
                                <select
                                    id="disasterType"
                                    value={disasterType}
                                    onChange={(e) => setDisasterType(e.target.value)}
                                    required
                                    className={`${inputClass} bg-white appearance-none`}
                                >
                                    <option value="">Select Disaster Type...</option>
                                    <option value="Flood">Flood</option>
                                    <option value="Earthquake">Earthquake</option>
                                    <option value="Tsunami">Tsunami</option>
                                    <option value="Cyclone">Cyclone</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="severity" className={labelClass}>Severity</label>
                                <select
                                    id="severity"
                                    value={severity}
                                    onChange={(e) => setSeverity(e.target.value)}
                                    className={`${inputClass} bg-white appearance-none`}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>
                            
                            {/* Emergency Button uses red-700 */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-${emergencyColor} text-white font-extrabold uppercase py-3 rounded-lg shadow-2xl hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-70 transition duration-200 disabled:bg-red-400 disabled:shadow-none tracking-wider`}
                            >
                                {loading ? 'SENDING ALERT...' : 'ACTIVATE EMERGENCY PROTOCOL'}
                            </button>
                        </form>

                        {/* Response Confirmation (Success/Failure) */}
                        {triggerResponse && (
                            <div className={`mt-8 p-5 rounded-xl border-l-4 ${triggerResponse.success ? 'bg-green-50 border-green-700' : 'bg-red-50 border-red-700'}`}>
                                <h3 className="font-bold text-xl text-gray-800 mb-2 flex items-center">
                                    {triggerResponse.success 
                                        ? <CheckCircleIcon className="h-6 w-6 text-green-700 mr-2" /> 
                                        : <XCircleIcon className="h-6 w-6 text-red-700 mr-2" />
                                    }
                                    {triggerResponse.success ? 'Action Successful!' : 'Action Failed!'}
                                </h3>
                                <p className="text-gray-700 text-sm pl-8">
                                    {triggerResponse.success 
                                        ? `Trigger activated for **${triggerResponse.village}** (${triggerResponse.disasterType}, ${triggerResponse.severity}). ${triggerResponse.message}`
                                        : `Error: ${triggerResponse.message}`
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                    
                    {/* NAVIGATION BUTTON (Now uses green-700) */}
                    <div className="w-full bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <ArrowRightIcon className="h-5 w-5 text-green-700 mr-2" />
                            Assistance Dashboard
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            For regular government schemes, financial claims, and status tracking services.
                        </p>
                        <button
                            onClick={navigateToDashboard}
                            className={dashboardButtonClass}
                        >
                            Go to Dashboard
                        </button>
                    </div>

                </div>
            </main>

            {/* 3. Footer Component */}
            <AppFooter />

        </div>
    );
};

export default GovAssistance;