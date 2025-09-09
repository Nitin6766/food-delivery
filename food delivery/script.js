(function () {
  'use strict';

  // Run only after the DOM is ready (extra safety even if script is at bottom)
  document.addEventListener('DOMContentLoaded', () => {
      // ---------- helpers ----------
      const $ = (sel, root = document) => root.querySelector(sel);
      const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

      // Support BOTH structures:
      const headerEl = $('.navbar') || $('header');
      const menuToggle = $('.hamburger') || $('.menu-toggle');
      const navLinks = $('.nav-links');
      const menuItems = $$('.menu-item');

      // ---------- mobile menu toggle ----------
      if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          // toggle icon if it's the text-based button
          try {
            if (menuToggle.textContent) {
              menuToggle.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
            }
          } catch (_) { }
        });
      }

      // ---------- cart badge ----------
      const cartIcon = document.createElement('button');
      cartIcon.type = 'button';
      cartIcon.className = 'cart-badge';
      cartIcon.innerHTML = '🛒 <span id="cart-count">0</span>';

      if (headerEl) {
        if (!getComputedStyle(headerEl).position || getComputedStyle(headerEl).position === 'static') {
          headerEl.style.position = 'relative'; // ensure absolute badge positions correctly
        }
        headerEl.appendChild(cartIcon);
      } else {
        // ultra-fallback: stick it to the top-right of the page
        cartIcon.style.position = 'fixed';
        cartIcon.style.top = '12px';
        cartIcon.style.right = '12px';
        document.body.appendChild(cartIcon);
      }

      const cart = [];

      function updateCartBadge() {
        const badge = $('#cart-count');
        if (badge) badge.textContent = String(cart.length);
      }

      // ---------- add-to-cart buttons ----------
      menuItems.forEach((item) => {
        // Reuse existing button if you later add one in HTML; otherwise create it
        let btn = item.querySelector('.add-to-cart');
        if (!btn) {
          btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'btn add-to-cart';
          btn.textContent = 'Add to Cart';
          item.appendChild(btn);
        }

        btn.addEventListener('click', () => {
          const nameEl = item.querySelector('h3');
          const priceEl = item.querySelector('p');

          const name = nameEl ? nameEl.textContent.trim() : 'Item';
          const price = priceEl
            ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0
            : 0;

          cart.push({ name, price });
          updateCartBadge();
          alert($, { name }, added, to, cart!);
        });
      });

      // ---------- smooth scrolling ----------
      $$('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const href = (anchor.getAttribute('href') || '').trim();
          if (!href || href === '#') return;

          const target = $(href);
          if (!target) return;

          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });

          // close mobile menu after navigation (if open)
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle && 'textContent' in menuToggle) {
              menuToggle.textContent = '☰';
            }
          }
        }, { passive: false });
      });

      // ---------- simple checkout ----------
      cartIcon.addEventListener('click', () => {
        if (cart.length === 0) {
          alert('Your cart is empty!');
          return;
        }
        const lines = cart.map(i => , $, { i,: .name } - $$, { i,: .price.toFixed(2) }).join('\n');
        const total = cart.reduce((s, i) => s + i.price, 0).toFixed(2);
        alert(Your, Cart, n, n$, { lines }, n, nTotal, $$, { total });
      });

      // initialize badge
      updateCartBadge();
    });
})();