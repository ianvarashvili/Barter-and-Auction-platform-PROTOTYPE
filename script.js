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

// Function to handle the heart click
function toggleWishlist(element) {
    element.classList.toggle('active');
    
    // Add a little bounce effect when clicked
    element.style.transform = 'scale(1.3)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// Function to show ONLY items that have the 'active' heart
function showWishlist() {
    const allCards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.toggle-btn');

    // 1. Remove 'active' look from All/Auction/Barter buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // 2. Loop through all cards
    allCards.forEach(card => {
        const heart = card.querySelector('.wishlist-btn');
        
        // If the heart has the 'active' class, show it. Otherwise, hide it.
        if (heart.classList.contains('active')) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // 3. Simple check if wishlist is empty
    const activeHearts = document.querySelectorAll('.wishlist-btn.active');
    if (activeHearts.length === 0) {
        alert("Your wishlist is empty! Heart some items first.");
        filterItems('all'); // Go back to showing everything
    }
}