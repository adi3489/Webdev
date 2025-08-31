// Main JavaScript file for Khana Express website

// Global variables
let cart = [];
let currentLocation = "";
let menuItems = [];
let restaurants = [];

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize spinner
  initSpinner();

  // Load data
  loadMenuItems();
  loadRestaurants();

  // Initialize cart from local storage
  initCart();

  // Initialize event listeners
  initEventListeners();
});

// Spinner initialization
function initSpinner() {
  setTimeout(() => {
    if (document.getElementById("spinner")) {
      document.getElementById("spinner").classList.remove("show");
    }
  }, 1000);
}

// Load menu items data
function loadMenuItems() {
  // In a real application, this would be fetched from a server
  menuItems = [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Creamy, rich and flavorful chicken curry.",
      price: 450,
      veg: false,
      rating: 4.8,
      image: "",
      category: "north-indian",
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      description: "Cubes of paneer in a spiced tomato-cream sauce.",
      price: 380,
      veg: true,
      rating: 4.6,
      image: "",
      category: "north-indian",
    },
    {
      id: 3,
      name: "Hyderabadi Biryani",
      description: "Fragrant basmati rice cooked with succulent chicken.",
      price: 400,
      veg: false,
      rating: 4.9,
      image: "img/menu/biryani.jpg",
      category: "biryani",
    },
    {
      id: 4,
      name: "Masala Dosa",
      description: "Crispy rice crepe with a spiced potato filling.",
      price: 180,
      veg: true,
      rating: 4.5,
      image: "img/menu/dosa.jpg",
      category: "south-indian",
    },
    {
      id: 5,
      name: "Tandoori Roti",
      description: "Whole wheat bread baked in a tandoor.",
      price: 30,
      veg: true,
      rating: 4.7,
      image: "img/menu/roti.jpg",
      category: "north-indian",
    },
    {
      id: 6,
      name: "Chicken Fried Rice",
      description: "Stir-fried rice with chicken and vegetables.",
      price: 250,
      veg: false,
      rating: 4.4,
      image: "img/menu/fried-rice.jpg",
      category: "chinese",
    },
    {
      id: 7,
      name: "Gulab Jamun",
      description: "Sweet milk solids balls soaked in sugar syrup.",
      price: 120,
      veg: true,
      rating: 4.8,
      image: "img/menu/gulab-jamun.jpg",
      category: "desserts",
    },
    {
      id: 8,
      name: "Mango Lassi",
      description: "Refreshing yogurt drink with mango pulp.",
      price: 100,
      veg: true,
      rating: 4.6,
      image: "img/menu/mango-lassi.jpg",
      category: "beverages",
    },
  ];

  // Render menu items
  renderMenuItems();
}

// Load restaurants data
function loadRestaurants() {
  // In a real application, this would be fetched from a server
  restaurants = [
    {
      id: "spice-palace",
      name: "Spice Palace",
      cuisine: "North Indian, Mughlai, Tandoor",
      rating: 4.5,
      deliveryTime: "25-30 mins",
      priceForTwo: 300,
      image: "",
    },
    {
      id: "dosa-corner",
      name: "Dosa Corner",
      cuisine: "South Indian, Dosa, Idli",
      rating: 4.3,
      deliveryTime: "20-25 mins",
      priceForTwo: 200,
      image: "imgages/DosaCorner.jpeg",
    },
    {
      id: "biryani-house",
      name: "Biryani House",
      cuisine: "Biryani, Kebab, Hyderabadi",
      rating: 4.7,
      deliveryTime: "30-35 mins",
      priceForTwo: 400,
      image: "",
    },
  ];
}

// Initialize cart from local storage
function initCart() {
  const savedCart = localStorage.getItem("khanaExpressCart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      updateCartCount();
    } catch (e) {
      console.error("Error loading cart from local storage:", e);
      cart = [];
    }
  }
}

// Initialize event listeners
function initEventListeners() {
  // Back to top button
  window.addEventListener("scroll", function () {
    if (this.scrollY > 300) {
      document.querySelector(".back-to-top").classList.add("show");
    } else {
      document.querySelector(".back-to-top").classList.remove("show");
    }
  });

  // Back to top click event
  document
    .querySelector(".back-to-top")
    ?.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  // Contact form submission
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  // Newsletter subscription
  const newsletterForm = document.querySelector(".footer form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for subscribing to our newsletter!");
      newsletterForm.reset();
    });
  }
}

// Render menu items
function renderMenuItems(category = null) {
  const menuContainer = document.getElementById("menu-items");
  if (!menuContainer) return;

  menuContainer.innerHTML = "";

  // Filter items by category if specified
  const filteredItems = category
    ? menuItems.filter((item) => item.category === category)
    : menuItems;

  filteredItems.forEach((item) => {
    const badge = item.veg
      ? `<span class="veg-badge me-2"></span>`
      : `<span class="non-veg-badge me-2"></span>`;

    // Determine image source based on category
    let imageSrc =
      item.image ||
      `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f8f9fa' rx='10'/><text x='50' y='50' text-anchor='middle' font-size='40' fill='%23666'>${
        item.veg ? "🌿" : "🍗"
      }</text></svg>`;

    const itemHtml = `
      <div class="col-md-6 col-lg-4 mb-4 fade-in">
        <div class="food-item bg-white p-4 rounded-3 d-flex align-items-center">
          <div class="flex-shrink-0 me-4">
            <img src="${imageSrc}" 
                 class="img-fluid rounded" style="width: 80px; height: 80px;" alt="${item.name}">
          </div>
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">${badge}${item.name}</h5>
              <div class="price-tag">₹${item.price}</div>
            </div>
            <p class="text-muted small mb-2">${item.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="rating-stars">
                <i class="fas fa-star"></i>
                <span>${item.rating}</span>
              </div>
              <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">Add</button>
            </div>
          </div>
        </div>
      </div>
    `;
    menuContainer.innerHTML += itemHtml;
  });
}

// Filter menu items by category
function filterCategory(category) {
  // Highlight the selected category
  document.querySelectorAll(".category-pill").forEach((pill) => {
    pill.classList.remove("active");
  });

  const selectedPill = document.querySelector(
    `.category-pill[onclick*="${category}"]`
  );
  if (selectedPill) {
    selectedPill.classList.add("active");
  }

  // Render filtered menu items
  renderMenuItems(category);

  // Scroll to menu section
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// Add item to cart
function addToCart(itemId) {
  const item = menuItems.find((i) => i.id === itemId);
  if (item) {
    // Check if item already exists in cart
    const existingItem = cart.find((i) => i.id === itemId);

    if (existingItem) {
      // Increase quantity
      existingItem.quantity += 1;
    } else {
      // Add new item with quantity 1
      cart.push({
        ...item,
        quantity: 1,
      });
    }

    // Update cart count and save to local storage
    updateCartCount();
    saveCartToLocalStorage();

    // Show notification
    showNotification(`${item.name} added to cart!`);
  }
}

// Update cart count
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }
}

// Save cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("khanaExpressCart", JSON.stringify(cart));
}

// Open cart modal
function openCart() {
  // Create cart modal if it doesn't exist
  let cartModal = document.getElementById("cartModal");

  if (!cartModal) {
    cartModal = document.createElement("div");
    cartModal.id = "cartModal";
    cartModal.className = "modal fade";
    cartModal.setAttribute("tabindex", "-1");
    cartModal.setAttribute("aria-labelledby", "cartModalLabel");
    cartModal.setAttribute("aria-hidden", "true");

    document.body.appendChild(cartModal);
  }

  // Generate cart content
  let cartContent = "";
  let totalAmount = 0;

  if (cart.length === 0) {
    cartContent = `
      <div class="text-center py-5">
        <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
        <h4>Your cart is empty</h4>
        <p>Add some delicious items to your cart</p>
        <button class="btn btn-primary" data-bs-dismiss="modal">Continue Shopping</button>
      </div>
    `;
  } else {
    let itemsList = "";

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      itemsList += `
        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
          <div class="d-flex align-items-center">
            <div class="me-3">
              ${
                item.veg
                  ? '<span class="veg-badge"></span>'
                  : '<span class="non-veg-badge"></span>'
              }
            </div>
            <div>
              <h6 class="mb-0">${item.name}</h6>
              <small class="text-muted">₹${item.price}</small>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="quantity-controls">
              <button class="quantity-btn" onclick="updateCartItemQuantity(${
                item.id
              }, ${item.quantity - 1})">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateCartItemQuantity(${
                item.id
              }, ${item.quantity + 1})">+</button>
            </div>
            <div class="ms-3">
              <span class="fw-bold">₹${itemTotal}</span>
            </div>
            <div class="ms-3">
              <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${
                item.id
              })">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    cartContent = `
      <div class="p-4">
        <h5 class="mb-4">Your Cart (${cart.length} items)</h5>
        ${itemsList}
        <div class="d-flex justify-content-between align-items-center mt-4">
          <h5>Total Amount:</h5>
          <h5>₹${totalAmount}</h5>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Continue Shopping</button>
          <button class="btn btn-primary" onclick="checkout()">Proceed to Checkout</button>
        </div>
      </div>
    `;
  }

  // Update modal content
  cartModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="cartModalLabel"><i class="fas fa-shopping-cart me-2"></i>Your Shopping Cart</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ${cartContent}
        </div>
      </div>
    </div>
  `;

  // Show the modal
  const bsModal = new bootstrap.Modal(cartModal);
  bsModal.show();
}

// Update cart item quantity
function updateCartItemQuantity(itemId, newQuantity) {
  if (newQuantity <= 0) {
    // Remove item if quantity is 0 or less
    removeFromCart(itemId);
  } else {
    // Update quantity
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = newQuantity;
      updateCartCount();
      saveCartToLocalStorage();
      openCart(); // Refresh cart modal
    }
  }
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  updateCartCount();
  saveCartToLocalStorage();
  openCart(); // Refresh cart modal
}

// Checkout function
function checkout() {
  alert("Checkout functionality will be implemented soon!");
}

// Location detection
function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would use a geocoding service to get the address
        // For now, we'll just show the coordinates
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);

        currentLocation = `Location detected (${lat}, ${lng})`;
        updateLocationDisplay();
        showNotification("Location detected successfully!");
      },
      (error) => {
        console.error(error);
        showNotification(
          "Error detecting location. Please enter it manually.",
          "error"
        );
      }
    );
  } else {
    showNotification("Geolocation is not supported by this browser.", "error");
  }
}

// Update location display
function updateLocationDisplay() {
  const locationDisplay = document.getElementById("current-location");
  const locationInput = document.getElementById("location-input");

  if (locationDisplay) {
    locationDisplay.textContent = currentLocation || "Select Delivery Location";
  }

  if (locationInput && currentLocation) {
    locationInput.value = currentLocation;
  }
}

// Open location modal
function openLocationModal() {
  // Create location modal if it doesn't exist
  let locationModal = document.getElementById("locationModal");

  if (!locationModal) {
    locationModal = document.createElement("div");
    locationModal.id = "locationModal";
    locationModal.className = "modal fade";
    locationModal.setAttribute("tabindex", "-1");
    locationModal.setAttribute("aria-labelledby", "locationModalLabel");
    locationModal.setAttribute("aria-hidden", "true");

    document.body.appendChild(locationModal);
  }

  // Update modal content
  locationModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="locationModalLabel">Select Delivery Location</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Enter your delivery address</label>
            <input type="text" class="form-control" id="modal-location-input" value="${
              currentLocation || ""
            }" placeholder="Enter your full address">
          </div>
          <button class="btn btn-primary w-100 mb-3" onclick="detectLocationInModal()">
            <i class="fas fa-crosshairs me-2"></i>Detect My Location
          </button>
          <div class="mt-4">
            <h6>Saved Addresses</h6>
            <div class="list-group">
              <button type="button" class="list-group-item list-group-item-action" onclick="selectSavedLocation('Home: 123 Main St, Apartment 4B, New Delhi')">
                <i class="fas fa-home me-2 text-primary"></i>Home
                <small class="d-block text-muted">123 Main St, Apartment 4B, New Delhi</small>
              </button>
              <button type="button" class="list-group-item list-group-item-action" onclick="selectSavedLocation('Work: 456 Office Park, Building 3, Gurgaon')">
                <i class="fas fa-briefcase me-2 text-primary"></i>Work
                <small class="d-block text-muted">456 Office Park, Building 3, Gurgaon</small>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="saveLocation()">Save & Continue</button>
        </div>
      </div>
    </div>
  `;

  // Show the modal
  const bsModal = new bootstrap.Modal(locationModal);
  bsModal.show();
}

// Detect location in modal
function detectLocationInModal() {
  detectLocation();
  // Update the input field in the modal
  setTimeout(() => {
    const modalLocationInput = document.getElementById("modal-location-input");
    if (modalLocationInput && currentLocation) {
      modalLocationInput.value = currentLocation;
    }
  }, 1000);
}

// Select saved location
function selectSavedLocation(location) {
  const modalLocationInput = document.getElementById("modal-location-input");
  if (modalLocationInput) {
    modalLocationInput.value = location;
  }
}

// Save location
function saveLocation() {
  const modalLocationInput = document.getElementById("modal-location-input");
  if (modalLocationInput && modalLocationInput.value.trim() !== "") {
    currentLocation = modalLocationInput.value.trim();
    updateLocationDisplay();

    // Close the modal
    const locationModal = document.getElementById("locationModal");
    if (locationModal) {
      const bsModal = bootstrap.Modal.getInstance(locationModal);
      if (bsModal) {
        bsModal.hide();
      }
    }

    showNotification("Delivery location updated successfully!");
  } else {
    showNotification("Please enter a valid location", "error");
  }
}

// Open restaurant page
function openRestaurant(restaurantId) {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  if (!restaurant) return;

  // Create restaurant modal
  let restaurantModal = document.getElementById("restaurantModal");

  if (!restaurantModal) {
    restaurantModal = document.createElement("div");
    restaurantModal.id = "restaurantModal";
    restaurantModal.className = "modal fade";
    restaurantModal.setAttribute("tabindex", "-1");
    restaurantModal.setAttribute("aria-labelledby", "restaurantModalLabel");
    restaurantModal.setAttribute("aria-hidden", "true");

    document.body.appendChild(restaurantModal);
  }

  // Update modal content
  restaurantModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="restaurantModalLabel">${
            restaurant.name
          }</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <div class="position-relative">
            <img src="${
              restaurant.image ||
              `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 300'><rect width='800' height='300' fill='%23ff6b35'/><text x='400' y='150' text-anchor='middle' font-size='32' fill='white'>${restaurant.name}</text></svg>`
            }" class="img-fluid w-100" style="max-height: 200px; object-fit: cover;" alt="${
    restaurant.name
  }">
            <div class="position-absolute bottom-0 start-0 w-100 p-3" style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
              <div class="d-flex justify-content-between align-items-end">
                <div>
                  <h4 class="text-white mb-0">${restaurant.name}</h4>
                  <p class="text-white-50 mb-0">${restaurant.cuisine}</p>
                </div>
                <div class="bg-white px-2 py-1 rounded">
                  <span class="text-warning"><i class="fas fa-star"></i> ${
                    restaurant.rating
                  }</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-4">
            <div class="d-flex justify-content-between mb-4">
              <div>
                <p class="mb-0"><i class="fas fa-clock text-primary me-2"></i>${
                  restaurant.deliveryTime
                }</p>
                <p class="mb-0"><i class="fas fa-rupee-sign text-primary me-2"></i>₹${
                  restaurant.priceForTwo
                } for two</p>
              </div>
              <div>
                <button class="btn btn-outline-primary"><i class="far fa-heart me-2"></i>Favorite</button>
              </div>
            </div>
            
            <div class="mb-4">
              <h5>Popular Dishes</h5>
              <p class="text-muted">Butter Chicken, Paneer Tikka, Dal Makhani, Naan</p>
            </div>
            
            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="mb-0">Menu</h5>
                <div class="input-group" style="max-width: 300px;">
                  <span class="input-group-text"><i class="fas fa-search"></i></span>
                  <input type="text" class="form-control" placeholder="Search menu items">
                </div>
              </div>
              
              <div class="list-group">
                <!-- Menu items would be dynamically generated here -->
                <div class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <span class="veg-badge me-2"></span>
                      <h6 class="mb-0">Paneer Butter Masala</h6>
                      <small class="text-muted">₹350</small>
                    </div>
                    <button class="btn btn-primary btn-sm">Add</button>
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <span class="non-veg-badge me-2"></span>
                      <h6 class="mb-0">Chicken Tikka</h6>
                      <small class="text-muted">₹420</small>
                    </div>
                    <button class="btn btn-primary btn-sm">Add</button>
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <span class="veg-badge me-2"></span>
                      <h6 class="mb-0">Dal Makhani</h6>
                      <small class="text-muted">₹280</small>
                    </div>
                    <button class="btn btn-primary btn-sm">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="openCart()">View Cart</button>
        </div>
      </div>
    </div>
  `;

  // Show the modal
  const bsModal = new bootstrap.Modal(restaurantModal);
  bsModal.show();
}

// Show notification
function showNotification(message, type = "success") {
  // Create notification container if it doesn't exist
  let notificationContainer = document.getElementById("notification-container");

  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    notificationContainer.style.position = "fixed";
    notificationContainer.style.top = "20px";
    notificationContainer.style.right = "20px";
    notificationContainer.style.zIndex = "9999";
    document.body.appendChild(notificationContainer);
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show`;
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Add to container
  notificationContainer.appendChild(notification);

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Create login modal
function createLoginModal() {
  let loginModal = document.getElementById("loginModal");

  if (!loginModal) {
    loginModal = document.createElement("div");
    loginModal.id = "loginModal";
    loginModal.className = "modal fade";
    loginModal.setAttribute("tabindex", "-1");
    loginModal.setAttribute("aria-labelledby", "loginModalLabel");
    loginModal.setAttribute("aria-hidden", "true");

    loginModal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Login to Khana Express</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="login-form">
              <div class="mb-3">
                <label for="login-email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="login-email" required>
              </div>
              <div class="mb-3">
                <label for="login-password" class="form-label">Password</label>
                <input type="password" class="form-control" id="login-password" required>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember-me">
                <label class="form-check-label" for="remember-me">Remember me</label>
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
            <div class="text-center mt-3">
              <a href="#" class="text-decoration-none">Forgot password?</a>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button class="btn btn-outline-primary me-2">
                <i class="fab fa-google me-2"></i>Google
              </button>
              <button class="btn btn-outline-primary">
                <i class="fab fa-facebook-f me-2"></i>Facebook
              </button>
            </div>
            <div class="text-center mt-4">
              <p>Don't have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#signupModal" data-bs-dismiss="modal">Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(loginModal);

    // Add event listener for form submission
    document
      .getElementById("login-form")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Login functionality will be implemented soon!");
        const bsModal = bootstrap.Modal.getInstance(loginModal);
        if (bsModal) {
          bsModal.hide();
        }
      });
  }
}

// Create signup modal
function createSignupModal() {
  let signupModal = document.getElementById("signupModal");

  if (!signupModal) {
    signupModal = document.createElement("div");
    signupModal.id = "signupModal";
    signupModal.className = "modal fade";
    signupModal.setAttribute("tabindex", "-1");
    signupModal.setAttribute("aria-labelledby", "signupModalLabel");
    signupModal.setAttribute("aria-hidden", "true");

    signupModal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signupModalLabel">Create an Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="signup-form">
              <div class="mb-3">
                <label for="signup-name" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="signup-name" required>
              </div>
              <div class="mb-3">
                <label for="signup-email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="signup-email" required>
              </div>
              <div class="mb-3">
                <label for="signup-phone" class="form-label">Phone Number</label>
                <input type="tel" class="form-control" id="signup-phone" required>
              </div>
              <div class="mb-3">
                <label for="signup-password" class="form-label">Password</label>
                <input type="password" class="form-control" id="signup-password" required>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms-agree" required>
                <label class="form-check-label" for="terms-agree">I agree to the <a href="#">Terms and Conditions</a></label>
              </div>
              <button type="submit" class="btn btn-primary w-100">Sign Up</button>
            </form>
            <div class="text-center mt-4">
              <p>Already have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-dismiss="modal">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(signupModal);

    // Add event listener for form submission
    document
      .getElementById("signup-form")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Signup functionality will be implemented soon!");
        const bsModal = bootstrap.Modal.getInstance(signupModal);
        if (bsModal) {
          bsModal.hide();
        }
      });
  }
}

// Create profile modal
function createProfileModal() {
  let profileModal = document.getElementById("profileModal");

  if (!profileModal) {
    profileModal = document.createElement("div");
    profileModal.id = "profileModal";
    profileModal.className = "modal fade";
    profileModal.setAttribute("tabindex", "-1");
    profileModal.setAttribute("aria-labelledby", "profileModalLabel");
    profileModal.setAttribute("aria-hidden", "true");

    profileModal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="profileModalLabel">My Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 100px; height: 100px;">
                <i class="fas fa-user fa-3x text-primary"></i>
              </div>
              <h5 class="mt-3">Guest User</h5>
              <p class="text-muted">Please login to access your profile</p>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-dismiss="modal">Login</button>
            </div>
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <i class="fas fa-utensils me-3 text-primary"></i>
                  My Orders
                </div>
                <i class="fas fa-chevron-right text-muted"></i>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <i class="fas fa-map-marker-alt me-3 text-primary"></i>
                  Saved Addresses
                </div>
                <i class="fas fa-chevron-right text-muted"></i>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <i class="fas fa-heart me-3 text-primary"></i>
                  Favorites
                </div>
                <i class="fas fa-chevron-right text-muted"></i>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <i class="fas fa-gift me-3 text-primary"></i>
                  Offers & Promos
                </div>
                <i class="fas fa-chevron-right text-muted"></i>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <i class="fas fa-cog me-3 text-primary"></i>
                  Settings
                </div>
                <i class="fas fa-chevron-right text-muted"></i>
              </a>
              <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <i class="fas fa-question-circle me-3 text-primary"></i>
                  Help & Support
                </div>
                <i class="fas fa-chevron-right text-muted"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(profileModal);
  }
}

// Create login modal
function createLoginModal() {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal fade";
  modalContainer.id = "loginModal";
  modalContainer.setAttribute("tabindex", "-1");
  modalContainer.setAttribute("aria-labelledby", "loginModalLabel");
  modalContainer.setAttribute("aria-hidden", "true");

  modalContainer.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="loginModalLabel"><i class="fas fa-sign-in-alt me-2"></i>Login</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <form id="loginForm">
            <div class="mb-3">
              <label for="loginEmail" class="form-label">Email address</label>
              <input type="email" class="form-control" id="loginEmail" required>
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="loginPassword" required>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="rememberMe">
              <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <div class="text-center mt-3">
              <a href="#" class="text-decoration-none" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#signupModal">Don't have an account? Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  // Add form submission handler
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      // Here you would typically send a request to your backend
      console.log("Login attempt:", { email, password });

      // For demo purposes, we'll just show a success message
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      if (modal) modal.hide();

      // Store user info in localStorage (for demo purposes only)
      localStorage.setItem(
        "khanaExpressUser",
        JSON.stringify({ email, name: email.split("@")[0] })
      );

      showNotification("Login successful!", "success");
      updateUserUI();
    });
  }

  return modalContainer;
}

// Create signup modal
function createSignupModal() {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal fade";
  modalContainer.id = "signupModal";
  modalContainer.setAttribute("tabindex", "-1");
  modalContainer.setAttribute("aria-labelledby", "signupModalLabel");
  modalContainer.setAttribute("aria-hidden", "true");

  modalContainer.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="signupModalLabel"><i class="fas fa-user-plus me-2"></i>Sign Up</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <form id="signupForm">
            <div class="mb-3">
              <label for="signupName" class="form-label">Full Name</label>
              <input type="text" class="form-control" id="signupName" required>
            </div>
            <div class="mb-3">
              <label for="signupEmail" class="form-label">Email address</label>
              <input type="email" class="form-control" id="signupEmail" required>
            </div>
            <div class="mb-3">
              <label for="signupPhone" class="form-label">Phone Number</label>
              <input type="tel" class="form-control" id="signupPhone" required>
            </div>
            <div class="mb-3">
              <label for="signupPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="signupPassword" required>
            </div>
            <div class="mb-3">
              <label for="signupConfirmPassword" class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="signupConfirmPassword" required>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="termsAgree" required>
              <label class="form-check-label" for="termsAgree">I agree to the Terms and Conditions</label>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Sign Up</button>
            </div>
            <div class="text-center mt-3">
              <a href="#" class="text-decoration-none" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal">Already have an account? Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  // Add form submission handler
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const phone = document.getElementById("signupPhone").value;
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById(
        "signupConfirmPassword"
      ).value;

      // Validate passwords match
      if (password !== confirmPassword) {
        showNotification("Passwords do not match!", "error");
        return;
      }

      // Here you would typically send a request to your backend
      console.log("Signup attempt:", { name, email, phone, password });

      // For demo purposes, we'll just show a success message
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("signupModal")
      );
      if (modal) modal.hide();

      // Store user info in localStorage (for demo purposes only)
      localStorage.setItem(
        "khanaExpressUser",
        JSON.stringify({ name, email, phone })
      );

      showNotification("Account created successfully!", "success");
      updateUserUI();
    });
  }

  return modalContainer;
}

// Create profile modal
function createProfileModal() {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal fade";
  modalContainer.id = "profileModal";
  modalContainer.setAttribute("tabindex", "-1");
  modalContainer.setAttribute("aria-labelledby", "profileModalLabel");
  modalContainer.setAttribute("aria-hidden", "true");

  // Get user data from localStorage
  let userData = { name: "Guest", email: "", phone: "" };
  const savedUser = localStorage.getItem("khanaExpressUser");
  if (savedUser) {
    try {
      userData = JSON.parse(savedUser);
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }

  modalContainer.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="profileModalLabel"><i class="fas fa-user-circle me-2"></i>My Profile</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div class="text-center mb-4">
            <div class="profile-avatar mb-3">
              <i class="fas fa-user-circle fa-5x text-primary"></i>
            </div>
            <h4>${userData.name || "Guest"}</h4>
            <p class="text-muted">${userData.email || ""}</p>
          </div>
          
          <div class="profile-section">
            <h5 class="border-bottom pb-2">Account Information</h5>
            <div class="mb-3 row">
              <label class="col-sm-4 col-form-label">Full Name</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="profileName" value="${
                  userData.name || ""
                }">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-4 col-form-label">Email</label>
              <div class="col-sm-8">
                <input type="email" class="form-control" id="profileEmail" value="${
                  userData.email || ""
                }">
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-4 col-form-label">Phone</label>
              <div class="col-sm-8">
                <input type="tel" class="form-control" id="profilePhone" value="${
                  userData.phone || ""
                }">
              </div>
            </div>
          </div>
          
          <div class="profile-section mt-4">
            <h5 class="border-bottom pb-2">Saved Addresses</h5>
            <div class="saved-address p-3 bg-light rounded mb-2">
              <div class="d-flex justify-content-between">
                <div>
                  <h6>Home</h6>
                  <p class="mb-0 small">123 Main Street, Apartment 4B, City, State, 12345</p>
                </div>
                <div>
                  <button class="btn btn-sm btn-outline-primary"><i class="fas fa-edit"></i></button>
                </div>
              </div>
            </div>
            <div class="saved-address p-3 bg-light rounded mb-2">
              <div class="d-flex justify-content-between">
                <div>
                  <h6>Work</h6>
                  <p class="mb-0 small">456 Office Park, Suite 200, City, State, 12345</p>
                </div>
                <div>
                  <button class="btn btn-sm btn-outline-primary"><i class="fas fa-edit"></i></button>
                </div>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-primary mt-2"><i class="fas fa-plus me-1"></i> Add New Address</button>
          </div>
          
          <div class="profile-section mt-4">
            <h5 class="border-bottom pb-2">Order History</h5>
            <div class="text-center py-3 text-muted">
              <i class="fas fa-receipt fa-2x mb-2"></i>
              <p>No orders yet</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="saveProfileBtn">Save Changes</button>
          <button type="button" class="btn btn-danger ms-auto" id="logoutBtn">Logout</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  // Add event listeners
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", function () {
      const name = document.getElementById("profileName").value;
      const email = document.getElementById("profileEmail").value;
      const phone = document.getElementById("profilePhone").value;

      // Save updated profile data
      localStorage.setItem(
        "khanaExpressUser",
        JSON.stringify({ name, email, phone })
      );

      showNotification("Profile updated successfully!", "success");
      updateUserUI();

      // Close modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("profileModal")
      );
      if (modal) modal.hide();
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Clear user data
      localStorage.removeItem("khanaExpressUser");

      // Close modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("profileModal")
      );
      if (modal) modal.hide();

      showNotification("Logged out successfully!", "success");
      updateUserUI();
    });
  }

  return modalContainer;
}

// Update UI based on user login status
function updateUserUI() {
  const userLinks = document.querySelector(".user-links");
  if (!userLinks) return;

  const savedUser = localStorage.getItem("khanaExpressUser");

  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      userLinks.innerHTML = `
        <a href="#" class="text-decoration-none" onclick="openProfileModal(); return false;">
          <i class="fas fa-user-circle me-1"></i> ${
            userData.name || "My Account"
          }
        </a>
      `;
    } catch (e) {
      console.error("Error parsing user data:", e);
      setDefaultUserLinks();
    }
  } else {
    setDefaultUserLinks();
  }
}

function setDefaultUserLinks() {
  const userLinks = document.querySelector(".user-links");
  if (userLinks) {
    userLinks.innerHTML = `
      <a href="#" class="text-decoration-none me-3" onclick="openLoginModal(); return false;">
        <i class="fas fa-sign-in-alt me-1"></i> Login
      </a>
      <a href="#" class="text-decoration-none" onclick="openSignupModal(); return false;">
        <i class="fas fa-user-plus me-1"></i> Sign Up
      </a>
    `;
  }
}

function openLoginModal() {
  const existingModal = document.getElementById("loginModal");
  if (existingModal) {
    const modal = new bootstrap.Modal(existingModal);
    modal.show();
  } else {
    const modalContainer = createLoginModal();
    const modal = new bootstrap.Modal(modalContainer);
    modal.show();
  }
}

function openSignupModal() {
  const existingModal = document.getElementById("signupModal");
  if (existingModal) {
    const modal = new bootstrap.Modal(existingModal);
    modal.show();
  } else {
    const modalContainer = createSignupModal();
    const modal = new bootstrap.Modal(modalContainer);
    modal.show();
  }
}

function openProfileModal() {
  const existingModal = document.getElementById("profileModal");
  if (existingModal) {
    // Refresh the modal content
    document.body.removeChild(existingModal);
    const modalContainer = createProfileModal();
    const modal = new bootstrap.Modal(modalContainer);
    modal.show();
  } else {
    const modalContainer = createProfileModal();
    const modal = new bootstrap.Modal(modalContainer);
    modal.show();
  }
}

// Initialize modals when the page loads
document.addEventListener("DOMContentLoaded", () => {
  createLoginModal();
  createSignupModal();
  createProfileModal();
  updateUserUI();
});
