import { logOut } from '../helpers/log-out';

export function PrivateLayout(contentHtml, contentLogic) {
    const $root = document.getElementById('root');
    $root.innerHTML = /*html*/ `
    <header>
      <nav>
        <ul>
          <li><button>Flights</button></li>
          <li><button>No recuerdo este link (Corregir)</button></li>
        </ul>
      </nav>
      <button id="log-out-btn">Cerrar sesión</button>
    </header>
    <div>${contentHtml}</div>
  `;
    contentLogic();

    // Log out button functionality
    const $logOutButton = document.getElementById('log-out-btn');
    $logOutButton.addEventListener('click', () => {
        logOut();
    });
}
