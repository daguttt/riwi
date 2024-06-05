import { logOut } from '../../helpers/log-out';
import styles from './private-layout.css';
import globalStyles from '../../styles/global.css';

export function PrivateLayout(contentHtml, contentLogic) {
    const $root = document.getElementById('root');
    $root.innerHTML = /*html*/ `
    <div class="${styles.layoutWrapper}">
      <header class="${globalStyles.wrapper}">
        <h1>Flight App</h1>
        <nav>
          <ul>
            <li><button>Flights</button></li>
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
}
