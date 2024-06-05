import { Router } from './Router';

function App() {
    const $root = document.getElementById('root');
    if (!$root) throw new Error('No root element found');
    Router();
}

document.addEventListener('DOMContentLoaded', App);
