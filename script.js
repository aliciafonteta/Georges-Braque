// ========================================
// Hamburger Menu Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburgerBtn) {
        // Toggle menu
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navigation')) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ========================================
// Search Functionality
// ========================================

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        showNotification('Por favor, ingresa un término de búsqueda', 'error');
        return false;
    }
    
    // Filter blog posts
    const posts = document.querySelectorAll('.blog-post');
    let foundCount = 0;
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const content = post.querySelector('.post-content').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.5s ease';
            foundCount++;
        } else {
            post.style.display = 'none';
        }
    });
    
    // Show result message
    const resultsMessage = document.createElement('div');
    resultsMessage.className = 'search-results-message';
    resultsMessage.innerHTML = `
        <span>Se encontraron ${foundCount} resultado(s) para "<strong>${escapeHtml(searchTerm)}</strong>"</span>
        <button onclick="clearSearch()" style="margin-left: 1rem; padding: 0.5rem 1rem; background-color: white; color: var(--color-dark-charcoal); border: none; cursor: pointer; font-size: 0.85rem; font-weight: 600; border-radius: 3px;">Limpiar búsqueda</button>
    `;
    resultsMessage.style.cssText = `
        padding: 1rem;
        margin-bottom: 1.5rem;
        background-color: var(--color-ochre);
        color: white;
        font-weight: 600;
        border-left: 4px solid var(--color-burnt-sienna);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    // Remove previous message if exists
    const existingMessage = document.querySelector('.search-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const blogContent = document.querySelector('.blog-content');
    blogContent.insertBefore(resultsMessage, blogContent.querySelector('.posts-header').nextElementSibling);
    
    // Scroll to results
    blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    return false;
}

function clearSearch() {
    // Show all posts
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach(post => {
        post.style.display = 'block';
    });
    
    // Remove message
    const message = document.querySelector('.search-results-message');
    if (message) {
        message.remove();
    }
    
    // Clear input
    document.getElementById('searchInput').value = '';
    showNotification('Búsqueda borrada', 'info');
}

// ========================================
// Subscribe Functionality
// ========================================

function handleSubscribe(event) {
    event.preventDefault();
    const emailInput = document.getElementById('subscribeEmail');
    const email = emailInput.value.trim();
    
    if (email === '') {
        showNotification('Por favor, ingresa tu email', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return false;
    }
    
    // Simulate subscription (in real app, this would be an API call)
    showNotification(`¡Gracias por suscribirte! Te enviaremos actualizaciones a ${email}`, 'success');
    emailInput.value = '';
    
    // Here you could add code to store the email or send to a server
    console.log('Nuevo suscriptor:', email);
    
    return false;
}

// ========================================
// Quick Contact Form Functionality
// ========================================

function handleQuickContact(event) {
    event.preventDefault();
    
    const form = event.target;
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    if (name === '' || email === '' || message === '') {
        showNotification('Por favor, completa todos los campos', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return false;
    }
    
    // Show success message
    showNotification('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.', 'success');
    
    // Clear form
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    
    console.log('Nuevo mensaje de contacto de:', name);
    
    return false;
}

// ========================================
// Comment Functionality
// ========================================

function handleComment(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('commentName');
    const emailInput = document.getElementById('commentEmail');
    const textInput = document.getElementById('commentText');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const text = textInput.value.trim();
    
    if (name === '' || email === '' || text === '') {
        showNotification('Por favor, completa todos los campos', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return false;
    }
    
    // Create new comment element
    const commentsList = document.getElementById('commentsList');
    const newComment = document.createElement('div');
    newComment.className = 'comment-item';
    newComment.style.animation = 'slideInUp 0.5s ease';
    
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Escape HTML to prevent XSS
    const escapedName = escapeHtml(name);
    const escapedText = escapeHtml(text);
    
    newComment.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapedName}</span>
            <span class="comment-date">${currentDate}</span>
        </div>
        <p class="comment-text">${escapedText}</p>
    `;
    
    // Insert at the beginning of comments list
    commentsList.insertBefore(newComment, commentsList.firstChild);
    
    // Clear form
    nameInput.value = '';
    emailInput.value = '';
    textInput.value = '';
    
    // Show success message
    showNotification('¡Comentario publicado con éxito!', 'success');
    
    // Scroll to new comment
    newComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Here you could add code to store the comment or send to a server
    console.log('Nuevo comentario de:', name);
    
    return false;
}

// ========================================
// Security: Escape HTML
// ========================================

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? 'var(--color-ochre)' : 
                    type === 'error' ? 'var(--color-burnt-sienna)' : 
                    'var(--color-warm-gray)';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${bgColor};
        color: white;
        font-weight: 600;
        z-index: 1000;
        border-left: 4px solid var(--color-dark-charcoal);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// ========================================
// Navigation Active State
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Archive Links functionality (now actually filters posts)
    const archiveLinks = document.querySelectorAll('.archive-link');
    archiveLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const month = this.querySelector('.archive-month').textContent;
            filterPostsByMonth(month);
        });
    });
    
});

// ========================================
// Post modal & filtering utilities
// ========================================

// show modal with supplied HTML content
function openModal(contentHtml) {
    const modal = document.getElementById('postModal');
    const body = modal.querySelector('.modal-body');
    body.innerHTML = contentHtml;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    const modal = document.getElementById('postModal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modal.querySelector('.modal-body').innerHTML = '';
}

function filterPostsByMonth(month) {
    const posts = document.querySelectorAll('.blog-post');
    const monthName = month.split(' ')[0];
    let count = 0;

    posts.forEach(post => {
        if (post.classList.contains('related-post')) {
            // ignore hidden related templates
            return;
        }
        const dateText = post.querySelector('.post-date').textContent;
        if (dateText.includes(monthName)) {
            post.style.display = 'block';
            count++;
        } else {
            post.style.display = 'none';
        }
    });

    showNotification(`Mostrando ${count} artículo(s) de ${month}`, 'info');
}


// close modal when clicking overlay or close button
document.addEventListener('click', function(e) {
    if (e.target.matches('.modal-close') || e.target.matches('.modal-overlay')) {
        closeModal();
    }
});

// add event listeners to read-more links after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const post = this.closest('.blog-post');
            const title = post.querySelector('.post-title').textContent;
            const content = post.querySelector('.post-content').innerHTML;
            const imageContainer = post.querySelector('.post-featured-image');
            let imgHtml = '';
            if (imageContainer) {
                // clone inner HTML so that styles apply inside modal as well
                imgHtml = imageContainer.innerHTML;
            }
            // you could store a longer version in a data attribute or fetch another page
            openModal(`<h2>${escapeHtml(title)}</h2>${imgHtml}${content}`);
        });
    });

    // add click handlers to artwork cards to show enlarged image
    document.querySelectorAll('.obra-item').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent || '';
            const imageContainer = this.querySelector('.obra-image');
            let imgHtml = '';
            if (imageContainer) {
                imgHtml = imageContainer.innerHTML;
            }
            openModal(`<h2>${escapeHtml(title)}</h2>${imgHtml}`);
        }); // end obra-item click
    }); // end obra-item foreach
}); // end DOMContentLoaded listener

// ========================================
// CSS Animations
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
