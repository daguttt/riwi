tables = [
    {"name": "mesa 1", "state": "available"}
]
# {table: "mesa 1", name: "Juan Perez"}
# ⬇️ sera llenada con la estructura
bookings = []
username = ""

VALUE_ERROR_MESSAGE = "Verifique su entrada. Has ingresado un valor erróneo."
INVALID_INPUT_MESSAGE = """
    La opción ingresada no se reconoce en el sistema.
    Se te mostrara de nuevo el menú con la acciones disponibles...
"""


# -*******************************************************************************-
# Utils
# -*******************************************************************************-

def init_tables():
    for i in range(1, 9 + 1):
        new_table = {
            "name": f"mesa {i + 1}",
            "state": "available"
        }
        tables.append(new_table)


def get_input(prompt, fn_converter):
    while True:
        try:
            user_input = input(prompt)
            data = fn_converter(user_input)
            break
        except ValueError:
            print(
                f"'{user_input}' no es un valor admitido. Inténtalo de nuevo.'")
            print()

    return data


def print_message(message: str = ""):
    if message:
        print()
        print(message)
    print()
    input("Presiona enter para continuar...\n")


def get_available_tables():
    available_tables = []
    for table in tables:
        if table["state"] == "available":
            available_tables.append(table)
    return available_tables


def list_available_tables() -> bool:
    available_tables = get_available_tables()
    if len(available_tables) == 0:
        print_message(
            "No hay mesas disponibles para reservar. Todas las mesas están reservadas")
        return False

    for table in available_tables:
        print(table["name"].capitalize())
    return True

# -*******************************************************************************-
# Features
# -*******************************************************************************-


def book_table(username: str):
    # Show available tables
    print()
    print("******************* MESAS DISPONIBLES *******************")
    print()
    could_list_tables = list_available_tables()
    if not could_list_tables:
        return
    print()

    # Get table from table list
    prompt = "Indica el número de la mesa que quieres reservar: "
    table_number = get_input(prompt, int)  # 1 -> 10
    if (table_number < 1 or table_number > 10):
        return print_message("No tenemos el número de mesa indicado.")

    table_index = table_number - 1
    table = tables[table_index]

    available_tables = get_available_tables()
    if table not in available_tables:
        return print_message("La mesa indicada ya está reservada.")

    # Update table's status
    table["state"] = "booked"

    # Create booking
    new_booking = {
        "table": table["name"],
        "name": username
    }
    bookings.append(new_booking)
    print_message("******* Mesa reservada con éxito *******")


def cancel_booking(username: str):
    # Get booked tables by the user and show them
    booked_table_names = []
    for booking in bookings:
        if username == booking["name"]:
            booked_table_names.append(booking["table"])
            print(booking["table"].capitalize())
    print()

    if len(booked_table_names) == 0:
        return print_message("No hay mesas reservadas a su nombre")

    # Get table to be updated
    prompt = "Indica el número de la mesa reservada que quieres cancelar: "
    selected_table_number = get_input(prompt, int)
    if (selected_table_number < 1 or selected_table_number > 10):
        return print_message("No tenemos el número de mesa indicado.")

    table_index = selected_table_number - 1
    table = tables[table_index]

    is_table_in_booked_tables = table["name"] in booked_table_names
    if not (is_table_in_booked_tables):
        return print_message("La mesa indicada no esta reservada a su nombre.")

    # Update table's status
    table["state"] = "available"

    # Delete booking
    booking_to_remove = None
    for booking in bookings:
        if booking["table"] == table["name"]:
            booking_to_remove = booking
            break
    bookings.remove(booking_to_remove)

    print_message("******* Reserva cancelada con éxito *******")


def show_tables_summary():
    print()
    print("******************* RESUMEN DE MESAS *******************")
    print()

    print("------------- Mesas disponibles -------------")
    could_list_tables = list_available_tables()
    if not could_list_tables:
        return
    print()

    print("------------- Mesas reservadas -------------")
    for booking in bookings:
        print(
            f"{booking['table'].capitalize()} -> Reserva a nombre de '{booking['name'].capitalize()}'")
    print_message()


def show_menu():
    global username
    menu_prompt = """
    Bienvenido al restaurante de Daguttt.
    Ingresa el número de la acción que quieres realizar

    1. Realizar reserva.
    2. Cancelar reserva.
    3. Mostrar resumen de mesas disponibles y reservadas.
    4. Salir
    Acción: """

    while True:
        try:
            action = int(input(menu_prompt))
            if action in [1, 2, 3, 4]:
                if action == 4:
                    break

                print()
                username = username or input("Introduce tu nombre: ")
                if action == 1:
                    book_table(username)
                elif action == 2:
                    cancel_booking(username)
                elif action == 3:
                    show_tables_summary()
            else:
                print_message(INVALID_INPUT_MESSAGE)

        except ValueError:
            print_message(VALUE_ERROR_MESSAGE)


def main():
    init_tables()
    show_menu()


main()
