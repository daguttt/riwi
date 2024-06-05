import { navigateTo } from '../../../Router';

export function NotFoundPage() {
    const $root = document.getElementById('root');
    $root.innerHTML = /*html*/ `
        <h1>Ruta no encontrada</h1>
        <button id="back-btn">Volver</button>
    `;

    const $backButton = document.getElementById('back-btn');
    $backButton.addEventListener('click', () => {
        navigateTo('/dashboard');
    });
}
