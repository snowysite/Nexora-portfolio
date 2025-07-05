<script>
  // Typing Effect
  const phrases = [
    "Hire us for the next aura of innovation.",
    "We build future-ready experiences.",
    "Your vision, our execution."
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  const typedText = document.getElementById("typed-text");
  const cursor = document.querySelector(".cursor");

  function type() {
    if (letterIndex < phrases[phraseIndex].length) {
      typedText.textContent += phrases[phraseIndex].charAt(letterIndex);
      letterIndex++;
      setTimeout(type, 50);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (letterIndex > 0) {
      typedText.textContent = phrases[phraseIndex].substring(0, letterIndex - 1);
      letterIndex--;
      setTimeout(erase, 30);
    } else {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Start typing
    setTimeout(type, 1000);

    // Animate skill bars when in view
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.width;
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    skillFills.forEach(bar => skillObserver.observe(bar));

    // Animate fade-in elements
    const fadeEls = document.querySelectorAll(".fade-in");
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => fadeObserver.observe(el));
  });
</script>
