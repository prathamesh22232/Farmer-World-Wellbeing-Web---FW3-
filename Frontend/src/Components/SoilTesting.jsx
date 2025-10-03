import React, { useState } from "react";

const SoilTesting = () => {
    // ... (State variables remain the same)
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [officer, setOfficer] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [confirmation, setConfirmation] = useState(null);
    
    // Temporary list of soil testing officers (names only needed for dropdown)
    const officers = [
        "Yogesh Kadam",
        "Atharva Kulkarni", 
        "Rupali Shirnath",
        "Ankit Khamitkar",
    ];

    const handleBooking = async (e) => { 
        e.preventDefault();

        const bookingData = {
            name, date, time, officer, addressLine1, city, pincode, email, phone,
        };

        try {
            // 1. Send data to the backend API
            const response = await fetch('http://localhost:3001/api/book-appointment', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();

            if (response.ok) {
                // 2. If the API confirms success (and email was sent), update the confirmation
                setConfirmation({ 
                    ...bookingData, 
                    officerEmail: result.officerEmail 
                });
                
                // 3. Reset the form
                setName("");
                setDate("");
                setTime("");
                setOfficer("");
                setAddressLine1("");
                setCity("");
                setPincode("");
                setEmail("");
                setPhone("");

            } else {
                alert(`Booking Failed: ${result.message || 'Server error.'}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('Network error: Could not connect to the booking server (Is node server running?).');
        }
    };

    // --- ENHANCED STYLES START ---
    const inputClass = "w-full border border-gray-300 p-3 rounded-xl focus:ring-green-600 focus:border-green-600 transition duration-300 ease-in-out shadow-sm hover:border-green-400";
    const labelClass = "block text-sm font-semibold text-gray-800 mb-1";
    // --- ENHANCED STYLES END ---

    return (
        // ENHANCEMENT 1: Background Gradient
        <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-green-50 to-lime-100">
            {/* ENHANCEMENT 2: Form Container Styling */}
            <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-10 border-t-8 border-green-700 transition-all duration-500 hover:shadow-green-300/50">
                
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-green-900 drop-shadow-sm">
                        🌿 Soil Testing Appointment
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg">Book your slot and specify the farm location</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleBooking} className="space-y-6">
                    
                    {/* Farmer Name Input */}
                    <div>
                        <label htmlFor="name" className={labelClass}>Farmer Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="E.g., Anil Kumar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>

                    {/* Contact Details Section */}
                    <div className="pt-2">
                        <h4 className="text-xl font-bold text-green-700 mb-3 border-b-2 border-green-200 pb-2">Contact Details</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className={labelClass}>Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={inputClass}
                            />
                        </div>
                        
                        {/* Phone Input */}
                        <div>
                            <label htmlFor="phone" className={labelClass}>Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="E.g., 9876543210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Officer Select */}
                    <div>
                        <label htmlFor="officer" className={labelClass}>Select Testing Officer</label>
                        <select
                            id="officer"
                            value={officer}
                            onChange={(e) => setOfficer(e.target.value)}
                            required
                            className={`${inputClass} bg-white appearance-none`}
                        >
                            <option value="" disabled>Choose an Officer...</option>
                            {officers.map((off, idx) => (
                                <option key={idx} value={off}>
                                    {off}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* Date Input */}
                        <div>
                            <label htmlFor="date" className={labelClass}>Date</label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className={inputClass}
                            />
                        </div>
                        
                        {/* Time Input */}
                        <div>
                            <label htmlFor="time" className={labelClass}>Time</label>
                            <input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>
                    
                    {/* Address Section */}
                    <div className="pt-2">
                        <h4 className="text-xl font-bold text-green-700 mb-3 border-b-2 border-green-200 pb-2">Farm Location</h4>
                    </div>

                    {/* Address Line 1 Input */}
                    <div>
                        <label htmlFor="addressLine1" className={labelClass}>Address Line 1 / Village Name</label>
                        <input
                            id="addressLine1"
                            type="text"
                            placeholder="House/Farm number, Street, or Landmark"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* City Input */}
                        <div>
                            <label htmlFor="city" className={labelClass}>City/Taluka</label>
                            <input
                                id="city"
                                type="text"
                                placeholder="District or nearby city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className={inputClass}
                            />
                        </div>
                        
                        {/* Pincode Input */}
                        <div>
                            <label htmlFor="pincode" className={labelClass}>Pincode</label>
                            <input
                                id="pincode"
                                type="text"
                                placeholder="E.g., 400001"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* ENHANCEMENT 3: Submit Button Styling */}
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white font-extrabold text-lg py-3 rounded-xl shadow-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-500/70 transition duration-300 ease-in-out transform hover:scale-[1.005] active:scale-[0.99]"
                    >
                        ✅ Confirm Appointment
                    </button>
                </form>

                {/* ENHANCEMENT 4: Farmer Confirmation Section Styling */}
                {confirmation && (
                    <div className="mt-8 p-6 border-2 border-lime-500 rounded-2xl bg-lime-50 shadow-inner">
                        <h3 className="font-bold text-2xl text-lime-800 mb-4 flex items-center">
                            <svg className="w-7 h-7 mr-3 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Booking Success!
                        </h3>
                        <div className="space-y-3 text-gray-700">
                            <p><strong>Farmer:</strong> <span className="font-semibold text-green-900">{confirmation.name}</span></p>
                            <p><strong>Officer:</strong> <span className="font-semibold">{confirmation.officer}</span></p>

                            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
                                <p className="text-sm font-medium">
                                    The appointment has been confirmed! An email notification was sent to {confirmation.officer} at **{confirmation.officerEmail}**.
                                </p>
                            </div>

                            <h4 className="pt-3 text-lg font-bold text-lime-700 border-t mt-3">Appointment Details:</h4>
                            <p><strong>Date:</strong> <span className="font-medium">{confirmation.date}</span></p>
                            <p><strong>Time:</strong> <span className="font-medium">{confirmation.time}</span></p>
                            
                            <h4 className="pt-3 text-lg font-bold text-lime-700 border-t mt-3">Contact & Location:</h4>
                            <p><strong>Phone:</strong> <span className="font-medium">{confirmation.phone}</span> | <strong>Email:</strong> <span className="font-medium">{confirmation.email}</span></p>
                            <p><strong>Address:</strong> <span className="font-medium">{confirmation.addressLine1}, {confirmation.city} - {confirmation.pincode}</span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SoilTesting;