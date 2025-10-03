import React, { useState, useEffect } from 'react';
import { UsersIcon, CheckBadgeIcon, ChartBarIcon, CalendarDaysIcon, ArrowRightIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

// --- MOCK DATA AND API FUNCTIONS ---
// Placeholder for data fetching - REPLACE with actual API calls
const fetchCommitteeData = async (villageId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
        villageName: "Shendurjane",
        currentCommittee: [
            { id: 1, name: "Suresh P. Mali", role: "Chairman", status: "Elected (2024-2026)" },
            { id: 2, name: "Lata V. Patil", role: "Secretary", status: "Elected (2024-2026)" },
            { id: 3, name: "Ramesh D. Kulkarni", role: "Member", status: "Elected (2024-2026)" },
        ],
        election: {
            status: "Active", // Changed to Active for voting simulation
            date: "2025-10-30",
            candidates: [
                { id: 'CAND_A', name: "Anand M. Shinde", platform: "Water Management Focus", votes: 152 },
                { id: 'CAND_B', name: "Priya K. Deshmukh", platform: "Crop Insurance Reform", votes: 198 },
                { id: 'CAND_C', name: "Vijay R. Jadhav", platform: "Direct Market Access", votes: 105 },
            ]
        },
    };
};

const MarketCommitee = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // --- MOCK AUTH/VOTING STATE (Replace with actual Redux/Context state later) ---
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in
    const [hasVoted, setHasVoted] = useState(false); // Simulate if the user has already cast a vote
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [voteMessage, setVoteMessage] = useState(null);

    // --- FUNCTIONALITY FOR VOTING ---
    const handleVote = async (e) => {
        e.preventDefault();
        
        if (!selectedCandidate) {
            setVoteMessage({ success: false, text: "Please select a candidate before submitting." });
            return;
        }

        if (!isLoggedIn) {
            setVoteMessage({ success: false, text: "You must be logged in to cast your vote." });
            return;
        }
        
        setLoading(true);
        setVoteMessage(null);

        // API Call Placeholder: This is where you will implement the POST request to your backend
        try {
            // const voteResponse = await fetch('/api/cast-vote', { ... });
            // const result = await voteResponse.json();
            
            // --- MOCK SUCCESS RESPONSE ---
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            setHasVoted(true); 
            setVoteMessage({ 
                success: true, 
                text: `Your vote for **${selectedCandidate.name}** has been securely recorded on the blockchain.` 
            });

            // Optimistically update local data to show new vote count (for demo)
            setData(prevData => ({
                ...prevData,
                election: {
                    ...prevData.election,
                    candidates: prevData.election.candidates.map(candidate => 
                        candidate.id === selectedCandidate.id ? { ...candidate, votes: candidate.votes + 1 } : candidate
                    ),
                },
            }));

        } catch (err) {
            setVoteMessage({ 
                success: false, 
                text: "Vote failed: Network error or server processing issue. Please try again." 
            });
            console.error("Vote submission error:", err);
        } finally {
            setLoading(false);
        }
    };
    // ------------------------------------

    useEffect(() => {
        const villageId = '123';
        fetchCommitteeData(villageId)
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError("Could not load committee information.");
                setLoading(false);
            });
    }, []);

    // --- Loading and Error States ---
    if (loading && !data) { // Check data as well, so the loading spinner only shows on initial load
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-green-700">
                <svg className="animate-spin h-8 w-8 mr-3 text-green-700" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg font-medium">Loading Market Committee Data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center bg-red-100 border-l-4 border-red-700 text-red-800 rounded-lg shadow-md max-w-4xl mx-auto">
                <p className="font-bold text-xl">Error Loading Data</p>
                <p>{error}</p>
            </div>
        );
    }
    
    // --- Render Vote/Results Section ---
    const renderElectionCard = () => {
        if (!isLoggedIn) {
             return (
                <div className="bg-yellow-50 p-6 rounded-xl shadow-md border-l-4 border-yellow-600 text-yellow-800">
                    <h3 className="font-bold text-xl mb-1">Voting Access Restricted</h3>
                    <p className="text-sm">Please log in as a registered farmer to participate in the Market Committee election.</p>
                </div>
            );
        }

        if (hasVoted) {
            const totalVotes = data.election.candidates.reduce((sum, c) => sum + c.votes, 0);
            
            return (
                <div className="bg-green-50 p-6 rounded-xl shadow-md border-l-4 border-green-600">
                    <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
                        <CheckBadgeIcon className="h-6 w-6 mr-2" />
                        Thank You! Your Vote Is Secured.
                    </h3>
                    <p className="text-gray-600 mb-4">
                        You have successfully cast your vote for the **{data.villageName}** Market Committee.
                        See the current live results below:
                    </p>
                    <ul className="space-y-3">
                        {data.election.candidates.map((candidate) => (
                            <li key={candidate.id} className="text-sm">
                                <span className="font-semibold">{candidate.name}</span>
                                <div className="mt-1 flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div 
                                            className="bg-green-600 h-2.5 rounded-full" 
                                            style={{ width: `${(candidate.votes / totalVotes) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="ml-2 text-xs font-medium text-gray-700 w-10 text-right">
                                        {Math.round((candidate.votes / totalVotes) * 100) || 0}%
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        
        // Render Voting Form
        return (
            <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-green-700">
                <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
                    <AcademicCapIcon className="h-7 w-7 mr-2 text-green-700" />
                    Market Committee Voting Portal
                </h2>
                <p className="mb-4 text-gray-600">
                    Select the candidate who best represents your village's agricultural interests. 
                    <span className="font-semibold text-red-600">Your vote is final and cannot be changed.</span>
                </p>
                
                {voteMessage && (
                    <div className={`p-3 mb-4 text-sm rounded-lg ${voteMessage.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {voteMessage.text}
                    </div>
                )}
                
                <form onSubmit={handleVote} className="space-y-4">
                    {data.election.candidates.map((candidate) => (
                        <label 
                            key={candidate.id}
                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-150 ${selectedCandidate && selectedCandidate.id === candidate.id ? 'border-green-600 ring-2 ring-green-500 bg-green-50' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <input
                                type="radio"
                                name="candidate"
                                value={candidate.id}
                                checked={selectedCandidate && selectedCandidate.id === candidate.id}
                                onChange={() => setSelectedCandidate(candidate)}
                                className="h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <div className="ml-3">
                                <p className="font-semibold text-lg text-gray-800">{candidate.name}</p>
                                <p className="text-sm text-gray-500">Platform: {candidate.platform}</p>
                            </div>
                        </label>
                    ))}
                    
                    <button
                        type="submit"
                        disabled={loading || !selectedCandidate}
                        className="w-full mt-6 bg-green-700 text-white font-extrabold uppercase py-3 rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:bg-gray-400 disabled:shadow-none tracking-wider flex items-center justify-center"
                    >
                        {loading ? 'CASTING VOTE SECURELY...' : 'CAST MY VOTE'}
                    </button>
                </form>
            </div>
        );
    };

    // --- Main Component Render ---
    return (
        <div className="min-h-screen bg-green-100 p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <header className="mb-10 text-center border-b-2 pb-4 border-green-200">
                    <div className="flex items-center justify-center text-green-700 mb-2">
                        <UsersIcon className="h-8 w-8 mr-2" />
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            Village Market Committee
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600">
                        {data.villageName} Village | Ensuring Farmer Profitability ({' '}
                        <span className="font-semibold text-green-700">Hamibhav</span> )
                    </p>
                </header>

                {/* ELECTION/VOTING CARD (New Section) */}
                <div className="mb-10">
                    {renderElectionCard()}
                </div>

                {/* Grid for key information */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">

                    {/* 1. Election Status Card (Modified to reflect Active Election) */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-green-600">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                <CalendarDaysIcon className="h-6 w-6 inline mr-2 text-green-600" /> 
                                Current Election Status
                            </h2>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800 animate-pulse`}>
                                LIVE VOTING
                            </span>
                        </div>
                        <p className="mt-4 text-gray-600">
                            The election for the Market Committee is currently **active**. Eligible farmers (logged in) can cast their vote now.
                        </p>
                        <p className="text-lg font-semibold mt-2 text-green-700">
                            Voting Deadline: {data.election.date}
                        </p>
                        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-150 flex items-center justify-center">
                            Election Guidelines <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </button>
                    </div>

                    {/* 2. Profit Pricing Guidance (Hamibhav) */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-green-700">
                        <h2 className="text-2xl font-bold text-gray-800">
                            <ChartBarIcon className="h-6 w-6 inline mr-2 text-green-700" />
                            Profit Pricing Guidance (Hamibhav)
                        </h2>
                        <p className="mt-4 text-gray-600">
                            The Market Committee's core mission is to set **Hamibhav** (Profit Pricing) for farmers' produce.
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside ml-2">
                            <li>Market placement to secure competitive rates.</li>
                            <li>Deficit management and price stabilization.</li>
                            <li>Pricing feedback for key crops.</li>
                        </ul>
                        <button className="mt-4 w-full text-green-700 border border-green-700 py-2 rounded-lg font-semibold hover:bg-green-50 transition duration-150">
                            Check Latest Price Recommendations
                        </button>
                    </div>
                </div>

                {/* Committee Member List */}
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center">
                        <CheckBadgeIcon className="h-7 w-7 mr-2 text-green-700" />
                        Current Committee Members
                    </h2>
                    <ul className="space-y-4">
                        {data.currentCommittee.map((member) => (
                            <li key={member.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-150">
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">{member.name}</p>
                                    <p className="text-sm text-gray-600">{member.role}</p>
                                </div>
                                <span className="text-xs font-medium text-green-800">{member.status}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-sm text-gray-500 italic">
                        All committee members are required to be residents of {data.villageName} village.
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default MarketCommitee;