document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const modal = document.getElementById('newsModal');
  const closeButton = document.querySelector('.close-button');
  
  // Debugging
  console.log('Modal:', modal);
  console.log('Close Button:', closeButton);

  // Close modal function
  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Open modal function
  const openModal = (title, date, content) => {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDate').textContent = date;
    document.getElementById('modalContent').innerHTML = content.replace(/\n/g, '<br>');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable scrolling
  };

  // Event listeners for read more buttons
  document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.inner');
      openModal(
        card.querySelector('.title h3 a').textContent,
        card.querySelector('.date span').textContent,
        this.getAttribute('data-content')
      );
    });
  });

  // Close button event
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  } else {
    console.error('Close button not found!');
  }

  // Close when clicking outside modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});