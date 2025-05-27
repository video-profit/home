document.addEventListener('DOMContentLoaded', function() {
  const faqBlocks = document.querySelectorAll('.new-block');
  
  faqBlocks.forEach(block => {
    const title = block.querySelector('.new-title');
    const description = block.querySelector('.new-description');
    
    title.addEventListener('click', () => {
      const isActive = title.classList.contains('active');
      
      // Close all other FAQs
      faqBlocks.forEach(otherBlock => {
        if (otherBlock !== block) {
          otherBlock.querySelector('.new-title').classList.remove('active');
          otherBlock.querySelector('.new-description').classList.remove('active');
        }
      });
      
      // Toggle current FAQ
      title.classList.toggle('active');
      description.classList.toggle('active');
      
      // Smooth scroll into view if opening
      if (!isActive) {
        block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
  
  // Cookie consent functionality
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptButton = document.getElementById('cookie-accept');
  const declineButton = document.getElementById('cookie-decline');
  const cookieLinks = document.querySelectorAll('.cookie-link');
  
  // Make cookie links open in new tab
  cookieLinks.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  
  // Check if user has already made a cookie choice
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  // Set cookie with expiration
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  }
  
  // Show cookie popup if no choice has been made
  if (!getCookie('cookieConsent')) {
    setTimeout(() => {
      cookiePopup.classList.add('show');
    }, 1000); // Show popup after 1 second
  }
  
  // Handle accept button click
  acceptButton.addEventListener('click', () => {
    setCookie('cookieConsent', 'accepted', 365); // Cookie valid for 1 year
    cookiePopup.classList.remove('show');
    // Here you can add code to enable all cookies and tracking
  });
  
  // Handle decline button click
  declineButton.addEventListener('click', () => {
    setCookie('cookieConsent', 'declined', 365); // Cookie valid for 1 year
    cookiePopup.classList.remove('show');
    // Here you can add code to disable non-essential cookies and tracking
  });
}); 