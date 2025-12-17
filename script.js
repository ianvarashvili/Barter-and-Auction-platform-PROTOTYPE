// Function to handle filtering (Auction vs Barter)
function filterItems(type) {
    // Get all items
    const auctions = document.querySelectorAll('.item-auction');
    const barters = document.querySelectorAll('.item-barter');
    const buttons = document.querySelectorAll('.toggle-btn');

    // Update active button visual
    buttons.forEach(btn => {
        // We check if the clicked button matches the button in the loop
        // If the 'onclick' event triggered this function, event.target is the button clicked
        if(btn.getAttribute('data-filter') === type){
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Show/Hide logic
    if (type === 'all') {
        auctions.forEach(el => el.style.display = 'block');
        barters.forEach(el => el.style.display = 'block');
    } else if (type === 'auction') {
        auctions.forEach(el => el.style.display = 'block');
        barters.forEach(el => el.style.display = 'none');
    } else if (type === 'barter') {
        auctions.forEach(el => el.style.display = 'none');
        barters.forEach(el => el.style.display = 'block');
    }
}

// Modal Variables
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');

// Function to Open Modal
function openModal(itemName) {
    modalTitle.innerText = "Offer for: " + itemName;
    modal.style.display = 'flex';
}

// Function to Close Modal
function closeModal() {
    modal.style.display = 'none';
}

// Close modal if user clicks outside the white box
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}