// Javascript file managing the backend (server + database)
// use http://localhost:3000/index.html 

// Main Backend File: server.js


// Load environment variables
require('dotenv').config();

// Import necessary dependencies
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");


dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Database connection (direct credentials for XAMPP)
const db = mysql.createConnection({
    host: "localhost",    // XAMPP uses 'localhost'
    user: "root",         // Default username in XAMPP
    password: "",         // Default password is empty for XAMPP
    database: "service_hub_db" // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database.");

    // Explicitly select the database
    db.query("USE service_hub_db", (err) => {
        if (err) {
            console.error("Error selecting database:", err);
        } else {
            console.log("Database selected successfully.");
        }
    });
});

// Serve the frontend (public directory)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signin.html"));
});

app.get("/signup-client", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup-client.html"));
});

app.get("/signin-client", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signin-client.html"));
});

app.get("/signup-admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup-admin.html"));
});

app.get("/signin-admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signin-admin.html"));
});


db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database");
});

// POST route for customer signup
app.post('/signup-client', (req, res) => {
    const { name, email, phone, password } = req.body;

    // Input validation
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Check if email already exists
    const checkQuery = "SELECT * FROM Clients WHERE email = ?";
    db.query(checkQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error." });

        if (results.length > 0) {
            return res.status(409).json({ error: "Email already in use." });
        }

        // Insert the new client into the database
        const insertQuery = "INSERT INTO Clients (name, email, phone, password) VALUES (?, ?, ?, ?)";
        db.query(insertQuery, [name, email, phone, password], (err) => {
            if (err) return res.status(500).json({ error: "Failed to create user." });

            return res.status(201).json({ 
                message: "Customer account created successfully.", 
                user: { id: user.id, name: user.name, email: user.email },
                client_id: user.id  // Send the client_id

            });
        });
    });
});

// POST route for admin sign-up
app.post('/signup-admin', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const checkQuery = "SELECT * FROM Admins WHERE email = ?";
    db.query(checkQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error." });

        if (results.length > 0) {
            return res.status(409).json({ error: "Email already in use." });
        }

        const insertQuery = "INSERT INTO Admins (name, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [name, email, password], (err) => {
            if (err) return res.status(500).json({ error: "Failed to create user." });

            return res.status(201).json({ message: "Admin account created successfully." });
        });
    });
});

// POST route for client sign-in
app.post('/signin-client', (req, res) => {
    const { email, password } = req.body;
    console.log("Received email:", email, "Received password:", password);

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Query to find the user by email
    const query = "SELECT * FROM Clients WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error." });
        }

        // Check if a user with the given email exists
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = results[0];

        // Validate password
        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // Successful login
        console.log("Sign-in successful for:", email);
        return res.status(200).json({
            message: "Sign-in successful.",
            user: { id: user.id, name: user.name, email: user.email },
            client_id: user.id,  // Send the client_id

        });
    });
});

// POST route for admin sign-in
app.post('/signin-admin', (req, res) => {
    const { email, password } = req.body;
    console.log("Received email:", email, "Received password:", password);

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Query to find the admin by email
    const query = "SELECT * FROM Admins WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error." });
        }

        // Check if an admin with the given email exists
        if (results.length === 0) {
            console.log("Admin login failed: Invalid email or password.");
            return res.status(404).json({ error: "User not found." });
        }

        const user = results[0];

        // Validate password
        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // Successful login
        console.log("Sign-in successful for:", email);
        return res.status(200).json({
            message: "Sign-in successful.",
            user: { id: user.id, name: user.name, email: user.email }
        });
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// file upload
const fs = require('fs');
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));




/*----------------------------------------------------------------------------------------------------------------------*/
// what we need to import for backend


// Import the modify-services router
const modifyServicesRoutes = require('./Backend/modify-services');
// Use the modify-services routes with a prefix (/api)
app.use("/api", modifyServicesRoutes);

// Import the business settings router
const businessSettingsRoutes = require('./Backend/business-settings');
// Use the business settings routes
app.use("/api", businessSettingsRoutes);

// Import the customer account router
const clientSettingsRoutes = require('./Backend/edit-customer-account');
// Use the customer account routes
app.use("/api", clientSettingsRoutes);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Import the manage-requests router
const manageRequestsRoutes = require('./Backend/manage-requests');
app.use("/api", manageRequestsRoutes);

// Import the manage-bills router
const manageBillsRoutes = require('./Backend/manage-bills');
app.use("/api", manageBillsRoutes);


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ServiceRequest for customers requesting a service
app.post('/api/book-service', (req, res) => {
    const { client_id, service_id, status, date } = req.body;

    // Validate service_id
    if (!Number.isInteger(service_id)) {
        return res.status(400).json({ error: "Invalid service ID" });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ error: "Invalid date format. Expected YYYY-MM-DD." });
    }

    const query = `INSERT INTO ServiceRequests (client_id, service_id, status, date) VALUES (?, ?, ?, ?)`;

    db.query(query, [client_id, service_id, status, date], (err, result) => {
        if (err) {
            console.error("Error booking service:", err);
            return res.status(500).json({ error: "Failed to book service" });
        }
        res.status(200).json({ message: "Service booked successfully", bookingId: result.insertId });
    });
});

app.get('/api/get-client-requests', (req, res) => {
    const clientId = req.query.client_id; // Get client_id from query params

    if (!clientId) {
        return res.status(400).json({ error: "Client ID is required" });
    }

    const query = `SELECT * FROM ServiceRequests WHERE client_id = ?`;

    db.query(query, [clientId], (err, results) => {
        if (err) {
            console.error("Error fetching client requests:", err);
            return res.status(500).json({ error: "Failed to fetch client requests" });
        }
        res.status(200).json({ requests: results });
    });
});

app.get('/api/get-all-requests', (req, res) => {
    const query = `SELECT * FROM ServiceRequests`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching all requests:", err);
            return res.status(500).json({ error: "Failed to fetch all requests" });
        }
        res.status(200).json({ requests: results });
    });
});

