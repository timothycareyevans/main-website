/* ============================================================
   WEGEMS STUDIO — main.js
   Global JavaScript functionality for the TCE Co. site.
   ============================================================ */

'use strict';

/* --- Mobile Navigation Toggle --- */

/**
 * Toggles .is-open on .nav_component when hamburger is clicked.
 * Updates aria-expanded and aria-hidden for accessibility.
 * Closes menu when a dropdown link is clicked.
 * Closes menu when clicking outside the navbar.
 * Resets menu state when window is resized above 991px.
 * Hamburger-to-X animation is handled entirely by CSS.
 */
const nav = document.querySelector('[data-nav]');
const menu = document.querySelector('[data-menu]');
const toggle = document.querySelector('[data-toggle]');

if (nav) {
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  });
}

if (toggle && menu) {
  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 991) {
      menu.classList.remove('open');
    }
  });
}

/* ============================================
   FAQ ACCORDION
   ============================================ */

document.querySelectorAll('.faq_header').forEach(function (header) {
  header.addEventListener('click', function () {
    const item = this.closest('.faq_item');
    const isOpen = item.classList.contains('is-open');

    // Close all items
    document.querySelectorAll('.faq_item').forEach(function (el) {
      el.classList.remove('is-open');
      el.querySelector('.faq_header').setAttribute('aria-expanded', 'false');
    });

    // If it was closed, open it
    if (!isOpen) {
      item.classList.add('is-open');
      this.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ============================================
   DYNAMIC COPYRIGHT YEAR
   ============================================ */

const yearEl = document.getElementById('footer-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ============================================
   BUTTON CLICK & BOOKING CONVERSION TRACKING
   ============================================ */

var buttonTracking = [
  {
    selector: '.nav_menu .btn-secondary',
    label: 'Nav - Book a Call',
    location: 'navigation',
  },
  {
    selector: '.hero_cta-group .btn-primary',
    label: 'Hero - Lets fix your website',
    location: 'hero',
  },
  {
    selector: '.ps-cta .btn-primary',
    label: 'Problem Section - Lets fix your website',
    location: 'problem_section',
  },
  {
    selector: '.redesigns_cta .btn-primary',
    label: 'Redesigns - Show me pricing',
    location: 'redesigns_section',
  },
  {
    selector: '.pricing_card:first-child .pricing_btn',
    label: 'Pricing - Start Your Sprint',
    location: 'pricing_homepage_sprint',
  },
  {
    selector: '.pricing_card:last-child .pricing_btn',
    label: 'Pricing - Lets Talk',
    location: 'pricing_full_redesign',
  },
];

buttonTracking.forEach(function (btn) {
  var el = document.querySelector(btn.selector);
  if (el) {
    el.addEventListener('click', function () {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cta_click',
        cta_label: btn.label,
        cta_location: btn.location,
      });
    });
  }
});

// Track Cal.com successful bookings
window.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'cal:bookingSuccessful') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'booking_completed',
      booking_source: 'cal.com',
    });
  }
});

/* ============================================
   LAZY LOAD CAL.COM EMBED
   ============================================ */

var calLoaded = false;
var calObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !calLoaded) {
        calLoaded = true;
        calObserver.disconnect();

        (function (C, A, L) {
          let p = function (a, ar) {
            a.q.push(ar);
          };
          let d = C.document;
          C.Cal =
            C.Cal ||
            function () {
              let cal = C.Cal;
              let ar = arguments;
              if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                d.head.appendChild(d.createElement('script')).src = A;
                cal.loaded = true;
              }
              if (ar[0] === L) {
                const api = function () {
                  p(api, arguments);
                };
                const namespace = ar[1];
                api.q = api.q || [];
                if (typeof namespace === 'string') {
                  cal.ns[namespace] = cal.ns[namespace] || api;
                  p(cal.ns[namespace], ar);
                  p(cal, ['initNamespace', namespace]);
                } else p(cal, ar);
                return;
              }
              p(cal, ar);
            };
        })(window, 'https://app.cal.com/embed/embed.js', 'init');

        Cal('init', '30min', { origin: 'https://app.cal.com' });
        Cal.ns['30min']('inline', {
          elementOrSelector: '#my-cal-inline-30min',
          config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
          calLink: 'wegems/30min',
        });
        Cal.ns['30min']('ui', {
          cssVarsPerTheme: {
            light: { 'cal-brand': '#2A0E32' },
            dark: { 'cal-brand': '#F8F6F5' },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      }
    });
  },
  { rootMargin: '200px' },
);

var calTarget = document.getElementById('my-cal-inline-30min');
if (calTarget) {
  calObserver.observe(calTarget);
}
