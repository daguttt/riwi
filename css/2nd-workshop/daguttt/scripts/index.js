(function initMenu() {
    const menuToggleSelector = '.menu-toggle';
    const menuSelector = '.primary-navigation';
    $menuToggle = document.querySelector(menuToggleSelector);

    document.addEventListener('click', (e) => {
        const isMenuOpened =
            $menuToggle.getAttribute('aria-expanded') === 'true';
        const isMenuToggleNotClicked = !(
            e.target.matches(menuToggleSelector) ||
            e.target.matches(`${menuToggleSelector} *`)
        );
        const isMenuNotClicked = !(
            e.target.matches(menuSelector) ||
            e.target.matches(`${menuSelector} *`)
        );
        if (isMenuToggleNotClicked && isMenuNotClicked && isMenuOpened)
            return closeMenu();

        if (isMenuToggleNotClicked) return;

        isMenuOpened ? closeMenu() : openMenu();
    });

    function openMenu() {
        $menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        $menuToggle.setAttribute('aria-expanded', 'false');
    }
})();
