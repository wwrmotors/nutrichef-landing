// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  a.style.display = 'none';
  q.addEventListener('click', () => {
    const isOpen = a.style.display === 'block';
    document.querySelectorAll('.faq-a').forEach(x => x.style.display = 'none');
    document.querySelectorAll('.faq-q').forEach(x => x.style.color = '');
    if (!isOpen) {
      a.style.display = 'block';
      q.style.color = '#84cc16';
    }
  });
});

// Track CTA clicks
document.querySelectorAll('a[href*="hotmart"]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click_comprar', { event_category: 'CTA' });
    }
  });
});
