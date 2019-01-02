const handleMenu = () => {
  const menu = document.querySelector('.menu');
  const links = document.querySelectorAll('.menu a');
  const hamburger = document.querySelector('me-hamburger');

  hamburger.addEventListener('click', function() {
    this.transformIcon();
    menu.classList.toggle('menu--opened');
  });

  Array.from(links).forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.transformIcon();
      menu.classList.remove('menu--opened');
    });
  });
}

window.onload = handleMenu();
