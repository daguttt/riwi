from typing import Literal

# {"name":"my_expense_or_income", "amount": 1200, "category": "alimentos"}
monthly_income_expenses = []
categories = {"expenses": ["alimentos", "vivienda"],
              "incomes": ["work", "freelance"]}
general_balance = 0

VALUE_ERROR_MESSAGE = "Verifique su entrada. Has ingresado un valor erróneo."

# -*******************************************************************************-
# Utils
# -*******************************************************************************-


def print_message(message: str | None):
    if message:
        print()
        print(message)
    print()
    input("Presiona enter para continuar...\n")


def get_category_prompt(register_type: Literal["expenses", "incomes"]):
    formatted_category_list = [
        f'\t{index}. {category}' for index, category in enumerate(categories[register_type])]
    category_list_str = '\n'.join(formatted_category_list)
    return f"""
    Selecciona la categoria a la que pertenece tu registro
    {category_list_str}
    
    Número categoria: """


def print_registry(name: str, amount: int, category: str):
    print()
    print(f"Nombre: {name}")
    print(f"Monto: {amount}")
    print(f"Categoria: {category}")
    print()
    print(f"-----------------")


# print(get_category_prompt("expenses"))


def get_registry_type(amount: int):
    return "incomes" if amount > 0 else "expenses"


def find_register_by_name(registry_name: str):
    for index, registry in enumerate(monthly_income_expenses):
        if registry["name"] == registry_name:
            return monthly_income_expenses[index]
    return None


# print(find_register_by_name("Test3"))


# -*******************************************************************************-
# Features
# -*******************************************************************************-


def show_finance_status():
    if general_balance > 0:
        print_message("Tu balance es positivo. ¡Buen manejo de tus finanzas!")
    else:
        print_message("Tu balance es negativo. Considera revisar tus gastos.")


def show_balance():
    print_message(f"Tu balance general es {general_balance}")


def show_all_registers():
    print("**************************** REGISTROS ****************************")

    if len(monthly_income_expenses) == 0:
        return print_message("No tienes registros en este momento.")

    for registry in monthly_income_expenses:
        print_registry(
            name=registry["name"],
            amount=registry["amount"],
            category=registry["category"]
        )
    print_message("")


def update_register_amount():
    name_prompt = """
    Ingresa el nombre del gasto que deseas actualizar.

    INFO: Recuerda que los nombres son unicos para cada registro
    Nombre: """
    registry_name = input(name_prompt)
    registry = find_register_by_name(registry_name)
    if not registry:
        return print_message(f"No existe un gasto con el nombre: '{registry_name}'")

    if get_registry_type(registry["amount"]) == "incomes":
        return print_message(f"No puedes modificar los registros que son ingresos")

    print_registry(
        name=registry["name"],
        amount=registry["amount"],
        category=registry["category"]
    )

    new_amount_propmt = f"""
    Ingresa el nuevo monto del gasto {registry['name']} 
    
    Nuevo monto:"""
    try:
        new_amount = int(input(new_amount_propmt))
    except ValueError:
        print_message(VALUE_ERROR_MESSAGE)

    registry["amount"] = new_amount


def add_register():
    global general_balance
    amount_prompt = """
    Ingresa el monto del registro.
    
    INFO: Si el monto es un valor positivo
    el registro será un ingreso, de lo contrario un gasto.
    Monto: """
    name_prompt = """
    Ingresa el nombre del registro.
    
    INFO: Este será usado para identificar registros en el sistema
    Nombre: """

    try:
        registry_amount = int(input(amount_prompt))
        if registry_amount == 0:
            return print_message("No puedes agregar un registro con el monto en 0")

        registry_name = input(name_prompt)
        if find_register_by_name(registry_name):
            return print_message(f"El registro '{registry_name}' ya ha sido añadido")

        register_type = get_registry_type(registry_amount)

        register_category_index = int(
            input(get_category_prompt(register_type)))
        register_category = categories[register_type][register_category_index]

        general_balance += registry_amount

        register = {
            "name": registry_name,
            "amount": registry_amount,
            "category": register_category
        }
        monthly_income_expenses.append(register)
        print_message("****** Registro añadido satisfactoriamente! ******")

    except ValueError:
        print_message(VALUE_ERROR_MESSAGE)


def show_menu():
    menu_prompt = """
    Bienvenido a tu finance tracker.
    ¿Qué operación quieres realizar?
    
    1. Añadir un registro (ingreso o gasto).
    2. Modificar el monto de un registro.
    3. Ver todos los registros.
    4. Mostrar tu balance general
    5. Ver mi estado financiero.
    Opción: """
    while True:
        try:
            option = int(input(menu_prompt))
            if option in [1, 2, 3, 4, 5]:
                if option == 1:
                    add_register()
                elif option == 2:
                    update_register_amount()
                elif option == 3:
                    show_all_registers()
                elif option == 4:
                    show_balance()
                elif option == 5:
                    show_finance_status()
            else:
                print_message(
                    "La opción ingresada no se reconoce en el sistema.\nSe te mostrara de nuevo el menú con la opciones...")

        except ValueError:
            print_message(VALUE_ERROR_MESSAGE)


def main():
    show_menu()


main()
