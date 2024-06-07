import { logOut } from '../../helpers/log-out';
import styles from './private-layout.css';
import globalStyles from '../../styles/global.css';
import { navigateTo } from '../../Router';

export function PrivateLayout(contentHtml, contentLogic) {
    const $root = document.getElementById('root');
    $root.innerHTML = /*html*/ `
    <div class="${styles.layoutWrapper}">
      <header class="${globalStyles.wrapper}">
        <h1>Flight App</h1>
        <nav>
          <ul>
            <li><button data-link-url="/dashboard">Flights</button></li>
          </ul>
        </nav>
        <button id="log-out-btn">Cerrar sesión</button>
      </header>
      <div>${contentHtml}</div>
    </div>
  `;
    contentLogic();

    // Log out button functionality
    const $logOutButton = document.getElementById('log-out-btn');
    $logOutButton.addEventListener('click', () => {
        logOut();
    });

    // Links functionality
    document.addEventListener('click', (event) => {
        if (!event.target.matches('[data-link-url]')) return;
        const $link = event.target;
        const url = $link.dataset.linkUrl;

        const shouldNavigate = window.location.pathname !== url;
        if (shouldNavigate) navigateTo(url);
    });
}
