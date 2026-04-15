---
title: Contact - Sheshams Bakers
layout: base.njk
description: Get in touch with Sheshams Bakers to inquire about custom cakes
permalink: /contact/
---

<div class="contact-page">
  <div class="contact-page__header">
    <h1>Get in Touch</h1>
    <p>Have questions about custom cakes or ready to place an order? Reach out to us!</p>
  </div>

  <div class="contact-page__container">
    <section class="contact-section">
      <h2>Contact Form</h2>
      <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        <div class="form-group">
          <label for="name" class="form-label">Name *</label>
          <input type="text" id="name" name="name" required class="form-input" placeholder="Your name">
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email *</label>
          <input type="email" id="email" name="email" required class="form-input" placeholder="your@email.com">
        </div>

        <div class="form-group">
          <label for="phone" class="form-label">Phone (optional)</label>
          <input type="tel" id="phone" name="phone" class="form-input" placeholder="+1 (555) 000-0000">
        </div>

        <div class="form-group">
          <label for="message" class="form-label">Message *</label>
          <textarea id="message" name="message" required class="form-textarea" placeholder="Tell us about your cake vision..." rows="6"></textarea>
        </div>

        <button type="submit" class="btn btn--primary">Send Inquiry</button>
      </form>
    </section>

    <section class="contact-section">
      <h2>Or Connect On Social</h2>
      
      <div class="cards-grid">
        <div class="card">
          <h3 class="card__title" style="font-size: 1.5rem; margin-bottom: 0.5rem;">💬 WhatsApp</h3>
          <p class="card__description">Quick messages and quick replies</p>
          <a href="https://wa.me/?text=Hi%20Sheshams%20Bakers!%20I%27m%20interested%20in%20ordering%20a%20custom%20cake" class="btn btn--secondary" target="_blank">Chat on WhatsApp</a>
        </div>

        <div class="card">
          <h3 class="card__title" style="font-size: 1.5rem; margin-bottom: 0.5rem;">📷 Instagram</h3>
          <p class="card__description">See our latest creations and DM us</p>
          <a href="https://www.instagram.com/sheshams_bakers/" class="btn btn--secondary" target="_blank">Follow & Message</a>
        </div>
      </div>
    </section>
  </div>
</div>
