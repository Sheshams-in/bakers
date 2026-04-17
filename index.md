---
title: Sheshams Bakers - Premium Vegetarian Cakes & Desserts
layout: base.njk
description: Premium artisan cakes, cupcakes, and specialty desserts. 100% Vegetarian • Entirely Eggless • Handcrafted Daily
permalink: /
---

<!-- ============================================
     HERO SECTION WITH CAROUSEL
     ============================================ -->
<section class="hero_area">
  <div class="bg-box">
    <img src="{{ '/assets/images/hero-bg.jpg' | url }}" alt="Hero Background">
  </div>

  <section class="slider_section">
    <div id="customCarousel1" class="carousel slide" data-ride="carousel" data-interval="5000">
      <ol class="carousel-indicators">
        <li data-target="#customCarousel1" data-slide-to="0" class="active"></li>
        <li data-target="#customCarousel1" data-slide-to="1"></li>
        <li data-target="#customCarousel1" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">

        <!-- Slide 1 -->
        <div class="carousel-item active">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-8 text-center">
                <div class="detail-box">
                  <h1><span class="hero-brand-shesh">Shesh</span><span class="hero-brand-ams">Am's</span><span class="hero-brand-bakers">Bakers</span></h1>
                  <p>🌱 100% Vegetarian &nbsp;•&nbsp; ✨ Entirely Eggless &nbsp;•&nbsp; 🎂 Handcrafted Daily</p>
                  <p>We specialize in creating beautiful, delicious, and entirely custom cakes for every celebration — from intimate gatherings to grand celebrations.</p>
                  <div class="btn-box">
                    <a href="https://wa.me/14438582646" target="_blank" class="btn btn-primary" style="margin: 0 8px;">🎂 Order Now on WhatsApp</a>
                    <a href="{{ '/menu/' | url }}" class="btn btn-secondary" style="margin: 0 8px;">📸 View Our Menu</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel-item">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-8 text-center">
                <div class="detail-box">
                  <h1>Custom Celebration Cakes</h1>
                  <p>🎂 Birthdays &nbsp;•&nbsp; 💍 Weddings &nbsp;•&nbsp; 🎉 Anniversaries</p>
                  <p>Every cake is a one-of-a-kind creation tailored to your vision. From elegant tiers to playful designs — we bring your dream cake to life.</p>
                  <div class="btn-box">
                    <a href="https://wa.me/14438582646" target="_blank" class="btn btn-primary" style="margin: 0 8px;">💬 Chat with Us</a>
                    <a href="{{ '/gallery/' | url }}" class="btn btn-secondary" style="margin: 0 8px;">🖼️ See Gallery</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 3 -->
        <div class="carousel-item">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-8 text-center">
                <div class="detail-box">
                  <h1>Gifting Made Sweet</h1>
                  <p>🍰 Cupcakes &nbsp;•&nbsp; 🍮 Desserts &nbsp;•&nbsp; 🎁 Gift Boxes</p>
                  <p>Surprise someone special with a box of handcrafted cupcakes, mousse cups, or a custom gift cake — delivered with love.</p>
                  <div class="btn-box">
                    <a href="https://wa.me/14438582646" target="_blank" class="btn btn-primary" style="margin: 0 8px;">🎁 Order a Gift</a>
                    <a href="{{ '/menu/' | url }}" class="btn btn-secondary" style="margin: 0 8px;">📋 Browse Menu</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</section>

<!-- Carousel Auto-Slide Script with Touch/Swipe Support -->
<script>
  $(document).ready(function() {
    const carousel = $('#customCarousel1');
    let touchStartX = 0;
    let touchEndX = 0;

    // Initialize carousel with auto-slide
    carousel.carousel({
      interval: 5000
    });

    // Touch event handlers for swipe detection
    carousel.on('touchstart', function(event) {
      touchStartX = event.touches[0].clientX;
    });

    carousel.on('touchend', function(event) {
      touchEndX = event.changedTouches[0].clientX;
      handleSwipe();
    });

    // Detect swipe direction and move carousel
    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance to trigger swipe
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - go to next slide
          carousel.carousel('next');
        } else {
          // Swiped right - go to previous slide
          carousel.carousel('prev');
        }
      }
    }
  });
</script>

<!-- ============================================
     WHY CHOOSE SHESHAMS BAKERS
     ============================================ -->
<!-- <section class="why_choose_section" style="display: flex; align-items: stretch;">
  
  <div style="flex: 1; background: linear-gradient(135deg, #6bc34a 0%, #558b2f 100%); padding: 40px 30px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; color: white;">
    <div style="font-size: 2.5rem; margin-bottom: 15px;">🌱</div>
    <h3 style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; margin: 0 0 10px 0; font-weight: 700;">100% Vegetarian</h3>
    <p style="font-family: 'Open Sans', sans-serif; font-size: 0.95rem; line-height: 1.6; margin: 0;">Pure vegetarian ingredients. No compromises. Perfect for families who value vegetarian choices without sacrificing taste or quality.</p>
  </div>

  
  <div style="flex: 1; background: linear-gradient(135deg, #333333 0%, #1a1a1a 100%); padding: 40px 30px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; color: white;">
    <div style="font-size: 2.5rem; margin-bottom: 15px;">✨</div>
    <h3 style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; margin: 0 0 10px 0; font-weight: 700;">Entirely Eggless</h3>
    <p style="font-family: 'Open Sans', sans-serif; font-size: 0.95rem; line-height: 1.6; margin: 0;">Delicious without eggs. Premium plant-based and dairy alternatives deliver perfect texture, incredible taste, and zero compromise.</p>
  </div>

  
  <div style="flex: 1; background: linear-gradient(135deg, #ff6f00 0%, #e65100 100%); padding: 40px 30px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; color: white;">
    <div style="font-size: 2.5rem; margin-bottom: 15px;">👨‍🍳</div>
    <h3 style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; margin: 0 0 10px 0; font-weight: 700;">Expert Craftsmanship</h3>
    <p style="font-family: 'Open Sans', sans-serif; font-size: 0.95rem; line-height: 1.6; margin: 0;">Passionate artisans create bespoke designs. Each cake is a unique masterpiece tailored to make your celebration truly memorable.</p>
  </div>
</section> -->





<!-- ============================================
     OUR SPECIALITIES
     ============================================ -->
<section style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-light) 100%); padding: 60px 0;">
  <div class="container">
    <div class="heading_container heading_center">
      <h2 style="font-family: 'Dancing Script', cursive; color: #222831; font-size: 2.5rem; margin-bottom: 10px;">Our Specialities</h2>
      <p style="font-size: 1.1rem; color: #222831; margin-top: 0.5rem;">Premium Creations for Every Occasion & Celebration</p>
    </div>

    <div class="row">
      <!-- Speciality 1: Custom Cakes -->
      <div class="col-sm-6 col-lg-4">
        <div class="offer_card">
          <div class="offer_badge" style="background: var(--accent-pink);">🎂</div>
          <div class="offer_tag">Celebrations</div>
          <h4>Custom Cakes</h4>
          <p>Personalized cake designs for birthdays, anniversaries, weddings, corporate events. We realize your vision.</p>
          <a href="{{ '/menu/?filter=Birthday' | url }}" class="btn btn-primary">View Examples</a>
        </div>
      </div>

      <!-- Speciality 2: Premium Cupcakes -->
      <div class="col-sm-6 col-lg-4">
        <div class="offer_card">
          <div class="offer_badge" style="background: var(--accent-pink);">🧁</div>
          <div class="offer_tag">Gifting</div>
          <h4>Premium Cupcakes</h4>
          <p>Gourmet cupcakes in seasonal flavors. Perfect for events, parties, gifts, and corporate gifting.</p>
          <a href="{{ '/menu/?filter=Cupcakes' | url }}" class="btn btn-primary">View Examples</a>
        </div>
      </div>

      <!-- Speciality 3: Artistic Designs -->
      <div class="col-sm-6 col-lg-4">
        <div class="offer_card">
          <div class="offer_badge" style="background: var(--accent-pink);">✨</div>
          <div class="offer_tag">Premium Art</div>
          <h4>Artistic Designs</h4>
          <p>Hand-painted fondant art, whipped cream masterpieces, and butter cream sculptures. Edible art.</p>
          <a href="{{ '/menu/?filter=Fondant' | url }}" class="btn btn-primary">View Examples</a>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 3rem;">
      <a href="{{ '/menu/' | url }}" class="btn btn-primary">View Full Menu</a>
    </div>
  </div>
</section>

<!-- CORE VALUES SECTION -->
<section class="food_section layout_padding" style="background: white;">
  <div class="container">
    <div class="heading_container heading_center" style="margin-bottom: 3rem;">
      <h2>Our Core Values</h2>
      <p style="font-size: 1.1rem; color: #999; margin-top: 0.5rem;">The principles that guide every cake we create</p>
    </div>
    <div class="row">
      <!-- Value 1: Vegetarian -->
      <div class="" style="margin-bottom: 2rem;">
        <div class="box" style="background: linear-gradient(135deg, rgba(100, 200, 100, 0.1) 0%, rgba(124, 252, 0, 0.1) 100%); border: 1px solid rgba(100, 200, 100, 0.2); border-radius: 12px; padding: 30px; text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">🌱</div>
          <h5 style="font-size: 1.2rem; margin-bottom: 1rem; color: #222831;">100% Vegetarian</h5>
          <p style="color: #666; line-height: 1.6;">Every cake we create is made with 100% vegetarian ingredients. Pure, ethical, guilt-free indulgence for everyone.</p>
        </div>
      </div>
      <!-- Value 2: Eggless -->
      <div class="" style="margin-bottom: 2rem;">
        <div class="box" style="background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%); border: 1px solid rgba(255, 215, 0, 0.2); border-radius: 12px; padding: 30px; text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">✨</div>
          <h5 style="font-size: 1.2rem; margin-bottom: 1rem; color: #222831;">Entirely Eggless</h5>
          <p style="color: #666; line-height: 1.6;">We use innovative baking techniques to create moist, delicious cakes without any eggs. Perfect for all dietary needs.</p>
        </div>
      </div>
      <!-- Value 3: Handcrafted -->
      <div class="" style="margin-bottom: 2rem;">
        <div class="box" style="background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(255, 105, 180, 0.1) 100%); border: 1px solid rgba(255, 105, 180, 0.2); border-radius: 12px; padding: 30px; text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">🎨</div>
          <h5 style="font-size: 1.2rem; margin-bottom: 1rem; color: #222831;">Handcrafted Daily</h5>
          <p style="color: #666; line-height: 1.6;">Every cake is handcrafted fresh daily with meticulous attention to detail and artistic flair. No compromises.</p>
        </div>
      </div>
      <!-- Value 4: Quality -->
      <div class="" style="margin-bottom: 2rem;">
        <div class="box" style="background: linear-gradient(135deg, rgba(255, 192, 203, 0.1) 0%, rgba(219, 112, 147, 0.1) 100%); border: 1px solid rgba(219, 112, 147, 0.2); border-radius: 12px; padding: 30px; text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">⭐</div>
          <h5 style="font-size: 1.2rem; margin-bottom: 1rem; color: #222831;">Premium Quality</h5>
          <p style="color: #666; line-height: 1.6;">Only the finest ingredients sourced carefully. We never compromise on taste, texture, or presentation.</p>
        </div>
      </div>
      <!-- Value 5: Customization -->
      <div class="" style="margin-bottom: 2rem;">
        <div class="box" style="background: linear-gradient(135deg, rgba(255, 218, 185, 0.1) 0%, rgba(255, 160, 122, 0.1) 100%); border: 1px solid rgba(255, 160, 122, 0.2); border-radius: 12px; padding: 30px; text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">🎯</div>
          <h5 style="font-size: 1.2rem; margin-bottom: 1rem; color: #222831;">Fully Customizable</h5>
          <p style="color: #666; line-height: 1.6;">Your cake, your rules. Customize flavors, designs, sizes, and dietary requirements. We make it happen.</p>
        </div>
      </div>
      <!-- Value 6: Customer Care -->
      <div class="" style="margin-bottom: 2rem;">
        <div class="box" style="background: linear-gradient(135deg, rgba(200, 220, 255, 0.1) 0%, rgba(173, 216, 230, 0.1) 100%); border: 1px solid rgba(173, 216, 230, 0.2); border-radius: 12px; padding: 30px; text-align: center;">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">❤️</div>
          <h5 style="font-size: 1.2rem; margin-bottom: 1rem; color: #222831;">Customer First</h5>
          <p style="color: #666; line-height: 1.6;">Your satisfaction is our priority. Responsive support, transparent pricing, and zero hidden charges.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================
     HOW TO ORDER YOUR CAKE - 3 STEPS (NO DELIVERY)
     ============================================ -->
<style>
  @media (max-width: 768px) {
    .how_to_order_section {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
    }
  }
  
  @media (min-width: 769px) {
    .how_to_order_section {
      display: flex !important;
      flex-direction: row !important;
      align-items: stretch !important;
    }
  }
</style>

<section class="food_section layout_padding">
  <div class="container">
    <div class="heading_container heading_center">
      <h2>How to Order</h2>
      <p style="font-size: 1.1rem; color: #999; margin-top: 0.5rem;">Simple, seamless steps from idea to celebration</p>
    </div>
  </div>
</section>

<section class="how_to_order_section" style="display: flex; align-items: stretch;">
  <!-- Step 1: Message Us - Green -->
  <div style="flex: 1; background: linear-gradient(135deg, var(--section-green) 0%, var(--section-green-dark) 100%); padding: 40px 30px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; color: white;">
    <div style="font-size: 2.5rem; margin-bottom: 15px;">💬</div>
    <h3 style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; margin: 0 0 10px 0; font-weight: 700;">Message Us</h3>
    <p style="font-family: 'Open Sans', sans-serif; font-size: 0.95rem; line-height: 1.6; margin: 0;">Reach out on WhatsApp with your cake ideas, preferences, budget, and occasion date.</p>
  </div>

  <!-- Step 2: Consultation & Quote - Dark -->
  <div style="flex: 1; background: linear-gradient(135deg, var(--section-dark) 0%, var(--section-dark-darker) 100%); padding: 40px 30px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; color: white;">
    <div style="font-size: 2.5rem; margin-bottom: 15px;">📋</div>
    <h3 style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; margin: 0 0 10px 0; font-weight: 700;">Consultation & Quote</h3>
    <p style="font-family: 'Open Sans', sans-serif; font-size: 0.95rem; line-height: 1.6; margin: 0;">We discuss design, flavors, ingredients, dietary needs, and provide you with pricing.</p>
  </div>

  <!-- Step 3: Creation - Orange -->
  <div style="flex: 1; background: linear-gradient(135deg, var(--section-orange) 0%, var(--section-orange-dark) 100%); padding: 40px 30px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; color: white;">
    <div style="font-size: 2.5rem; margin-bottom: 15px;">🎨</div>
    <h3 style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; margin: 0 0 10px 0; font-weight: 700;">Creation</h3>
    <p style="font-family: 'Open Sans', sans-serif; font-size: 0.95rem; line-height: 1.6; margin: 0;">Our expert bakers craft your cake with premium ingredients and artistic precision.</p>
  </div>
</section>

<section class="food_section layout_padding">
  <div class="container">
    <div style="text-align: center;">
      <a href="https://wa.me/14438582646" target="_blank" class="btn btn-primary">💬 Start Your Order</a>
    </div>
  </div>
</section>


<!-- ============================================
     FINAL CTA
     ============================================ -->
<section class="food_section layout_padding" style="background-color: var(--secondary-dark); color: white; text-align: center;">
  <div class="container">
    <h2 style="color: white; margin-bottom: 1rem;">Ready to Order Your Masterpiece?</h2>
    <p style="font-size: 1.1rem; margin-bottom: 2rem; color: #ccc;">
      Connect with us on WhatsApp for custom cake design, detailed pricing, and fast delivery
    </p>
    <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
      <a href="https://wa.me/14438582646" target="_blank" class="btn btn-primary">💬 Order via WhatsApp</a>
      <a href="tel:+14438582646" class="btn btn-secondary">📞 Call Us</a>
    </div>
    <p style="margin-top: 2rem; color: #ccc;">
      ✅ Available for custom orders | 🎨 Bespoke designs | 🚚 Quick delivery | 🌱 100% Vegetarian
    </p>
  </div>
</section>

