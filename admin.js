// Hardcoded examples of admins, business info, service, requests, and bills strings for testing
const adminAccounts = [
    { email: "admin@email.com", password: "password"},
    { email: "admin2@email.com", password: "password2"}
];

let bussinessInfo = {
    companyName: "Company 1",
    logo: "logo.png",
    address: "123 Genereci Street, Generic City, GIC G4C",
    phone: "123-456-7890"
};


let services = [
    {id: 1, serviceName: "Service 1", price: 500},
    {id: 2, serviceName: "Service 2", price: 100},
    {id: 3, serviceName: "Service 3", price: 400},
    {id: 4, serviceName: "Service 4", price: 300},
]

// ------------------------------------------- Admin Login ------------------------------------------------
function loginAdmin(event) {

    event.preventDefault();

    // Inputed email & password
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Check if the inputed username & password corresponds to a valid admin
    const validAdmin = adminAccounts.find(account => account.email === emailInput && account.password === passwordInput);

    if (validAdmin) {
        window.location.href = 'admin-dashboard.html'; // Leads to admin dashboard
    }
    else {
        alert("Incorrect email or password.");
    }

}

// ----------------------------------------- Business Settings --------------------------------------------
function editBusinessInfo(service) {

    service.preventDefault();

    // Inputed changed
    let newCompanyName = document.getElementById('companyName').value;
    let newLogo = document.getElementById('logo').value;
    let newAddress = document.getElementById('address').value;
    let newPhone = document.getElementById('phone').value;

    // Change the business information
    bussinessInfo.companyName = newCompanyName;
    bussinessInfo.logo = newLogo;
    bussinessInfo.address = newAddress;
    bussinessInfo.phone = newPhone;

    alert("Business information has been updated.")
   
}

// ------------------------------------------------ Services ------------------------------------------------

// Add Services
function addService(service){
services.push({id:services.length +1, newServiceName, newServicePrice});
alert("Service added")
}

// Edit Services
function editService(service){

    // Inputed service
    let serviceToModify = document.getElementById('serviceId').value;
    let newServiceName = document.getElementById('serviceName').value;
    let newServicePrice = document.getElementById('servicePrice').value;

    // Check if the service exists
    const validService = services.findIndex(service => service.id === serviceToModify);

    if(validService){

        // Change service information
        services.serviceName = newServiceName;
        services.Price = newServicePrice;
    }
    else {
        alert("Service not found");
    }
}

// Delete Service
function deleteService(service) {
    
    // Inputed service
    let serviceToModify = document.getElementById('serviceId').value;

    pop(services[serviceToModify -1]);

}


// ------------------------------------------------  ------------------------------------------------





