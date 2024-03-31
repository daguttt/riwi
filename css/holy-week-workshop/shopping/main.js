// -*******************************************************************************-
//  BASIC FORM

// 1. Seleccionar el botón y el menu
// const $menuButton = document.querySelector('.menu-toggle');
// const $menu = document.getElementById('primary-navigation');

// console.log({
//     $menu,
//     $menuButton,
// });

// 2. Añadir el evento de click al boton
// $menuButton.addEventListener('click', () => {
//   // 3. Cambiar el estilo que permite mostrar o ocultar el menu
//   $menu.classList.toggle('opened');
// });

// -*******************************************************************************-

// PROPER FORM
const $menuButton = document.querySelector('.menu-toggle');
const $menu = document.getElementById('primary-navigation');
const ARIA_EXPANDED = 'aria-expanded';

$menuButton.addEventListener('click', () => {
    // Detectar el estado del menu
    const isMenuOpened = $menuButton.getAttribute(ARIA_EXPANDED) === 'true'; // -> 'true' 'false'
    isMenuOpened ? closeMenu() : openMenu();
});

function openMenu() {
    $menuButton.setAttribute(ARIA_EXPANDED, 'true');
}

function closeMenu() {
    $menuButton.setAttribute(ARIA_EXPANDED, 'false');
}
