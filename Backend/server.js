const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const twilio = require('twilio'); // 👈 NEW: Twilio library for real SMS

// Ensure you have run 'npm install dotenv' and created a .env file
require('dotenv').config(); 

const app = express();
const PORT = 3001; // Server will run on port 3001

// 1. MIDDLEWARE SETUP
app.use(cors()); // Allow requests from your React app's origin
app.use(express.json()); // Allows the server to read JSON data from the client

// =========================================================================
//                             TWILIO CLIENT & AUTH
// =========================================================================

// Initialize Twilio Client
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
);

// =========================================================================
//                             DATA DEFINITIONS
// =========================================================================

// ** GOVERNMENT ASSISTANCE RECIPIENTS (Phone numbers will be used for real SMS) **
const GOVT_RECIPIENTS = {
    tehsildar: {
        email: "atharvakulkarrni@gmail.com",
        phone: "9518916651", // Indian Number (10 digits)
        role: "Tehsildar"
    },
    talathi: {
        email: "atharvak706@gmail.com",
        phone: "9689902706",
        role: "Talathi"
    },
    policePatil: {
        email: "2022bec014@sggs.ac.in",
        phone: "9689722003",
        role: "Police Patil"
    },
    stateGov: {
        email: "adityakulkarni2608@gmail.com",
        phone: "7709802706",
        role: "State Gov Disaster Cell"
    }
};

// ** FARMER DATABASE (Mock Data) **
const FARMER_DATABASE = [
    {
        id: "FARM101",
        name: "Yogesh Kadam",
        email: "yogesh.kadam@farm.com",
        phone: "9876512345",
        address: "Plot 14, Taluka Wai",
        village: "Shendurjane", 
        bankAccount: "SBI-123456789",
        financialStatus: "Marginal Farmer (Below Poverty Line)",
    },
    {
        id: "FARM102",
        name: "Rohit Deshmukh",
        email: "rohit.deshmukh@farm.com",
        phone: "9123456789",
        address: "Plot 22, Taluka Wai",
        village: "Shendurjane", 
        bankAccount: "HDFC-987654321",
        financialStatus: "Small Farmer",
    },
    {
        id: "FARM103",
        name: "Priya Bhosle",
        email: "priya.bhosle@farm.com",
        phone: "8888123456",
        address: "Plot 5, Taluka Karad",
        village: "Wai Gaon", 
        bankAccount: "ICICI-1122334455",
        financialStatus: "Large Farmer",
    },
    // ✅ CORRECTION: ADDING A FARMER FOR KUMTHA VILLAGE
    {
        id: "FARM104",
        name: "Amit Jadhav",
        email: "amit.jadhav@farm.com",
        phone: "8007006005",
        address: "Main Road, Kumtha",
        village: "Kumtha", 
        bankAccount: "PNB-4567890123",
        financialStatus: "Small Farmer",
    },
];

// ** SOIL TESTING OFFICER DATA **
const OFFICERS_DATA = {
    "Atharva Kulkarni": "atharvak706@gmail.com", 
    "Yogesh Kadam": "kadamyogiraj412@gmail.com",
    "Rupali Shirnath": "shirnathrupali@gmail.com",
    "Ankit Khamitkar": "ankit.khamitkar@gmail.com",
};

// =========================================================================
//                             UTILITY FUNCTIONS
// =========================================================================

// NODEMAILER TRANSPORTER (The email sending agent)
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send REAL SMS via Twilio
async function sendRealSmsAlert(recipient, message) {
    // Twilio requires E.164 format: +[Country Code][Number]. 
    const toPhoneNumber = `+91${recipient.phone}`; 
    
    try {
        const result = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number from .env
            to: toPhoneNumber 
        });
        console.log(`[Twilio] ✅ SMS sent successfully to ${recipient.role} (${toPhoneNumber}). SID: ${result.sid}`);
    } catch (error) {
        console.error(`[Twilio] ❌ Failed to send SMS to ${recipient.role} (${toPhoneNumber}):`, error.message);
    }
}

// Helper function to format farmer data into an HTML table for email
function formatFarmerDataToHtml(farmers) {
    if (farmers.length === 0) {
        return "<p>No registered farmer data found for this village in the database.</p>";
    }

    let tableHtml = `
        <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="background-color: #f2f2f2;">
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Bank A/C</th>
                <th>Financial Status</th>
            </tr>
    `;

    farmers.forEach(farmer => {
        tableHtml += `
            <tr>
                <td>${farmer.id}</td>
                <td>${farmer.name}</td>
                <td>${farmer.phone}</td>
                <td>${farmer.bankAccount}</td>
                <td>${farmer.financialStatus}</td>
            </tr>
        `;
    });

    tableHtml += `</table>`;
    return tableHtml;
}


// =========================================================================
//                               API ROUTES
// =========================================================================

// 1. API ROUTE TO HANDLE SOIL TESTING BOOKING
app.post('/api/book-appointment', async (req, res) => {
    const bookingDetails = req.body;
    const selectedOfficer = bookingDetails.officer;
    const officerEmail = OFFICERS_DATA[selectedOfficer];

    if (!officerEmail) {
        return res.status(400).send({ message: "Invalid officer selected." });
    }

    // Email Content for the Officer
    let mailOptions = {
        from: `Soil Test Booking System <${process.env.EMAIL_USER}>`,
        to: officerEmail,
        subject: `[ACTION REQUIRED] New Soil Test Appointment: ${bookingDetails.name}`,
        html: `
            <h3>New Appointment Details for ${selectedOfficer}:</h3>
            <p>A new soil testing appointment has been booked. Please follow up with the farmer.</p>
            <hr>
            <p><strong>Farmer Name:</strong> ${bookingDetails.name}</p>
            <p><strong>Date & Time:</strong> ${bookingDetails.date} at ${bookingDetails.time}</p>
            <p><strong>Farmer Phone:</strong> ${bookingDetails.phone}</p>
            <p><strong>Farmer Email:</strong> ${bookingDetails.email}</p>
            <p><strong>Location:</strong> ${bookingDetails.addressLine1}, ${bookingDetails.city} - ${bookingDetails.pincode}</p>
            <hr>
            <p style="color: grey; font-size: 0.8em;">This email was sent automatically by the booking system.</p>
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        
        res.status(200).send({ 
            message: "Appointment booked and email notification sent successfully!",
            officerEmail: officerEmail 
        });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send({ 
            message: "Booking failed. Internal server or email error.", 
            error: error.message 
        });
    }
});


// 2. API ROUTE FOR GOVERNMENT EMERGENCY ASSISTANCE TRIGGER
app.post('/api/emergency-trigger', async (req, res) => {
    const { village, disasterType, severity } = req.body;

    if (!village || !disasterType) {
        return res.status(400).send({ message: "Village and disaster type are required." });
    }

    // 1. Filter Database for Affected Farmers
    const affectedFarmers = FARMER_DATABASE.filter(farmer => 
        farmer.village.toLowerCase() === village.toLowerCase()
    );

    // Prepare list of all email recipients
    const allGovEmails = Object.values(GOVT_RECIPIENTS).map(r => r.email).join(', ');
    
    // 2. Prepare Email Content
    const farmerTableHtml = formatFarmerDataToHtml(affectedFarmers);

    // 3. Define Mail Options (Detailed Report)
    let mailOptions = {
        from: `Disaster Relief System <${process.env.EMAIL_USER}>`,
        to: allGovEmails, // Sends the detailed report to all
        subject: `🚨 URGENT: Disaster Relief Triggered for ${village} (${disasterType.toUpperCase()})`,
        html: `
            <h3 style="color: #CC0000; font-size: 1.5em;">Disaster Report: ${disasterType} in ${village} (Severity: ${severity})</h3>
            <p>Immediate action is required. ${affectedFarmers.length} registered farmer records are attached below for urgent assistance and verification.</p>
            <hr>
            ${farmerTableHtml}
            <hr>
            <p style="color: #0056b3; font-size: 0.9em;">Total Registered Farmers in Affected Village: ${affectedFarmers.length}.</p>
        `
    };

    // 4. Prepare SMS Message (Concise Alert)
    const smsMessage = `🚨 URGENT ALERT: Disaster (${disasterType}, Severity: ${severity}) triggered for Village: ${village}. ${affectedFarmers.length} farmer records shared via official email. Action required.`;
    
    // 5. Send Email and Real SMS
    try {
        // A. Send the Detailed Email Report
        await transporter.sendMail(mailOptions);
        console.log(`✅ Detailed Email Report sent for ${village} to all officials.`);
        
        // B. Send REAL SMS ALERT to each official using Twilio
        const recipientKeys = Object.keys(GOVT_RECIPIENTS);
        const smsPromises = recipientKeys.map(key => {
            return sendRealSmsAlert(GOVT_RECIPIENTS[key], smsMessage);
        });

        // Wait for all SMS send operations to complete (Twilio is asynchronous)
        await Promise.all(smsPromises);
        
        // 6. Final Response
        res.status(200).send({ 
            message: `Emergency trigger successful. ${affectedFarmers.length} farmer records shared via Email and Mobile Alert.`,
            recipients: allGovEmails 
        });

    } catch (error) {
        console.error("❌ Error during emergency trigger process:", error);
        res.status(500).send({ 
            message: "Emergency trigger failed. Internal server, email, or Twilio error. Check .env and Twilio console!", 
            error: error.message 
        });
    }
});


// =========================================================================
//                             SERVER START
// =========================================================================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});