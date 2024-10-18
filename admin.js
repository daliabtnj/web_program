// Examples of service, requests, and bills strings for testing

const services = [
    { serviceName: 'Service 1' },
    { serviceName: 'Service 2' },
    { serviceName: 'Service 3' },
    { serviceName: 'Service 4' },
];

const requests = [
    { customerName: 'Name 1', requestedService: 'Service 1', status: 'Pending' },
    { customerName: 'Name 2', requestedService: 'Service 2', status: 'Completed' },
    { customerName: 'Name 3', requestedService: 'Service 1', status: 'Pending' },
];

const bills = [
    { customerName: 'Name 1', amount: '$100' },
    { customerName: 'Name 2', amount: '$500' },
    { customerName: 'Name 3', amount: '$700' },
];

// Service Object Constructor
function Service(serviceName, servicePrice) {
    this.serviceName = serviceName;
    this.servicePrice = servicePrice; // Corrected from servicePrive to servicePrice

    this.setServiceName = function (newName) {
        this.serviceName = newName; // Added functionality to set a new service name
    }
}

// Request Object Constructor
function Request(customerName, requestedService, status) {
    this.customerName = customerName;
    this.requestedService = requestedService;
    this.status = status;
}

// Bill Object Constructor
function Bill(customerName, requestedService, amount) {
    this.customerName = customerName;
    this.requestedService = requestedService; // Fixed to include requestedService
    this.amount = amount;
}

// Function to display the current services 
function displayServicesTable() {
    
   
}

// Function to display the current requests made by clients
function displayRequestsTable() {
   
}

// Function to get current bills 
function displayBillsTable() {
  
}

// Call the appropriate populate function based on the current page
if (document.getElementById('services-table')) {
    populateServicesTable(); // Populate services if on Manage Services page
}
if (document.getElementById('requests-table')) {
    populateRequestsTable(); // Populate requests if on Customer Requests page
}
if (document.getElementById('bills-table')) {
    populateBillsTable(); // Populate bills if on Bills Management page
}
