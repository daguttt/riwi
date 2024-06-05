import { Router } from './Router';
import './styles/global.css';

function App() {
    const $root = document.getElementById('root');
    if (!$root) throw new Error('No root element found');
    Router();
}

document.addEventListener('DOMContentLoaded', App);
