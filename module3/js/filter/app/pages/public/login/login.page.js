import { navigateTo } from '../../../Router';
import { emailValidator } from '../../../helpers/email-validator';
import { getUsers } from '../../../services/get-users.service';

export function LoginPage() {
    const $root = document.getElementById('root');
    $root.innerHTML = /*html*/ `
        <main>
            <div class="form-wrapper">
                <h1>Ingreso</h1>
                <form id="login-form">
                    <div class="form-group">
                        <label for="email">Correo</label>
                        <input type="email" name="email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" name="password" id="password">
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
                <div>
                    <p>¿Aún no tienes cuenta?</p>
                    <button id="register-link">Registrate</button>
                </div>
            </div>
        </main>
    `;

    // Register link functionality
    const $registerLink = document.getElementById('register-link');
    $registerLink.addEventListener('click', () => {
        navigateTo('/register');
    });

    const $loginForm = document.getElementById('login-form');
    $loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const $formControls = event.target.elements;
        const $emailControl = $formControls['email'];
        const $passwordControl = $formControls['password'];

        // Validate user email
        const isValidEmail = emailValidator($emailControl.value);
        if (!isValidEmail) {
            alert('El email no tiene un formato válido.');
            return;
        }

        // Check account existence
        const users = await getUsers();
        const foundUser = users.find(
            (user) => user.email === $emailControl.value,
        );
        if (!foundUser) {
            alert(`No hay una cuenta asociada al email ${$emailControl.value}`);
            return;
        }

        // Check password
        const isPasswordCorrect = foundUser.password === $passwordControl.value;
        if (!isPasswordCorrect) {
            alert('Email o contraseña invalida. Intentalo de nuevo');
            return;
        }

        // Create token
        const token = window.crypto.randomUUID();
        window.localStorage.setItem('token', token);

        // Save user in localStorage without password
        const { password: _, ...user } = foundUser;
        window.localStorage.setItem('user', JSON.stringify(user));

        navigateTo('/dashboard');
    });
}
