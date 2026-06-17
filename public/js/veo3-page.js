(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const decorate = () => {
    const cards = document.querySelectorAll('.veo3-card, .veo3-price-card, .veo3-step, .veo3-feature');
    cards.forEach((card, index) => {
      if ((index + 1) % 3 === 0) card.classList.add('veo3-puzzle');
    });

    document.querySelectorAll('.veo3-section-head').forEach((head, index) => {
      if ((index + 1) % 3 === 0) head.classList.add('veo3-puzzle-head');
    });
  };

  const scrollVars = () => {
    const pages = document.querySelectorAll('.veo3-page');
    if (!pages.length) return;

    let ticking = false;
    let lastProgress = -1;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const rounded = Math.round(progress * 1000) / 1000;

      if (rounded !== lastProgress) {
        pages.forEach((page) => {
          page.style.setProperty('--veo-scroll', rounded.toFixed(3));
        });
        lastProgress = rounded;
      }

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
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });

    nodes.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index % 5, 4) * 45}ms`;
      observer.observe(node);
    });
  };

  const gsapMotion = () => {
    if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({ ignoreMobileResize: true });

    gsap.utils.toArray('.veo3-hero-media img').forEach((image) => {
      gsap.to(image, {
        xPercent: 4,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: image.closest('.veo3-hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65
        }
      });
    });

    gsap.utils.toArray('.veo3-float').forEach((node, index) => {
      gsap.to(node, {
        x: index % 2 === 0 ? -34 : 28,
        rotate: index % 2 === 0 ? -1.2 : 1,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    });

    gsap.utils.toArray('.veo3-card-image img').forEach((image, index) => {
      gsap.fromTo(image,
        { xPercent: index % 2 === 0 ? -4 : 4, scale: 1.08 },
        {
          xPercent: index % 2 === 0 ? 4 : -4,
          scale: 1.13,
          ease: 'none',
          scrollTrigger: {
            trigger: image.closest('.veo3-card'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9
          }
        }
      );
    });

    gsap.utils.toArray('.veo3-puzzle').forEach((node, index) => {
      gsap.fromTo(node,
        {
          x: index % 2 === 0 ? -48 : 48,
          y: 12,
          rotate: index % 2 === 0 ? -1.8 : 1.8,
          clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)'
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
          duration: 0.95,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 86%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    gsap.utils.toArray('.veo3-card:not(.veo3-puzzle), .veo3-price-card:not(.veo3-puzzle), .veo3-step:not(.veo3-puzzle), .veo3-feature:not(.veo3-puzzle)').forEach((node, index) => {
      gsap.fromTo(node,
        { x: index % 2 === 0 ? -18 : 18, opacity: 0.88 },
        {
          x: 0,
          opacity: 1,
          duration: 0.62,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    gsap.utils.toArray('.veo3-section-head h2, .veo3-cta h2').forEach((heading, index) => {
      const puzzle = (index + 1) % 3 === 0;
      gsap.fromTo(heading,
        {
          clipPath: puzzle ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
          x: puzzle ? 28 : -18
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          x: 0,
          duration: puzzle ? 1.05 : 0.78,
          ease: puzzle ? 'elastic.out(1, 0.72)' : 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 84%'
          }
        }
      );
    });
  };

  const ready = () => {
    decorate();
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
