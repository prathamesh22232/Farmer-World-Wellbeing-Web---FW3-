import React, { useState } from 'react';

// --- SIMULATED DATA (Replace with API calls in a real application) ---

// 1. Schemes Data
const availableSchemes = [
    { id: 1, name: "Kisan Samman Nidhi", village: "Shendurjane", eligibility: "Small & Marginal Farmers", status: "Active" },
    { id: 2, name: "Crop Insurance Subsidy", village: "All Villages", eligibility: "Any Farmer with registered land", status: "Active" },
    { id: 3, name: "Flood Relief Fund 2024", village: "Wai Gaon", eligibility: "Farmers with documented flood loss", status: "Closed (Processing)" },
];

// 2. Claims Status Data
const farmerClaims = [
    { id: "CL1001", scheme: "Kisan Samman Nidhi", amount: 6000, date: "2024-03-15", status: "Approved", remarks: "Funds transferred to SBI-123456789." },
    { id: "CL1002", scheme: "Flood Relief Fund 2024", amount: 25000, date: "2024-08-01", status: "In Review", remarks: "Tehsildar verification pending." },
    { id: "CL1003", scheme: "Crop Insurance Subsidy", amount: 12000, date: "2024-07-20", status: "Rejected", remarks: "Missing land registration document." },
];

// --- UTILITY FUNCTIONS & STYLES ---

const getStatusBadge = (status) => {
    switch (status) {
        case "Active":
        case "Approved":
            return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">{status}</span>;
        case "In Review":
        case "Processing":
        case "Closed (Processing)":
            return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">{status}</span>;
        case "Rejected":
            return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">{status}</span>;
        default:
            return <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
};

const tabClass = (active) => 
    `py-3 px-6 text-lg font-medium cursor-pointer transition-colors duration-300 ${
        active 
            ? 'border-b-4 border-indigo-600 text-indigo-700 bg-white' 
            : 'text-gray-600 hover:text-indigo-500 hover:bg-gray-50'
    }`;

const inputClass = "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";


const FarmerAssistanceDashboard = () => {
    // State to manage the active tab: 'schemes', 'claim', 'status'
    const [activeTab, setActiveTab] = useState('schemes');
    
    // State for the "File a New Claim" form
    const [claimData, setClaimData] = useState({
        farmerId: 'FARM101', // Pre-filled for a logged-in user
        schemeId: '',
        claimAmount: '',
        description: '',
    });
    const [claimSubmitted, setClaimSubmitted] = useState(null);
    const [claimLoading, setClaimLoading] = useState(false);


    const handleClaimSubmit = (e) => {
        e.preventDefault();
        setClaimLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            console.log('Claim Submitted:', claimData);
            setClaimSubmitted({
                id: "CL" + Math.floor(Math.random() * 9000 + 1000), // Generate random ID
                scheme: availableSchemes.find(s => s.id === parseInt(claimData.schemeId))?.name || "N/A",
                amount: claimData.claimAmount,
                date: new Date().toISOString().slice(0, 10),
                status: "Pending",
                remarks: "Initial submission received.",
            });
            setClaimLoading(false);
            // Optionally switch to the status tab
            setActiveTab('status');
        }, 1500);
    };

    // --- TAB RENDERING FUNCTIONS ---

    const renderSchemes = () => (
        <div className="space-y-4">
            <p className="text-gray-600 mb-6">Below are the government schemes relevant to your registered village(s).</p>
            {availableSchemes.map((scheme) => (
                <div key={scheme.id} className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900">{scheme.name}</h3>
                        {getStatusBadge(scheme.status)}
                    </div>
                    <p className="text-gray-700 mt-2"><strong>Village Focus:</strong> {scheme.village}</p>
                    <p className="text-gray-500 text-sm mt-1"><strong>Eligibility:</strong> {scheme.eligibility}</p>
                    <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-semibold border border-indigo-100 bg-indigo-50 px-3 py-1 rounded transition-colors"
                        onClick={() => {
                            setActiveTab('claim');
                            setClaimData(prev => ({ ...prev, schemeId: scheme.id }));
                        }}
                    >
                        Apply / View Details
                    </button>
                </div>
            ))}
        </div>
    );

    const renderFileClaim = () => (
        <form onSubmit={handleClaimSubmit} className="space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">File a New Financial Claim</h3>
            
            {/* Farmer ID (Read-only for security simulation) */}
            <div>
                <label className={labelClass}>Farmer ID (Automatic)</label>
                <input type="text" value={claimData.farmerId} readOnly className={`${inputClass} bg-gray-100 text-gray-500`} />
            </div>

            {/* Select Scheme */}
            <div>
                <label htmlFor="scheme" className={labelClass}>Select Assistance Scheme</label>
                <select
                    id="scheme"
                    value={claimData.schemeId}
                    onChange={(e) => setClaimData({...claimData, schemeId: e.target.value})}
                    required
                    className={`${inputClass} bg-white appearance-none`}
                >
                    <option value="">Choose an applicable scheme...</option>
                    {availableSchemes.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.village})</option>
                    ))}
                </select>
            </div>
            
            {/* Claim Amount */}
            <div>
                <label htmlFor="amount" className={labelClass}>Claim Amount (₹)</label>
                <input
                    id="amount"
                    type="number"
                    placeholder="E.g., 25000"
                    value={claimData.claimAmount}
                    onChange={(e) => setClaimData({...claimData, claimAmount: e.target.value})}
                    required
                    min="100"
                    className={inputClass}
                />
            </div>
            
            {/* Description/Justification */}
            <div>
                <label htmlFor="description" className={labelClass}>Detailed Description of Loss/Need</label>
                <textarea
                    id="description"
                    rows="4"
                    placeholder="Describe the nature of the loss (e.g., '50% crop loss due to heavy rains') and documentation uploaded."
                    value={claimData.description}
                    onChange={(e) => setClaimData({...claimData, description: e.target.value})}
                    required
                    className={inputClass}
                />
            </div>
            
            {/* File Upload (Placeholder) */}
            <div>
                <label htmlFor="documents" className={labelClass}>Upload Supporting Documents (e.g., Photo, FIR, Loss Report)</label>
                <input id="documents" type="file" multiple className="w-full text-gray-700 py-3" />
            </div>

            <button
                type="submit"
                disabled={claimLoading}
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 transition duration-200"
            >
                {claimLoading ? 'Submitting...' : 'Submit Financial Claim'}
            </button>
        </form>
    );

    const renderClaimStatus = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Your Financial Claim History</h3>
            
            {/* Render newly submitted claim if available */}
            {claimSubmitted && !farmerClaims.some(c => c.id === claimSubmitted.id) && (
                 <div className="p-4 border-2 border-indigo-400 rounded-lg bg-indigo-50 shadow-md">
                    <p className="font-bold text-indigo-700">Recent Submission:</p>
                    <p className="text-sm">Claim **{claimSubmitted.id}** submitted successfully. Status: {getStatusBadge(claimSubmitted.status)}</p>
                </div>
            )}

            {/* List of all claims */}
            {farmerClaims.map((claim) => (
                <div key={claim.id} className="bg-white border border-gray-200 p-5 rounded-lg shadow-md">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">Claim ID: {claim.id}</h4>
                        {getStatusBadge(claim.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                        <p><strong>Scheme:</strong> {claim.scheme}</p>
                        <p><strong>Amount:</strong> ₹{claim.amount.toLocaleString('en-IN')}</p>
                        <p><strong>Date Filed:</strong> {claim.date}</p>
                        <p><strong>Last Status Update:</strong> {claim.status}</p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 border-l-4 border-gray-300">
                        <p className="text-xs font-semibold text-gray-600">Remarks:</p>
                        <p className="text-sm text-gray-800">{claim.remarks}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'schemes':
                return renderSchemes();
            case 'claim':
                return renderFileClaim();
            case 'status':
                return renderClaimStatus();
            default:
                return renderSchemes();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
            
            <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                
                {/* Header and Tab Navigation */}
                <div className="bg-indigo-50 border-b border-indigo-100">
                    <div className="p-6 text-center">
                        <h2 className="text-3xl font-extrabold text-indigo-800">
                            Government Assistance Hub
                        </h2>
                        <p className="text-indigo-600 mt-1">Schemes, Financial Claims, and Status Tracking</p>
                    </div>
                    
                    <div className="flex justify-around bg-gray-100 border-t">
                        <div className={tabClass(activeTab === 'schemes')} onClick={() => setActiveTab('schemes')}>
                            Active Schemes
                        </div>
                        <div className={tabClass(activeTab === 'claim')} onClick={() => setActiveTab('claim')}>
                            File New Claim
                        </div>
                        <div className={tabClass(activeTab === 'status')} onClick={() => setActiveTab('status')}>
                            Claim Status
                        </div>
                    </div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 bg-gray-50">
                    {renderContent()}
                </div>

            </div>
        </div>
    );
};

export default FarmerAssistanceDashboard;