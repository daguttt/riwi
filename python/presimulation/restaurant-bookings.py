tables = [
    {"name": "table 1", "state": "available"}
]
# {table: "mesa 1", name: "Juan Perez"}
# ⬇️ sera llenada con la estructura
bookings = []
# bookings = [
#     {
#         "table": "table 8", "name": "Pacho"
#     },
#     {
#         "table": "table 2", "name": "Pacho"
#     }
# ]


def init_tables():
    for i in range(1, 9 + 1):
        new_table = {
            "name": f"table {i + 1}",
            "state": "available"
        }
        tables.append(new_table)


VALUE_ERROR_MESSAGE = "Verifique su entrada. Has ingresado un valor erróneo."


# -*******************************************************************************-
# Utils
# -*******************************************************************************-


def get_input(prompt, fn_converter):
    while True:
        try:
            data = fn_converter(input(prompt))
            break
        except ValueError:
            print(f"El valor ingresado debe de ser un '{fn_converter}'")
    return data


def print_message(message: str | None):
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


# -*******************************************************************************-
# Features
# -*******************************************************************************-

def book_table(username: str):
    # Mostrar mesas disponibles
    available_tables = get_available_tables()
    print("************* MESAS DISPONIBLES *************")
    print()
    for table in available_tables:
        print(table["name"])
    print()

    # Obteniendo mesa de la lista de mesas
    prompt = "Indica el número de la mesa que quieres reservar: "
    table_number = get_input(prompt, int)  # 1 -> 10
    if (table_number < 1 or table_number > 10):
        return print_message("No tenemos el número de mesa indicado.")

    table_index = table_number - 1
    table = tables[table_index]

    if table not in available_tables:
        return print_message("La mesa indicada ya está reservada.")

    # Actualizando estado de la mesa
    table["state"] = "booked"

    # Creando la reserva
    # booking = { table: "table 1", name: "Juan Perez"}
    # table = {"name": "table 1", "state": "booked"}
    new_booking = {
        "table": table["name"],
        "name": username
    }
    bookings.append(new_booking)
    print_message("******* Mesa reservada con éxito *******")


def cancel_booking(username: str):
    # Mostrar mesas reservadas por el usuario
    # Pacho
    user_table_names = []
    for booking in bookings:
        if username == booking["name"]:
            user_table_names.append(booking["table"])
            print(booking["table"])

    if len(user_table_names) == 0:
        return print("No hay mesas reservadas a su nombre")

    # Obtener la mesa a cancelar desde la lista de mesas ✅
    prompt = "Indica el número de la mesa reservada que quieres cancelar: "
    selected_table_number = get_input(prompt, int)
    if (selected_table_number < 1 or selected_table_number > 10):
        return print_message("No tenemos el número de mesa indicado.")

    table_index = selected_table_number - 1
    table = tables[table_index]

    # table = {"name": "table 1", "state": "booked"}
    is_table_in_booked_tables = table["name"] in user_table_names
    # "table 8" -> ['table 7', 'table 9', 'table 8']
    if not (is_table_in_booked_tables):
        return print_message("La mesa indicada no esta reservada a su nombre.")

    # Actualizar el estado de la mesa ✅
    table["state"] = "available"

    # Eliminar reserva
    # Reserva: {table: "mesa 1", name: "Juan Perez"}
    for booking in bookings:
        if booking["table"] == table["name"]:
            bookings.remove(booking)
            break
    # Alternative
    # booking_to_remove = None
    # for booking in bookings:
    #     if booking["table"] == table["name"]:
    #         booking_to_remove = booking
    #         break
    # bookings.remove(booking_to_remove)

    print_message("******* Reserva cancelada con éxito *******")


def show_tables_summary():
    available_tables = []
    for table in tables:
        if table["state"] == "available":
            available_tables.append(table)
    # Generar lista con usuario y mesa
    print("\nMesas disponibles:")
    for table in available_tables:
        print(table["name"])

    print("\nMesas reservadas:")
    for booking in bookings:
        print(f"{booking['table']} - {booking['name']}")


INVALID_INPUT_MESSAGE = """
    La opción ingresada no se reconoce en el sistema.
    Se te mostrara de nuevo el menú con la acciones disponibles...
"""

username = ""


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


# Punto de inicio de la app


def main():
    init_tables()
    show_menu()


main()
