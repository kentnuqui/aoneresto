document.addEventListener('DOMContentLoaded', async () => {
    'use strict'; // Enable strict mode for better error detection

    let originalMenuData = [];
    let currentMenuData = [];
    let sectionObserver;
    let resizeTimeout;
    let currentModalItemData = null;
    let previouslyFocusedElement = null;
    let isSlidebarOpen = false;
    let previouslyFocusedElementBeforeSlidebar = null;
    let fetchMenuDataCalledOnce = false;

    // --- START: New global state variables for lightbox interaction ---
    let detailsModalHiddenByLightbox = false;
    let headerHiddenByLightbox = false;
    let elementThatOpenedLightbox = null; 
    // --- END: New global state variables ---


    // --- DOM Element Cache ---
    const DOMElements = {
        siteHeader: document.getElementById('site-header'),
        desktopCategoryTabsContainer: document.getElementById('category-tabs-container'),
        productListWrapper: document.getElementById('product-list-wrapper'),
        productListContainer: document.getElementById('product-list'),
        mobileCategorySelect: document.getElementById('mobile-category-select'),
        mobileSearchInput: document.getElementById('mobile-search-input'),
        desktopSearchInput: document.getElementById('desktop-search-input'),
        mobileCategoryDropdownContainer: document.getElementById('mobile-category-dropdown-container'),
        mobileSearchContainer: document.getElementById('mobile-search-container'),
        searchResultsMessageEl: document.getElementById('search-results-message'),
        backToTopBtn: document.getElementById('back-to-top-btn'),
        currentYearEl: document.getElementById('current-year'),
        specialMenuSection: document.getElementById('special-menu-section'),

        detailsModal: {
            el: document.getElementById('item-details-modal'),
            content: document.getElementById('item-details-modal')?.querySelector('.bg-white'),
            closeBtn: document.getElementById('close-details-modal-btn'),
            itemName: document.getElementById('modal-item-name'),
            itemImage: document.getElementById('modal-item-image'),
            itemDescription: document.getElementById('modal-item-description'),
            mainCategory: document.getElementById('modal-main-category'),
            subCategory: document.getElementById('modal-sub-category'),
            itemPrice: document.getElementById('modal-item-price'),
            meatChoicesContainer: document.getElementById('modal-meat-choices-container'),
            meatChoicesList: document.getElementById('modal-meat-choices-list'),
        },
        lightboxModal: {
            el: document.getElementById('image-lightbox-modal'),
            image: document.getElementById('lightbox-image'),
            closeBtn: document.getElementById('close-lightbox-btn'),
        },
        aboutModal: {
            el: document.getElementById('about-modal'),
            contentContainer: document.getElementById('about-modal')?.querySelector('.bg-white.rounded-xl'),
            openBtn: document.getElementById('open-about-modal-btn'),
            closeBtnHeader: document.getElementById('close-about-modal-btn'),
            closeBtnFooter: document.getElementById('close-about-modal-btn-footer'),
        },
        contactModal: {
            el: document.getElementById('contact-modal'),
            contentContainer: document.getElementById('contact-modal')?.querySelector('.bg-white.rounded-xl'),
            openBtn: document.getElementById('open-contact-modal-btn'),
            closeBtnHeader: document.getElementById('close-contact-modal-btn'),
            closeBtnFooter: document.getElementById('close-contact-modal-btn-footer'),
        },
        slidebar: {
            burgerMenuButton: document.getElementById('burger-menu-button'),
            el: document.getElementById('mobile-slidebar'),
            overlay: document.getElementById('slidebar-overlay'),
            aboutLink: document.getElementById('slidebar-about-link'),
            contactLink: document.getElementById('slidebar-contact-link'),
        }
    };

    // --- Utility Functions ---
    function getSiteHeaderHeight() {
        // If lightbox is active and header is meant to be hidden, consider its height 0 for calculations.
        if (document.body.classList.contains('lightbox-active') && headerHiddenByLightbox && window.innerWidth >= 640) return 0;
        return (DOMElements.siteHeader && DOMElements.siteHeader.offsetParent !== null) ? DOMElements.siteHeader.offsetHeight : 0;
    }

    function setupFocusTrap(containerElement, firstFocusableOverride = null, lastFocusableOverride = null) {
        const focusableElements = Array.from(
            containerElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        ).filter(el => el.offsetParent !== null && !el.disabled);

        if (!focusableElements.length && !firstFocusableOverride && !lastFocusableOverride) return;

        let finalFirst = firstFocusableOverride;
        let finalLast = lastFocusableOverride;

        if (focusableElements.length > 0) {
            if (!finalFirst) finalFirst = focusableElements[0];
            if (!finalLast) finalLast = focusableElements[focusableElements.length - 1];
        } else {
            if (!finalFirst && finalLast) finalFirst = finalLast;
            if (!finalLast && finalFirst) finalLast = finalFirst;
        }
        
        if (!finalFirst || !finalLast) return;

        // Focus the first element only if it's the initial opening of a modal,
        // not when re-establishing a trap for a temporarily hidden modal.
        // The caller will handle specific focus restoration in those cases.
        if (!containerElement.dataset.focusTrapInitialized) {
             setTimeout(() => finalFirst.focus(), 50); 
             containerElement.dataset.focusTrapInitialized = "true";
        }


        containerElement.currentFocusTrap = function trapFocus(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) { 
                    if (document.activeElement === finalFirst) { e.preventDefault(); finalLast.focus(); }
                } else { 
                    if (document.activeElement === finalLast) { e.preventDefault(); finalFirst.focus(); }
                }
            }
        };
        document.addEventListener('keydown', containerElement.currentFocusTrap);
    }
    
    function removeFocusTrap(containerElement) {
        if (containerElement.currentFocusTrap) {
            document.removeEventListener('keydown', containerElement.currentFocusTrap);
            delete containerElement.currentFocusTrap;
            delete containerElement.dataset.focusTrapInitialized;
        }
    }

    // --- Data Fetching ---
    async function fetchMenuData() {
        console.log("Fetching menu data from: menu-data.json");
        try {
            const response = await fetch('menu-data.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}, on ${response.url}`);
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) throw new Error("Fetched menu data is invalid or empty.");
            
            originalMenuData = data;
            currentMenuData = JSON.parse(JSON.stringify(originalMenuData)); // Deep copy
            console.log("Menu data fetched and processed.");
            return true;
        } catch (error) {
            console.error("Could not fetch or parse menu data:", error);
            if (DOMElements.productListContainer) DOMElements.productListContainer.innerHTML = `<p class="text-center text-red-500 py-10">Failed to load menu. Please try again later.</p>`;
            if (DOMElements.searchResultsMessageEl) DOMElements.searchResultsMessageEl.classList.add('hidden');
            return false;
        }
    }

    // --- UI Rendering Functions ---
    function renderDesktopCategories(dataToRender = currentMenuData) {
        const container = DOMElements.desktopCategoryTabsContainer;
        if (!container) return;
        container.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const uniqueSubCategories = new Map();

        dataToRender.forEach(mc => mc.subCategories?.forEach(sc => {
            if (sc.items?.length) uniqueSubCategories.set(sc.category, `category-${sc.category.replace(/\s+/g, '-')}`);
        }));

        if (uniqueSubCategories.size === 0 && (DOMElements.desktopSearchInput.value || DOMElements.mobileSearchInput.value)) {
            container.innerHTML = `<span class="p-3 text-sm text-gray-500 italic">No categories match your search.</span>`;
            return;
        }

        uniqueSubCategories.forEach((sectionId, categoryName) => {
            const tabButton = document.createElement('button');
            tabButton.className = "py-3 px-3 sm:px-4 text-sm sm:text-base font-medium whitespace-nowrap transition-all duration-200 ease-in-out border-b-3 border-transparent text-gray-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50";
            tabButton.textContent = categoryName;
            tabButton.dataset.category = categoryName;
            tabButton.setAttribute('role', 'tab');
            tabButton.setAttribute('aria-selected', 'false');
            tabButton.addEventListener('click', () => scrollToSection(sectionId));
            fragment.appendChild(tabButton);
        });
        container.appendChild(fragment);
    }

    function renderMobileCategoryDropdown(dataToRender = currentMenuData) {
        const selectEl = DOMElements.mobileCategorySelect;
        if (!selectEl) return;
        selectEl.innerHTML = '<option value="">All Categories</option>'; // Reset with default
        const fragment = document.createDocumentFragment();
        const uniqueSubCategories = new Map();

        dataToRender.forEach(mc => mc.subCategories?.forEach(sc => {
            if (sc.items?.length) uniqueSubCategories.set(sc.category, `category-${sc.category.replace(/\s+/g, '-')}`);
        }));

        if (uniqueSubCategories.size === 0 && (DOMElements.desktopSearchInput.value || DOMElements.mobileSearchInput.value)) {
            const noResultsOption = new Option("No matching categories", "", false, true); // value, text, defaultSelected, selected
            noResultsOption.disabled = true;
            fragment.appendChild(noResultsOption);
            selectEl.disabled = false; // Keep enabled to show "No matching"
        } else {
            selectEl.disabled = uniqueSubCategories.size === 0;
            uniqueSubCategories.forEach((sectionId, categoryName) => {
                fragment.appendChild(new Option(categoryName, sectionId));
            });
        }
        selectEl.appendChild(fragment);
        selectEl.value = ""; // Ensure "All Categories" is selected initially
    }

    function createItemCard(item) {
        const itemCard = document.createElement('div');
        itemCard.className = 'menu-item-card bg-white rounded-2xl shadow-lg cursor-pointer focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-opacity-50 transition-shadow hover:shadow-xl overflow-hidden sm:min-h-[29rem]';
        itemCard.dataset.itemId = item.id;
        itemCard.tabIndex = 0;
        itemCard.setAttribute('role', 'button');
        itemCard.setAttribute('aria-label', `View details for ${item.name}`);
        const imageSrc = item.image ? item.image.replace(/w=\d+/, 'w=400').replace(/q=\d+/, 'q=75') : 'https://via.placeholder.com/300x300/E2E8F0/CBD5E0?text=Food';
        
        const shapesHTML = (isMobile) => `
            <div class="card-decorative-shapes absolute inset-0 z-0 opacity-${isMobile ? 40 : 50} overflow-hidden" aria-hidden="true">
                <div class="absolute w-${isMobile ? 20 : 32} h-${isMobile ? 20 : 32} bg-cyan-200 rounded-full -top-${isMobile ? 4 : 10} -left-${isMobile ? 6 : 14} transform"></div>
                <div class="absolute w-${isMobile ? 24 : 40} h-${isMobile ? 24 : 40} bg-fuchsia-200 rounded-full -bottom-${isMobile ? 5 : 12} -right-${isMobile ? 5 : 12} transform"></div>
                ${!isMobile ? `
                <div class="absolute w-28 h-28 bg-indigo-200 rounded-full top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/4 opacity-70"></div>
                <div class="absolute w-24 h-24 bg-red-200 rounded-xl top-5 -right-8 transform rotate-[25deg] opacity-60"></div>
                <div class="absolute w-20 h-32 bg-sky-200 rounded-full bottom-5 left-0 transform -rotate-[15deg] opacity-50"></div>
                <div class="absolute w-36 h-16 bg-green-200 rounded-lg top-20 -left-5 transform rotate-[10deg] opacity-60"></div>` : `
                <div class="absolute w-16 h-16 bg-yellow-200 rounded-full top-10 -right-3 transform rotate-12 opacity-80"></div>
                <div class="absolute w-12 h-12 bg-lime-200 rounded-lg -bottom-2 left-2 transform -rotate-15 opacity-70"></div>
                <div class="absolute w-10 h-10 bg-pink-200 rounded-full top-0 right-8 opacity-90"></div>`}
            </div>`;

        itemCard.innerHTML = `
            <div class="flex sm:hidden p-4 items-center space-x-3">
                <div class="relative w-20 h-20 flex-shrink-0">
                    ${shapesHTML(true)}
                    <div class="main-card-image-wrapper-mobile relative z-10 w-full h-full rounded-full overflow-hidden shadow-md border-2 border-white">
                        <img src="${imageSrc}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy">
                    </div>
                </div>
                <div class="flex-grow min-w-0"><h3 class="text-base font-semibold text-gray-800 mb-0 truncate">${item.name}</h3><p class="text-lg font-bold text-purple-700">$${item.price.toFixed(2)}</p><p class="text-sm text-gray-500 leading-snug line-clamp-1">${item.description || 'Delicious item.'}</p></div>
            </div>
            <div class="hidden sm:flex flex-col h-full p-5">
                <div class="relative h-48 md:h-56 mb-4 flex items-center justify-center overflow-hidden">
                    ${shapesHTML(false)}
                    <div class="main-card-image-wrapper-desktop relative z-10 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-xl border-4 border-white">
                        <img src="${imageSrc}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy">
                    </div>
                </div>
                <div class="flex-grow flex flex-col text-center sm:text-left"><h3 class="text-base md:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">${item.name}</h3><p class="text-lg md:text-xl font-bold text-purple-600 mb-2">$${item.price.toFixed(2)}</p><p class="text-xs text-gray-600 mb-4 leading-relaxed line-clamp-2">${item.description || 'Delicious item.'}</p><div class="mt-auto flex justify-end items-center pt-2"><span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">AVAILABLE</span></div></div>
            </div>`;
        return itemCard;
    }
    
    function renderMenuItems(dataToRender = currentMenuData) {
        const container = DOMElements.productListContainer;
        const messageEl = DOMElements.searchResultsMessageEl;
        if (!container || !messageEl) return;

        container.innerHTML = ''; // Clear previous items
        const fragment = document.createDocumentFragment();
        let itemsRendered = 0;
        const searchTerm = (DOMElements.desktopSearchInput.value || DOMElements.mobileSearchInput.value || "").toLowerCase().trim();

        if (!Array.isArray(dataToRender)) dataToRender = [];

        if (dataToRender.length === 0 && !searchTerm && !fetchMenuDataCalledOnce) {
            messageEl.textContent = "Loading menu...";
            messageEl.classList.remove('hidden');
            container.classList.add('hidden');
            if (sectionObserver) sectionObserver.disconnect();
            return;
        }

        dataToRender.forEach(mainCategoryData => {
            const mainCategoryContainer = document.createElement('div');
            mainCategoryContainer.className = 'mb-8 last:mb-0';
            
            const mainTitle = document.createElement('h1');
            mainTitle.className = 'main-category-title px-1 text-2xl sm:text-3xl font-bold tracking-tight mb-4 sm:mb-6';
            mainTitle.id = `main-${mainCategoryData.mainCategoryName.replace(/\s+/g, '-')}`;
            mainTitle.textContent = mainCategoryData.mainCategoryName;
            mainCategoryContainer.appendChild(mainTitle);

            let hasSubCategoryContent = false;
            let isFirstSubCategoryInSection = true;
            mainCategoryData.subCategories.forEach(subCategoryData => {
                if (!subCategoryData.items?.length) return;
                
                hasSubCategoryContent = true;
                itemsRendered += subCategoryData.items.length;

                const section = document.createElement('section');
                section.id = `category-${subCategoryData.category.replace(/\s+/g, '-')}`;
                section.className = `sub-category-section ${isFirstSubCategoryInSection ? '' : 'mt-6 sm:mt-8'}`;
                section.setAttribute('aria-labelledby', `sub-title-${subCategoryData.category.replace(/\s+/g, '-')}`);
                isFirstSubCategoryInSection = false;

                const subCategoryTitleElement = document.createElement('h2');
                subCategoryTitleElement.id = `sub-title-${subCategoryData.category.replace(/\s+/g, '-')}`;
                subCategoryTitleElement.className = 'text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4 p-2 bg-gray-100 rounded-lg shadow-sm';
                subCategoryTitleElement.textContent = subCategoryData.category;
                section.appendChild(subCategoryTitleElement);
                
                const itemsGrid = document.createElement('div');
                itemsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5';
                itemsGrid.setAttribute('role', 'list');

                subCategoryData.items.forEach(item => {
                    const card = createItemCard(item);
                    card.setAttribute('role', 'listitem');
                    itemsGrid.appendChild(card);
                });
                section.appendChild(itemsGrid); 
                mainCategoryContainer.appendChild(section); 
            });
            if(hasSubCategoryContent) fragment.appendChild(mainCategoryContainer);
        });
        container.appendChild(fragment);
        updateSearchResultsMessage(itemsRendered, searchTerm);
        addEventListenersToItemCards();

        if (itemsRendered > 0) initializeObserver();
        else if (sectionObserver) sectionObserver.disconnect();
    }

    function updateSearchResultsMessage(itemsRendered, searchTerm) {
        const messageEl = DOMElements.searchResultsMessageEl;
        if (!messageEl) return;
        
        let message = "";
        if (itemsRendered === 0) {
            if (searchTerm) message = `No menu items found for "${searchTerm}". Try a different search.`;
            else if (originalMenuData.length > 0) message = "No menu items available for the selected filters.";
            else if (fetchMenuDataCalledOnce) message = "No menu items available at the moment. Please check back later.";
        }
        messageEl.textContent = message;
        messageEl.classList.toggle('hidden', !message);
        DOMElements.productListContainer.classList.toggle('hidden', !!message);
    }
    
    function addEventListenersToItemCards() {
        DOMElements.productListContainer.querySelectorAll('.menu-item-card[data-item-id]').forEach(card => {
            const openModalHandler = () => {
                previouslyFocusedElement = card; // Save card as element that opened details modal
                const itemData = findItemById(parseInt(card.dataset.itemId));
                if (itemData) openDetailsModal(itemData);
            };
            card.addEventListener('click', openModalHandler);
            card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModalHandler(); }});
        });
    }

    // --- Item/Category Logic ---
    function findItemById(id) {
        for (const mc of originalMenuData) {
            for (const sc of mc.subCategories) {
                const foundItem = sc.items.find(i => i.id === id);
                if (foundItem) return { item: foundItem, mainCategoryName: mc.mainCategoryName, subCategoryName: sc.category };
            }
        }
        return null;
    }

    function applyFiltersAndSearch() {
        const searchTerm = (DOMElements.desktopSearchInput.value || DOMElements.mobileSearchInput.value || "").toLowerCase().trim();
        let tempData = JSON.parse(JSON.stringify(originalMenuData)); // Deep copy for filtering

        if (searchTerm) {
            tempData = tempData.map(mainCategory => ({
                ...mainCategory,
                subCategories: mainCategory.subCategories.map(subCategory => ({
                    ...subCategory,
                    items: subCategory.items.filter(item =>
                        item.name.toLowerCase().includes(searchTerm) ||
                        (item.description && item.description.toLowerCase().includes(searchTerm))
                    )
                })).filter(subCategory => subCategory.items.length > 0)
            })).filter(mainCategory => mainCategory.subCategories.length > 0);
        }

        currentMenuData = tempData;
        renderMenuItems(currentMenuData);
        renderDesktopCategories(currentMenuData);
        renderMobileCategoryDropdown(currentMenuData);

        setActiveDesktopTab(null); 
        if (DOMElements.mobileCategorySelect) DOMElements.mobileCategorySelect.value = "";

        if (DOMElements.specialMenuSection) {
            const isDesktopSearchActive = DOMElements.desktopSearchInput.value.trim() !== "";
            const isMobileSearchActive = DOMElements.mobileSearchInput.value.trim() !== "";
            const isMobileSearchFocused = document.activeElement === DOMElements.mobileSearchInput;
            
            DOMElements.specialMenuSection.classList.toggle('hidden', isDesktopSearchActive || isMobileSearchActive || isMobileSearchFocused);
        }
    }

    // --- Modal Management ---
    function openGenericModal(modalConfig, triggerElement) {
        // `previouslyFocusedElement` is set by the caller (e.g., card click) or here if not passed
        if (triggerElement) previouslyFocusedElement = triggerElement;
        else if (!previouslyFocusedElement) previouslyFocusedElement = document.activeElement;

        modalConfig.el.classList.remove('modal-hidden');
        modalConfig.el.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            modalConfig.el.classList.remove('opacity-0');
            if (modalConfig.contentContainer) {
                modalConfig.contentContainer.classList.remove('scale-95', 'opacity-0');
                modalConfig.contentContainer.classList.add('scale-100', 'opacity-100');
            }
            setupFocusTrap(modalConfig.el); 
        }, 10); 
    }

    function closeGenericModal(modalConfig) {
        modalConfig.el.classList.add('opacity-0');
        modalConfig.el.setAttribute('aria-hidden', 'true');
        if (modalConfig.contentContainer) {
            modalConfig.contentContainer.classList.remove('scale-100', 'opacity-100');
            modalConfig.contentContainer.classList.add('scale-95', 'opacity-0');
        }
        
        removeFocusTrap(modalConfig.el);

        setTimeout(() => {
            modalConfig.el.classList.add('modal-hidden');
            if (previouslyFocusedElement) {
                previouslyFocusedElement.focus();
                // previouslyFocusedElement = null; // Clear only if this is the last modal to close.
                                                // If lightbox was involved, this `previouslyFocusedElement`
                                                // is for the details modal, not the lightbox.
            }
            // Restore body scroll ONLY if no other modal/slidebar is active
            // Check if any other known modal is still active.
            let anotherModalIsOpen = false;
            [DOMElements.detailsModal.el, DOMElements.lightboxModal.el, DOMElements.aboutModal.el, DOMElements.contactModal.el].forEach(m => {
                if (m && m !== modalConfig.el && !m.classList.contains('modal-hidden')) {
                    anotherModalIsOpen = true;
                }
            });
            if (isSlidebarOpen) anotherModalIsOpen = true;
            
            if (!anotherModalIsOpen) {
                document.body.style.overflow = '';
                previouslyFocusedElement = null; // Safe to clear now
            }
        }, 300); 
    }
    
    // Item Details Modal
    function openDetailsModal(itemDataWithCategories) {
        currentModalItemData = itemDataWithCategories;
        const { item, mainCategoryName, subCategoryName } = itemDataWithCategories;
        const modal = DOMElements.detailsModal;

        modal.itemName.textContent = item.name;
        modal.itemImage.src = item.image || 'https://via.placeholder.com/400x300/E2E8F0/CBD5E0?Text=Food';
        modal.itemImage.alt = `${item.name} - Detailed view`;
        modal.itemDescription.textContent = item.description || 'No description available.';
        modal.mainCategory.textContent = mainCategoryName || 'N/A';
        modal.subCategory.textContent = subCategoryName || 'N/A';
        modal.itemPrice.textContent = `Price: $${item.price.toFixed(2)}`;

        const hasMeatChoices = item.meatChoices && item.meatChoices.length > 0;
        modal.meatChoicesContainer.classList.toggle('hidden', !hasMeatChoices);
        if (hasMeatChoices) {
            modal.meatChoicesList.innerHTML = '';
            item.meatChoices.forEach(choice => {
                const choiceEl = document.createElement('span');
                choiceEl.className = 'px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs';
                choiceEl.textContent = choice;
                modal.meatChoicesList.appendChild(choiceEl);
            });
        }
        // `previouslyFocusedElement` (e.g., the menu card) is already set by the card's click handler.
        openGenericModal({ el: modal.el, contentContainer: modal.content });
    }
    function closeDetailsModal() { closeGenericModal({ el: DOMElements.detailsModal.el, contentContainer: DOMElements.detailsModal.content }); }

    // Lightbox Modal --- MODIFIED
    function openLightboxModal(imageUrl) {
        const modal = DOMElements.lightboxModal;
        modal.image.src = imageUrl;
        modal.image.alt = currentModalItemData ? `${currentModalItemData.item.name} - Full screen view` : "Full screen image";
        
        elementThatOpenedLightbox = document.activeElement; // Store what was focused (e.g., #modal-item-image)

        // If lightbox is opened from within the details modal, hide the details modal
        if (DOMElements.detailsModal.el && !DOMElements.detailsModal.el.classList.contains('modal-hidden') && 
            DOMElements.detailsModal.el.contains(elementThatOpenedLightbox)) {
            
            DOMElements.detailsModal.el.classList.add('modal-hidden', 'opacity-0'); // Hide instantly
            if (DOMElements.detailsModal.content) {
                DOMElements.detailsModal.content.classList.add('opacity-0', 'scale-95');
                DOMElements.detailsModal.content.classList.remove('scale-100', 'opacity-100');
            }
            detailsModalHiddenByLightbox = true;
            removeFocusTrap(DOMElements.detailsModal.el); 
        }

        // Hide header on desktop
        if (window.innerWidth >= 640) { // Assuming 640px is desktop breakpoint (sm)
            DOMElements.siteHeader.style.transform = 'translateY(-100%)';
            headerHiddenByLightbox = true;
        }
        
        document.body.classList.add('lightbox-active'); // Used to potentially style other elements
        document.body.classList.add('lightbox-card-decor-hidden'); // Hide card decorations
        
        modal.el.classList.remove('modal-hidden');
        modal.el.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; 

        setTimeout(() => {
            modal.el.classList.remove('opacity-0');
            setupFocusTrap(modal.el, modal.closeBtn, modal.closeBtn); 
        }, 10);
    }

    function closeLightboxModal() {
        const modal = DOMElements.lightboxModal;

        modal.el.classList.add('opacity-0'); 
        modal.el.setAttribute('aria-hidden', 'true');
        removeFocusTrap(modal.el);

        setTimeout(() => { 
            modal.el.classList.add('modal-hidden');
            document.body.classList.remove('lightbox-active');
            document.body.classList.remove('lightbox-card-decor-hidden'); // Show card decorations

            if (headerHiddenByLightbox) {
                DOMElements.siteHeader.style.transform = 'translateY(0)';
                headerHiddenByLightbox = false;
            }

            let focusedRestoredToDetailsModal = false;
            if (detailsModalHiddenByLightbox) {
                DOMElements.detailsModal.el.classList.remove('modal-hidden', 'opacity-0');
                if (DOMElements.detailsModal.content) {
                    DOMElements.detailsModal.content.classList.remove('opacity-0', 'scale-95');
                    DOMElements.detailsModal.content.classList.add('scale-100', 'opacity-100');
                }
                detailsModalHiddenByLightbox = false;
                setupFocusTrap(DOMElements.detailsModal.el);
                if (elementThatOpenedLightbox && DOMElements.detailsModal.el.contains(elementThatOpenedLightbox)) {
                    setTimeout(() => elementThatOpenedLightbox.focus(), 0); // Focus after styles apply
                } else if (DOMElements.detailsModal.closeBtn) { 
                    setTimeout(() => DOMElements.detailsModal.closeBtn.focus(), 0);
                }
                focusedRestoredToDetailsModal = true;
            } else {
                if (elementThatOpenedLightbox) {
                     setTimeout(() => elementThatOpenedLightbox.focus(), 0);
                }
            }
            elementThatOpenedLightbox = null;

            // Manage body scroll. If details modal was restored, it keeps scroll locked.
            // Otherwise, unlock if no other modals are open.
            let shouldUnlockScroll = true;
            if (focusedRestoredToDetailsModal) { 
                shouldUnlockScroll = false; // Details modal is now active and managing scroll
            } else {
                 // Check if any other modal (besides lightbox itself) is open
                [DOMElements.detailsModal.el, DOMElements.aboutModal.el, DOMElements.contactModal.el].forEach(m => {
                    if (m && !m.classList.contains('modal-hidden')) {
                        shouldUnlockScroll = false;
                    }
                });
                if (isSlidebarOpen) shouldUnlockScroll = false;
            }
            
            if (shouldUnlockScroll) {
                document.body.style.overflow = '';
                previouslyFocusedElement = null; // Clear if no modals are left
            }

        }, 300);
    }


    // Slidebar
    function openSlidebar() {
        const slidebar = DOMElements.slidebar;
        if (isSlidebarOpen || !slidebar.el || !slidebar.overlay || !slidebar.burgerMenuButton) return;
        
        isSlidebarOpen = true;
        previouslyFocusedElementBeforeSlidebar = document.activeElement;
        document.body.classList.add('slidebar-open');
        slidebar.el.classList.remove('-translate-x-full');
        slidebar.el.classList.add('translate-x-0');
        slidebar.el.setAttribute('aria-hidden', 'false');
        slidebar.overlay.classList.remove('invisible', 'opacity-0');
        slidebar.overlay.classList.add('visible', 'opacity-100');
        slidebar.burgerMenuButton.classList.add('is-active');
        slidebar.burgerMenuButton.setAttribute('aria-expanded', 'true');
        slidebar.burgerMenuButton.setAttribute('aria-label', 'Close main menu');
        document.body.style.overflow = 'hidden';


        const focusableInSlidebar = Array.from(slidebar.el.querySelectorAll('button, [href]')).filter(el => el.offsetParent !== null && !el.disabled);
        const lastFocusable = focusableInSlidebar.length > 0 ? focusableInSlidebar[focusableInSlidebar.length - 1] : slidebar.burgerMenuButton;
        setupFocusTrap(slidebar.el, slidebar.burgerMenuButton, lastFocusable); 
    }

    function closeSlidebar() {
        const slidebar = DOMElements.slidebar;
        if (!isSlidebarOpen || !slidebar.el || !slidebar.overlay || !slidebar.burgerMenuButton) return;

        isSlidebarOpen = false;
        removeFocusTrap(slidebar.el); // Remove trap first

        document.body.classList.remove('slidebar-open');
        slidebar.el.classList.add('-translate-x-full');
        slidebar.el.classList.remove('translate-x-0');
        slidebar.el.setAttribute('aria-hidden', 'true');
        slidebar.overlay.classList.add('invisible', 'opacity-0');
        slidebar.overlay.classList.remove('visible', 'opacity-100');
        slidebar.burgerMenuButton.classList.remove('is-active');
        slidebar.burgerMenuButton.setAttribute('aria-expanded', 'false');
        slidebar.burgerMenuButton.setAttribute('aria-label', 'Open main menu');

        if (previouslyFocusedElementBeforeSlidebar) {
            previouslyFocusedElementBeforeSlidebar.focus();
            previouslyFocusedElementBeforeSlidebar = null;
        }
        
        // Restore body scroll ONLY if no other modal is active
        let anotherModalIsOpen = false;
        [DOMElements.detailsModal.el, DOMElements.lightboxModal.el, DOMElements.aboutModal.el, DOMElements.contactModal.el].forEach(m => {
            if (m && !m.classList.contains('modal-hidden')) {
                anotherModalIsOpen = true;
            }
        });
        if (!anotherModalIsOpen) {
            document.body.style.overflow = '';
        }
    }

    // --- Scroll & Navigation ---
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = getSiteHeaderHeight() + 15; 
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        }
    }

    function setActiveDesktopTab(activeTab) {
        const container = DOMElements.desktopCategoryTabsContainer;
        if (!container) return;
        container.querySelectorAll('button[role="tab"]').forEach(button => {
            button.classList.remove('active-category-tab');
            button.classList.add('text-gray-500', 'hover:text-green-600');
            button.setAttribute('aria-selected', 'false');
        });
        if (activeTab) {
            activeTab.classList.add('active-category-tab');
            activeTab.classList.remove('text-gray-500', 'hover:text-green-600');
            activeTab.setAttribute('aria-selected', 'true');
        }
    }
    
    function initializeObserver() {
        if (sectionObserver) sectionObserver.disconnect();
        
        const observerRootMarginTop = getSiteHeaderHeight();
        const subSections = DOMElements.productListContainer.querySelectorAll('.sub-category-section');
        if (!subSections.length) {
            console.log("No sub-category sections found to observe.");
            return;
        }

        const observerOptions = { 
            root: null, 
            rootMargin: `-${observerRootMarginTop + 20}px 0px -40% 0px`, 
            threshold: 0.1 
        };

        let currentActiveSectionId = null; 

        sectionObserver = new IntersectionObserver(entries => {
            let mostVisibleEntry = null;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!mostVisibleEntry || entry.intersectionRatio > mostVisibleEntry.intersectionRatio) {
                        mostVisibleEntry = entry;
                    }
                }
            });

            if (mostVisibleEntry && mostVisibleEntry.target.id !== currentActiveSectionId) {
                currentActiveSectionId = mostVisibleEntry.target.id;
                const subCategoryName = currentActiveSectionId.replace('category-', '').replace(/-/g, ' ');
                
                if (window.innerWidth >= 640 && DOMElements.desktopCategoryTabsContainer) {
                    const activeTab = Array.from(DOMElements.desktopCategoryTabsContainer.querySelectorAll('button')).find(t => t.dataset.category === subCategoryName);
                    if (activeTab) {
                        setActiveDesktopTab(activeTab);
                        if (activeTab.offsetLeft < DOMElements.desktopCategoryTabsContainer.scrollLeft || 
                            activeTab.offsetLeft + activeTab.offsetWidth > DOMElements.desktopCategoryTabsContainer.scrollLeft + DOMElements.desktopCategoryTabsContainer.clientWidth) {
                            requestAnimationFrame(() => {
                                DOMElements.desktopCategoryTabsContainer.scrollTo({
                                    left: activeTab.offsetLeft - DOMElements.desktopCategoryTabsContainer.offsetWidth / 2 + activeTab.offsetWidth / 2,
                                    behavior: 'smooth'
                                });
                            });
                        }
                    }
                }
                if (window.innerWidth < 640 && DOMElements.mobileCategorySelect && !DOMElements.mobileSearchInput.matches(':focus')) {
                     if (DOMElements.mobileCategorySelect.value !== currentActiveSectionId) DOMElements.mobileCategorySelect.value = currentActiveSectionId;
                }
            } 
        }, observerOptions);
        subSections.forEach(section => sectionObserver.observe(section));
    }

    // --- Event Listener Setup ---
    function setupEventListeners() {
        if (DOMElements.backToTopBtn) {
            window.addEventListener('scroll', () => DOMElements.backToTopBtn.classList.toggle('show', window.pageYOffset > 300));
            DOMElements.backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }

        [DOMElements.desktopSearchInput, DOMElements.mobileSearchInput].forEach(input => {
            if (input) input.addEventListener('input', applyFiltersAndSearch);
        });

        if (DOMElements.mobileSearchInput && DOMElements.mobileCategoryDropdownContainer && DOMElements.mobileSearchContainer) {
            DOMElements.mobileSearchInput.addEventListener('focus', () => {
                DOMElements.mobileCategoryDropdownContainer.classList.add('w-0', 'opacity-0', 'pointer-events-none');
                DOMElements.mobileSearchContainer.classList.add('w-full');
                if (DOMElements.specialMenuSection) DOMElements.specialMenuSection.classList.add('hidden');
            });
            DOMElements.mobileSearchInput.addEventListener('blur', () => {
                if (DOMElements.mobileSearchInput.value === '') {
                    DOMElements.mobileCategoryDropdownContainer.classList.remove('w-0', 'opacity-0', 'pointer-events-none');
                    DOMElements.mobileSearchContainer.classList.remove('w-full');
                    if (DOMElements.specialMenuSection && DOMElements.desktopSearchInput.value.trim() === '') {
                        DOMElements.specialMenuSection.classList.remove('hidden');
                    }
                }
            });
        }
        
        if (DOMElements.mobileCategorySelect && !DOMElements.mobileCategorySelect.dataset.listenerAttached) {
            DOMElements.mobileCategorySelect.addEventListener('change', (e) => {
                if (e.target.value) scrollToSection(e.target.value);
                else if (DOMElements.productListWrapper) { 
                    const offset = getSiteHeaderHeight() + 10;
                    window.scrollTo({ top: DOMElements.productListWrapper.offsetTop - offset, behavior: 'smooth' });
                }
                e.target.blur(); 
            });
            DOMElements.mobileCategorySelect.dataset.listenerAttached = 'true';
        }

        const { detailsModal, lightboxModal, aboutModal, contactModal, slidebar } = DOMElements;

        if (detailsModal.closeBtn) detailsModal.closeBtn.addEventListener('click', closeDetailsModal);
        if (detailsModal.el) detailsModal.el.addEventListener('click', e => { if (e.target === detailsModal.el) closeDetailsModal(); });
        
        if (detailsModal.itemImage) {
            const handleImageClickOrKey = () => {
                if (detailsModal.itemImage.src && !detailsModal.itemImage.src.includes('via.placeholder.com')) {
                    openLightboxModal(detailsModal.itemImage.src); 
                }
            };
            detailsModal.itemImage.addEventListener('click', handleImageClickOrKey);
            detailsModal.itemImage.addEventListener('keydown', e => {
                 if ((e.key === 'Enter' || e.key === ' ') && detailsModal.itemImage.src && !detailsModal.itemImage.src.includes('via.placeholder.com')) {
                    e.preventDefault();
                    handleImageClickOrKey();
                }
            });
        }

        if (lightboxModal.closeBtn) lightboxModal.closeBtn.addEventListener('click', closeLightboxModal);
        if (lightboxModal.el) lightboxModal.el.addEventListener('click', e => { if (e.target === lightboxModal.el) closeLightboxModal(); });

        if (aboutModal.openBtn) aboutModal.openBtn.addEventListener('click', (e) => openGenericModal(aboutModal, e.currentTarget));
        if (aboutModal.closeBtnHeader) aboutModal.closeBtnHeader.addEventListener('click', () => closeGenericModal(aboutModal));
        if (aboutModal.closeBtnFooter) aboutModal.closeBtnFooter.addEventListener('click', () => closeGenericModal(aboutModal));
        if (aboutModal.el) aboutModal.el.addEventListener('click', e => { if (e.target === aboutModal.el) closeGenericModal(aboutModal); });
        
        if (contactModal.openBtn) contactModal.openBtn.addEventListener('click', (e) => openGenericModal(contactModal, e.currentTarget));
        if (contactModal.closeBtnHeader) contactModal.closeBtnHeader.addEventListener('click', () => closeGenericModal(contactModal));
        if (contactModal.closeBtnFooter) contactModal.closeBtnFooter.addEventListener('click', () => closeGenericModal(contactModal));
        if (contactModal.el) contactModal.el.addEventListener('click', e => { if (e.target === contactModal.el) closeGenericModal(contactModal); });

        if (slidebar.burgerMenuButton) slidebar.burgerMenuButton.addEventListener('click', () => isSlidebarOpen ? closeSlidebar() : openSlidebar());
        if (slidebar.overlay) slidebar.overlay.addEventListener('click', closeSlidebar);
        if (slidebar.aboutLink) slidebar.aboutLink.addEventListener('click', (e) => { if(isSlidebarOpen) closeSlidebar(); setTimeout(() => openGenericModal(aboutModal, e.currentTarget), isSlidebarOpen ? 300 : 0 ); });
        if (slidebar.contactLink) slidebar.contactLink.addEventListener('click', (e) => { if(isSlidebarOpen) closeSlidebar(); setTimeout(() => openGenericModal(contactModal, e.currentTarget), isSlidebarOpen ? 300 : 0 ); });


        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                if (isSlidebarOpen) closeSlidebar();
                else if (lightboxModal.el && !lightboxModal.el.classList.contains('modal-hidden')) closeLightboxModal();
                else if (detailsModal.el && !detailsModal.el.classList.contains('modal-hidden')) closeDetailsModal();
                else if (aboutModal.el && !aboutModal.el.classList.contains('modal-hidden')) closeGenericModal(aboutModal);
                else if (contactModal.el && !contactModal.el.classList.contains('modal-hidden')) closeGenericModal(contactModal);
            }
        });

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initializeObserver(); 
                if (window.innerWidth >=640 && DOMElements.desktopCategoryTabsContainer.querySelector('.active-category-tab') === null) {
                    setInitialActiveCategory();
                }
                if (headerHiddenByLightbox && window.innerWidth < 640) {
                    DOMElements.siteHeader.style.transform = 'translateY(0)'; 
                } else if (headerHiddenByLightbox && window.innerWidth >= 640) {
                    DOMElements.siteHeader.style.transform = 'translateY(-100%)'; 
                }

            }, 250);
        });
    }
    
    function setInitialActiveCategory() {
        if (window.innerWidth >= 640 && DOMElements.desktopCategoryTabsContainer && DOMElements.desktopCategoryTabsContainer.children.length > 0) {
            const firstTab = DOMElements.desktopCategoryTabsContainer.children[0];
            if (firstTab && typeof firstTab.matches === 'function' && firstTab.matches('button[role="tab"]')) {
                let activeTabByObserver = false;
                DOMElements.productListContainer.querySelectorAll('.sub-category-section').forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const headerHeight = getSiteHeaderHeight();
                    if (rect.top >= headerHeight && rect.top < (window.innerHeight / 2)) { 
                         activeTabByObserver = true;
                    }
                });
                if(!activeTabByObserver && !DOMElements.desktopCategoryTabsContainer.querySelector('.active-category-tab')) {
                     setActiveDesktopTab(firstTab);
                }
            }
        }
    }

    // --- Initialization ---
    async function initializeApp() {
        console.log("Initializing A-One Restaurant App...");
        if (DOMElements.currentYearEl) DOMElements.currentYearEl.textContent = new Date().getFullYear();
        
        setupEventListeners();

        fetchMenuDataCalledOnce = true;
        const dataLoaded = await fetchMenuData();

        if (dataLoaded) {
            applyFiltersAndSearch(); 
            setTimeout(setInitialActiveCategory, 350); 
        } else {
            console.warn("App initialized without menu data due to fetch error.");
        }
    }

    initializeApp();
});