(function () {
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
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });
  };

  const ready = () => {
    reveal();
    gsapMotion();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
