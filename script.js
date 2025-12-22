// Function to handle filtering (Auction vs Barter)
function filterItems(type) {
    const auctions = document.querySelectorAll('.item-auction');
    const barters = document.querySelectorAll('.item-barter');
    const buttons = document.querySelectorAll('.toggle-btn');

    buttons.forEach(btn => {
        if(btn.getAttribute('data-filter') === type){
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

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

function openQuickView(name, startPrice, desc, type, extraValue = "", extraDetail = "") {
    const modal = document.getElementById('modal');
    const wantsContainer = document.getElementById('modal-wants-container');
    const wantsDetailText = document.getElementById('modal-wants-detail');
    const statusLabel = document.getElementById('modal-status-label');
    const priceDisplay = document.getElementById('modal-price');
    const inputLabel = document.getElementById('input-label');
    const modalBtn = document.getElementById('modal-btn');

    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-desc').innerText = desc;

    if (type === 'auction') {
        wantsContainer.style.display = 'none';
        
        // extraValue here will be the Current Bid
        if (extraValue) {
            statusLabel.innerHTML = `Starting Bid: ${startPrice} <br> <span style="color: #C1121F">Current High Bid:</span>`;
            priceDisplay.innerText = extraValue;
        } else {
            statusLabel.innerText = "Starting Bid:";
            priceDisplay.innerText = startPrice;
        }

        inputLabel.innerText = "Your Bid (₾):";
        modalBtn.innerText = "Place Bid";
    } else {
        // For Barter: extraValue is the Est. Market Value, extraDetail is the Wants info
        wantsContainer.style.display = 'block';
        wantsDetailText.innerText = extraDetail;
        statusLabel.innerText = "Estimated Market Value:";
        priceDisplay.innerText = "~" + extraValue;
        inputLabel.innerText = "What are you offering in exchange?";
        modalBtn.innerText = "Propose Trade";
    }

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// FIX: Close modal if user clicks outside the white box
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal(); // Use the function that removes the class instead of style.display
    }
}

function toggleWishlist(element) {
    element.classList.toggle('active');
    element.style.transform = 'scale(1.3)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

function showWishlist() {
    const allCards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    let count = 0;
    allCards.forEach(card => {
        const heart = card.querySelector('.wishlist-btn');
        if (heart.classList.contains('active')) {
            card.style.display = 'block';
            count++;
        } else {
            card.style.display = 'none';
        }
    });

    if (count === 0) {
        alert("Your wishlist is empty! Heart some items first.");
        filterItems('all');
    }
}

function startTimer(duration, displayId) {
    let timer = duration;
    const display = document.getElementById(displayId);
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
            display.parentElement.style.color = "#C1121F";
        }
    }, 1000);
}

// Consolidated window.onload (Important!)
window.onload = function () {
    startTimer(7200, "timer1");  // 2 hours
    startTimer(5500, "timer2");  // ~1.5 hours
    startTimer(1500, "timer3");  // 25 minutes
};