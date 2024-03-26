(function initMenu() {
    $menuToggle = document.querySelector('.menu-toggle');

    $menuToggle.addEventListener('click', () => {
        const isMenuOpened =
            $menuToggle.getAttribute('aria-expanded') === 'true';
        isMenuOpened ? closeMenu() : openMenu();
    });

    function openMenu() {
        $menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        $menuToggle.setAttribute('aria-expanded', 'false');
    }
})();
