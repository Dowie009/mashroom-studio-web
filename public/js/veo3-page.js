(function () {
  const scrollVars = () => {
    const pages = document.querySelectorAll('.veo3-page');
    if (!pages.length) return;

    let ticking = false;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      pages.forEach((page) => {
        page.style.setProperty('--veo-scroll', progress.toFixed(4));
        page.style.setProperty('--veo-scroll-px', `${Math.round(window.scrollY)}px`);
      });
      ticking = false;
    };

    const request = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  };

  const reveal = () => {
    const nodes = document.querySelectorAll('.veo3-reveal');
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    nodes.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
      observer.observe(node);
    });
  };

  const gsapMotion = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.veo3-hero-media img').forEach((image) => {
      gsap.to(image, {
        yPercent: 10,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: image.closest('.veo3-hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    gsap.utils.toArray('.veo3-float').forEach((node, index) => {
      gsap.to(node, {
        y: index % 2 === 0 ? -38 : 30,
        rotate: index % 2 === 0 ? -1.4 : 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });

    gsap.utils.toArray('.veo3-card-image img').forEach((image, index) => {
      gsap.fromTo(image,
        { yPercent: index % 2 === 0 ? -7 : -4, scale: 1.08 },
        {
          yPercent: index % 2 === 0 ? 7 : 5,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: image.closest('.veo3-card'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1
          }
        }
      );
    });

    gsap.utils.toArray('.veo3-card, .veo3-price-card, .veo3-step, .veo3-feature').forEach((node, index) => {
      gsap.fromTo(node,
        { rotateX: index % 2 === 0 ? 3 : -2, y: 42 },
        {
          rotateX: 0,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 92%',
            end: 'top 62%',
            scrub: 0.7
          }
        }
      );
    });

    gsap.utils.toArray('.veo3-section-head h2, .veo3-cta h2').forEach((heading) => {
      gsap.fromTo(heading,
        { clipPath: 'inset(0 100% 0 0)', x: -18 },
        {
          clipPath: 'inset(0 0% 0 0)',
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 84%'
          }
        }
      );
    });
  };

  const ready = () => {
    scrollVars();
    reveal();
    gsapMotion();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
