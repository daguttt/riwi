import { navigateTo } from '../../../Router';
import { editFlight } from '../../../services/edit-flight.service';
import { getFlightById } from '../../../services/get-flights.service';

export function EditFlightPage(searchParams) {
    const flightId = searchParams.get('id');

    const html = /*html*/ `
      <main>
            <h1>Editar Vuelo</h1>
            <div id="form-wrapper"></div>
      </main>
    `;
    const logic = async () => {
        if (!flightId) {
            alert(
                'Id del producto a editar no encontrado. Redirigiendo al dashboard',
            );
            navigateTo('/dashboard');
            return;
        }

        const flight = await getFlightById({ flightId });
        const $formWrapper = document.getElementById('form-wrapper');

        console.log({ flight });
        const formToEditHtml = /*html*/ `
            <form id="edit-flight-form">
                <div class="form-group">
                    <label for="departure">Fecha y hora de salida</label>
                    <input type="datetime-local" name="departure" id="departure" value="${flight.departure}">
                </div>
                <div class="form-group">
                    <label for="arrival">Fecha y hora de llegada</label>
                    <input type="datetime-local" name="arrival" id="arrival" value="${flight.arrival}">
                </div>
                <div class="form-group">
                    <label for="capacity">Capacidad</label>
                    <input type="number" name="capacity" id="capacity" value="${flight.capacity}">
                </div>
                <button type="submit">Editar vuelo</button>
            </form>
        `;
        $formWrapper.innerHTML = formToEditHtml;

        const $editFlightForm = document.getElementById('edit-flight-form');
        $editFlightForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const $formControls = event.target.elements;
            const $departureControl = $formControls['departure'];
            const $arrivalControl = $formControls['arrival'];
            const $capacityControl = $formControls['capacity'];

            const editFlightDto = {
                departure: $departureControl.value,
                arrival: $arrivalControl.value,
                capacity: $capacityControl.value,
            };

            await editFlight({ flightId, editFlightDto });
            alert('Evento editado con éxito');
            navigateTo('/dashboard');
        });
    };
    return { html, logic };
}

const html = /*html*/ `
    
`;
