const shortcutNav = document.querySelector('.shortcut-nav');
const navToggle = document.querySelector('.nav-toggle');
const shortcutMenu = document.querySelector('#shortcut-menu');

if (shortcutNav && navToggle && shortcutMenu) {
    function setMenuOpen(isOpen) {
        shortcutNav.classList.toggle('is-collapsed', !isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.textContent = isOpen ? '▲' : '▼';
    }

    navToggle.addEventListener('click', function() {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        setMenuOpen(!isOpen);
    });

    setMenuOpen(true);
}
