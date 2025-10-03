import React, { useState, useEffect } from 'react';
// FIX: Changed HandshakeIcon to the correct name, HandRaisedIcon, from the Heroicons library.
import { UsersIcon, HandRaisedIcon, ScaleIcon, ArrowRightIcon, CalendarDaysIcon, MegaphoneIcon } from '@heroicons/react/24/solid';

// Placeholder for data fetching - REPLACE with actual API calls
const fetchDealCommitteeData = async (villageId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
        villageName: "Shendurjane",
        currentCommittee: [
            { id: 101, name: "Pratap S. More", role: "Livestock Specialist", status: "Elected" },
            { id: 102, name: "Sarika K. Bhosle", role: "Negotiation Lead", status: "Elected" },
        ],
        election: {
            status: "Nomination Open", // Simulating a different election status
            date: "2026-05-20",
            detailsLink: "/elections/deal-123"
        },
    };
};

const DealCommitee = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const villageId = '123'; // Replace with dynamic user/village context
        fetchDealCommitteeData(villageId)
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch deal committee data:", err);
                setError("Could not load Deal Committee information. Please check the network.");
                setLoading(false);
            });
    }, []);

    // --- Loading and Error States ---
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-green-700">
                <svg className="animate-spin h-8 w-8 mr-3 text-green-700" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg font-medium">Loading Deal Committee Data...</p>
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

    // --- Main Component Structure ---
    return (
        <div className="min-h-screen bg-green-100 p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <header className="mb-10 text-center border-b-2 pb-4 border-green-200">
                    <div className="flex items-center justify-center text-green-700 mb-2">
                        {/* ICON USAGE FIX */}
                        <HandRaisedIcon className="h-8 w-8 mr-2" />
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            Village Deal Committee
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600">
                        {data.villageName} Village | Dedicated to Fair Livestock Trade
                    </p>
                </header>

                {/* Grid for key information */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">

                    {/* 1. Livestock Trade Guidance */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-green-700">
                        <h2 className="text-2xl font-bold text-gray-800">
                            <ScaleIcon className="h-6 w-6 inline mr-2 text-green-700" />
                            Livestock Trade Assistance
                        </h2>
                        <p className="mt-4 text-gray-600">
                            The committee ensures fair pricing and honest brokering for buying and selling farm animals, including **bulls, cows, goats, and poultry.**
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside ml-2">
                            <li>Certification and Health Check referrals.</li>
                            <li>Mediation of pricing disputes.</li>
                            <li>Organized local trade days (Haats).</li>
                        </ul>
                        <button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition duration-150 flex items-center justify-center">
                            View Available Livestock Market <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </button>
                    </div>

                    {/* 2. Election Status / Nomination Card */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-yellow-600">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                <CalendarDaysIcon className="h-6 w-6 inline mr-2 text-yellow-600" /> 
                                Election Status
                            </h2>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800 animate-pulse`}>
                                {data.election.status}
                            </span>
                        </div>
                        <p className="mt-4 text-gray-600">
                            The Deal Committee is elected by the village farmers via the electoral page, ensuring accountability to the local livestock traders.
                        </p>
                        <p className="text-lg font-semibold mt-2 text-yellow-700">
                            Nomination Deadline: {data.election.date}
                        </p>
                        <button className="mt-4 w-full text-yellow-800 border border-yellow-600 py-2 rounded-lg font-semibold hover:bg-yellow-50 transition duration-150 flex items-center justify-center">
                            Nominate a Farmer <MegaphoneIcon className="h-4 w-4 ml-2" />
                        </button>
                    </div>
                </div>

                {/* Committee Member List */}
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center">
                        <UsersIcon className="h-7 w-7 mr-2 text-green-700" />
                        Current Deal Committee Members
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
                        The Deal Committee operates under the governance of the main Market Committee.
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default DealCommitee;