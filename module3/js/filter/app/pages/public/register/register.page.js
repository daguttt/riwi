import { navigateTo } from '../../../Router';
import { emailValidator } from '../../../helpers/email-validator';
import { register } from '../../../services/auth/register.service';
import { getUsers } from '../../../services/get-users.service';

export function RegisterPage() {
    const $root = document.getElementById('root');
    $root.innerHTML = /*html*/ `
        <main>
            <div class="form-wrapper">
                <h1>Registro</h1>
                <form id="register-form">
                    <div class="form-group">
                        <label for="name">Nombre</label>
                        <input type="text" name="name" id="name">
                    </div>
                    <div class="form-group">
                        <label for="email">Correo</label>
                        <input type="email" name="email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="birthday">Fecha de nacimiento</label>
                        <input type="date" name="birthday" id="birthday">
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" name="password" id="password">
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
                <div>
                    <p>¿Ya tienes cuenta?</p>
                    <button id="login-link">Inicia sesión</button>
                </div>
            </div>
        </main>
    `;

    // Login link functionality
    const $loginLink = document.getElementById('login-link');
    $loginLink.addEventListener('click', () => {
        navigateTo('/login');
    });

    const $registerForm = document.getElementById('register-form');
    $registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        // console.log({ formControls: event.target.elements });
        const $formControls = event.target.elements;
        const $nameControl = $formControls['name'];
        const $emailControl = $formControls['email'];
        const $birthdayControl = $formControls['birthday'];
        const $passwordControl = $formControls['password'];

        // console.log({
        //     $nameControl,
        //     $emailControl,
        //     $birthdayControl,
        //     $passwordControl,
        // });

        // Validate user email
        const isValidEmail = emailValidator($emailControl.value);
        if (!isValidEmail) {
            alert('El email no tiene un formato válido.');
            return;
        }

        // Check if the user is already registered
        const users = await getUsers();
        const foundUser = users.find(
            (user) => user.email === $emailControl.value,
        );
        if (foundUser) {
            alert(
                `Usuario con email '${$emailControl.value}' ya ha sido registrado`,
            );
            return;
        }

        const registeredUser = await register({
            name: $nameControl.value,
            email: $emailControl.value,
            birthday: $birthdayControl.value,
            password: $passwordControl.value,
        });

        // Redirect the user directly to dashboard once registered
        // Create token
        const token = window.crypto.randomUUID();
        window.localStorage.setItem('token', token);

        // Save user in localStorage without password
        const { password: _, ...user } = registeredUser;
        window.localStorage.setItem('user', JSON.stringify(user));

        navigateTo('/dashboard');
    });
}
