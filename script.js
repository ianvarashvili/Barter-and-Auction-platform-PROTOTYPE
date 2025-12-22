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
function openQuickView(name, price, desc, type, estValue = "") {
    const modal = document.getElementById('modal');
    
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-price').innerText = price;
    
    const statusLabel = document.getElementById('modal-status-label');
    const inputLabel = document.getElementById('input-label');
    const modalBtn = document.getElementById('modal-btn');
    const inputField = document.getElementById('offer-input');

    if (type === 'auction') {
        statusLabel.innerText = "Highest Bid / Starting:";
        inputLabel.innerText = "Your Bid (₾):";
        modalBtn.innerText = "Place Bid";
        modalBtn.className = "btn-main";
        inputField.placeholder = "e.g. 250";
    } else {
        statusLabel.innerText = "Trader Wants / Est. Value (" + estValue + "):";
        inputLabel.innerText = "What are you offering?";
        modalBtn.innerText = "Propose Trade";
        modalBtn.className = "btn-secondary";
        inputField.placeholder = "e.g. My old iPhone";
    }

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}
// Modal Variables
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');


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

function startTimer(duration, displayId) {
    let timer = duration;
    const display = document.getElementById(displayId);

    // If the element doesn't exist on the page, don't run the script
    if (!display) return;

    const interval = setInterval(function () {
        let hours = parseInt(timer / 3600, 10);
        let minutes = parseInt((timer % 3600) / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "STARTED";
            display.parentElement.style.color = "#C1121F"; // Change "Starts in" text to red
        }
    }, 1000);
}
// Start specific timers (duration in seconds)
window.onload = function () {
    startTimer(3600 * 2, "timer1"); // 2 hours for Item 1
    startTimer(120, "timer2");      // 2 minutes for Item 2
};

window.onload = function () {
    // startTimer(seconds, "ID_of_the_span")
    
    startTimer(7200, "timer1");  // 2 hours for the Camera
    startTimer(5500, "timer2");   // 5 minutes for the next item
    startTimer(1500, "timer3");  // 25 minutes for the Desk
    
    // Add more here if you have more auction cards!
};