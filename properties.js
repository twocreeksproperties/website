// Properties rendering system
(function() {
    'use strict';

    // Load and render properties when DOM is ready
    async function init() {
        try {
            const response = await fetch('properties.json');
            const properties = await response.json();
            renderProperties(properties);
        } catch (error) {
            console.error('Error loading properties:', error);
        }
    }

    function renderProperties(allProperties) {
        // Filter properties by status
        const available = allProperties.filter(p => p.status === 'available');
        const comingSoon = allProperties.filter(p => p.status === 'coming-soon');
        const rented = allProperties.filter(p => p.status === 'rented');

        const propertiesGrid = document.getElementById('properties-grid');
        const comingSoonContainer = document.getElementById('coming-soon-container');

        // Clear existing content
        propertiesGrid.innerHTML = '';
        comingSoonContainer.innerHTML = '';

        // If everything is rented, show fallback
        if (available.length === 0 && comingSoon.length === 0) {
            renderAllRentedFallback(propertiesGrid, rented);
            return;
        }

        // Render available properties
        available.forEach(property => {
            const card = createPropertyCard(property, 'Available');
            propertiesGrid.appendChild(card);
        });

        // Render coming soon properties
        comingSoon.forEach(property => {
            const card = createComingSoonCard(property);
            comingSoonContainer.appendChild(card);
        });

        // If no coming soon properties, show generic coming soon message
        if (comingSoon.length === 0) {
            const genericComingSoon = createGenericComingSoon();
            comingSoonContainer.appendChild(genericComingSoon);
        }

        // Initialize gallery functionality for dynamically created elements
        initializeGalleries();
    }

    function createPropertyCard(property, statusText) {
        const card = document.createElement('div');
        card.className = 'property-card';

        const imagesSection = createImagesSection(property, statusText);
        const contentSection = createContentSection(property);

        card.appendChild(imagesSection);
        card.appendChild(contentSection);

        return card;
    }

    function createComingSoonCard(property) {
        const card = document.createElement('div');
        card.className = 'coming-soon';

        const imagesSection = createImagesSection(property, 'Coming Soon');

        const contentSection = document.createElement('div');
        contentSection.className = 'coming-soon-content';
        contentSection.innerHTML = `
            <h3>Coming Soon - ${property.location}</h3>
            <p>${property.description}</p>
        `;

        card.appendChild(imagesSection);
        card.appendChild(contentSection);

        return card;
    }

    function createGenericComingSoon() {
        const card = document.createElement('div');
        card.className = 'coming-soon';

        card.innerHTML = `
            <div class="property-images">
                <div class="main-image" onclick="openImageModal('townhome.jpg', 'Coming Soon')">
                    <img src="townhome.jpg" alt="Coming Soon Property" class="main-img">
                    <div class="property-status">Coming Soon</div>
                </div>
                <div class="image-gallery">
                    <button class="gallery-arrow gallery-arrow-left" onclick="scrollImages(this, 'left')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                    </button>
                    <div class="gallery-container">
                        <div class="gallery-images">
                            <img src="townhome.jpg" alt="Coming Soon Image 1" class="gallery-img active" onclick="openImageModal('townhome.jpg', 'Coming Soon')">
                            <img src="townhome.jpg" alt="Coming Soon Image 2" class="gallery-img" onclick="openImageModal('townhome.jpg', 'Coming Soon')">
                        </div>
                    </div>
                    <button class="gallery-arrow gallery-arrow-right" onclick="scrollImages(this, 'right')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="coming-soon-content">
                <h3>Coming Soon</h3>
                <p>We're always adding new properties to our portfolio. Contact us to be notified when new homes become available in your preferred area.</p>
            </div>
        `;

        return card;
    }

    function createImagesSection(property, statusText) {
        const section = document.createElement('div');
        section.className = 'property-images';

        const imagePath = `properties/${property.id}`;
        const mainImage = property.images[0];
        const remainingImages = property.images.slice(1); // All images except the first

        section.innerHTML = `
            <div class="main-image" onclick="openImageModal('${imagePath}/${mainImage}', '${property.location}')">
                <img src="${imagePath}/${mainImage}" alt="${property.location} Property" class="main-img">
                <div class="property-status">${statusText}</div>
            </div>
            ${remainingImages.length > 0 ? `
            <div class="image-gallery">
                <button class="gallery-arrow gallery-arrow-left" onclick="scrollImages(this, 'left')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                </button>
                <div class="gallery-container">
                    <div class="gallery-images">
                        ${remainingImages.map((img, index) => `
                            <img src="${imagePath}/${img}"
                                 alt="${property.location} Image ${index + 2}"
                                 class="gallery-img ${index === 0 ? 'active' : ''}"
                                 onclick="openImageModal('${imagePath}/${img}', '${property.location}')">
                        `).join('')}
                    </div>
                </div>
                <button class="gallery-arrow gallery-arrow-right" onclick="scrollImages(this, 'right')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </button>
            </div>
            ` : ''}
        `;

        return section;
    }

    function createContentSection(property) {
        const section = document.createElement('div');
        section.className = 'property-content';

        section.innerHTML = `
            <h3 class="property-address">${property.address}</h3>
            <p class="property-description">${property.description}</p>
            <div class="property-details">
                <span class="detail">${property.beds} bed</span>
                <span class="detail">${property.baths} bath</span>
                <span class="detail">${property.sqft.toLocaleString()} sq ft</span>
            </div>
            <div class="property-actions">
                <a href="${property.zillowUrl}" class="btn btn-primary" target="_blank" rel="noopener">View on Zillow</a>
                <a href="mailto:info@twocreeksproperties.com" class="btn btn-outline">Contact Us</a>
            </div>
        `;

        return section;
    }

    function renderAllRentedFallback(container, rentedProperties) {
        const fallback = document.createElement('div');
        fallback.className = 'all-rented-fallback';
        fallback.style.textAlign = 'center';
        fallback.style.padding = '3rem 0';

        let thumbnailsHTML = '';
        if (rentedProperties.length > 0) {
            // Show up to 3 thumbnails of rented properties
            const displayProperties = rentedProperties.slice(0, 3);
            thumbnailsHTML = `
                <div style="display: flex; gap: 1rem; justify-content: center; margin: 2rem 0; flex-wrap: wrap;">
                    ${displayProperties.map(property => `
                        <div style="width: 200px;">
                            <img src="properties/${property.id}/${property.images[0]}"
                                 alt="${property.location}"
                                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                            <p style="margin-top: 0.5rem; font-weight: 500;">${property.location}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        fallback.innerHTML = `
            <h3 style="font-size: 2rem; margin-bottom: 1rem;">All Properties Currently Rented</h3>
            <p style="font-size: 1.125rem; color: #6b7280; margin-bottom: 1rem;">
                Thank you for your interest! All of our properties are currently occupied.
            </p>
            ${thumbnailsHTML}
            <p style="font-size: 1.125rem; color: #6b7280; margin-bottom: 2rem;">
                We're always adding new properties to our portfolio. Contact us at
                <a href="mailto:info@twocreeksproperties.com" style="color: #0891b2;">info@twocreeksproperties.com</a>
                to be notified when new homes become available.
            </p>
        `;

        container.appendChild(fallback);
    }

    function initializeGalleries() {
        // Galleries are already initialized via inline onclick handlers
        // This function can be used for additional initialization if needed
    }

    // Start the app
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Make openImageModal globally accessible
    window.openImageModal = openImageModal;
})();

// Image modal functionality (global)
function openImageModal(imageSrc, altText) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');

    if (modal && modalImg) {
        modal.style.display = 'flex';
        modalImg.src = imageSrc;
        modalImg.alt = altText;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});
