import { navigateTo } from '../../../Router';
import { createFlight } from '../../../services/create-flight.service';
import { getFlights } from '../../../services/get-flights.service';

export function CreateFlightPage() {
    const html = /*html*/ `
      <main>
            <h1>Crear vuelo</h1>
            <div class="form-wrapper">
                <form id="create-flight-form">
                    <div class="form-group">
                        <label for="origin">Origen</label>
                        <select name="origin" id="origin">
                            <option value="" disabled selected>---Selecciona un origen---</option>
                            <option value="JFK">JFK</option>
                            <option value="MIA">MIA</option>
                            <option value="CDG">CDG</option>
                            <option value="LAX">LAX</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="destination">Destino</label>
                        <select name="destination" id="destination">
                            <option value="" disabled selected>---Selecciona un destino---</option>
                            <option value="JFK">JFK</option>
                            <option value="MIA">MIA</option>
                            <option value="CDG">CDG</option>
                            <option value="LAX">LAX</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="departure">Fecha y hora de salida</label>
                        <input type="datetime-local" name="departure" id="departure">
                    </div>
                    <div class="form-group">
                        <label for="arrival">Fecha y hora de llegada</label>
                        <input type="datetime-local" name="arrival" id="arrival">
                    </div>
                    <div class="form-group">
                        <label for="capacity">Capacidad</label>
                        <input type="number" name="capacity" id="capacity" value="90">
                    </div>
                    <button type="submit">Crear vuelo</button>
                </form>
            </div>
      </main>
    `;
    const logic = async () => {
        const $createFlightForm = document.getElementById('create-flight-form');
        $createFlightForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            // console.log({ formControls: event.target.elements });
            const $formControls = event.target.elements;
            const $originControl = $formControls['origin'];
            const $destinationControl = $formControls['destination'];
            const $departureControl = $formControls['departure'];
            const $arrivalControl = $formControls['arrival'];
            const $capacityControl = $formControls['capacity'];
            console.log({
                $originControl,
                $destinationControl,
                $departureControl,
                $arrivalControl,
                $capacityControl,
            });

            // console.log({
            //     $nameControl,
            //     $emailControl,
            //     $birthdayControl,
            //     $passwordControl,
            // });

            // Validate origin and destination
            if (!$originControl.value || !$destinationControl.value) {
                alert('El origen y el destino son requeridos');
                return;
            }

            // Validate departure and arrival
            if (!$departureControl.value || !$arrivalControl.value) {
                alert('La hora de salida y de llegada son requeridas');
                return;
            }

            // Compute new flight number
            const flights = await getFlights();
            const ascendingSortedFlights = [...flights].sort((a, b) =>
                a.number > b.number ? 1 : -1,
            );
            const lastFlightNumber =
                ascendingSortedFlights[ascendingSortedFlights.length - 1]
                    .number;
            const newFlightNumber = lastFlightNumber + 1;

            // Save flight in db
            const createFlightDto = {
                number: newFlightNumber,
                origin: $originControl.value,
                destination: $destinationControl.value,
                departure: $departureControl.value,
                arrival: $arrivalControl.value,
                capacity: $capacityControl.value,
            };
            // console.log({ createFlightDto });
            await createFlight(createFlightDto);
            alert('Viaje creado con éxito');
            navigateTo('/dashboard');
        });
    };
    return { html, logic };
}
