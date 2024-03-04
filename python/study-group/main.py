"""
Question by: Pacho
# 1. se puede recorrer un diccionario buscando un valor (value)? 
R/ No, un diccionario efectivamente no es iterable. Pero
se puede traer el valor a través de su clave. (Ver linea 11)
"""

# record = {"name": "my_expense_or_income",
#           "amount": 1200, "category": "alimentos", }

# print(record["amount"])


# -*******************************************************************************-

"""
Question by: Pacho
# 2. ¿Cómo eliminar un carácter de un string?
"""

# my_str = "daguttt/academies/riwi"  # -> Eliminar la 'i'

#           Principio
# print(my_str[:-1])  # -> daguttt/academies/riw

# KISS -> Keep It Simple Stupid
# KISS -> Keep It Simple and S...

# Elinar todas las 'a'
# print(my_str.replace('a', ''))

# Como tip para conocer los métodos de los tipos de datos
# podemos usar el REPL de Python colocando `python3` en linux o
# `python` en Windows

# -*******************************************************************************-

"""
Question by: Camilo
3. ¿Cómo abordar un ejercicio? ¿Cómo empezar a desarrollar un problema?
"""
"""
Respuesta
1. Leer muy bien. -> Para ahorrar tiempo y no reescribir código ya desarrollado.
2. Identificar requerimientos.
    2.1 Empezar a pensar CÓMO realizaría los requerimientos.
3. Identificar reglas de negocio.
    - Ejemplo:
        Cada producto en el inventario debe tener los siguientes detalles:
            ● Nombre del producto
            ● Precio unitario del producto
            ● Cantidad disponible en el inventario
4. Analizar inputs y outputs.
5. Entender que tipo de programa estamos desarrollando (Consola, Pagina web, API, etc).
    5.1 Programas de consola.
     - Identificar si se busca solo un resultado con base en un input. (No se necesita un bucle)
     - O si se le dan diferentes opciones al usuario para interactuar 
        con el sistema (Bucle infito, terminado a petición del usuario).  
6. Analizar como fluye la información (data) y si se tiene que guardar en el algún sitio
    - Lo más básico es guardar la data en una lista.
"""

product_example = {
    "name": "Example 1",
    "price": 800,
    "quantity": 50,
}

# product_list = [
#     {
#         "name": "Example 1",
#         "price": 800,
#         "quantity": 80,
#     },
#     {
#         "name": "Example 2",
#         "price": 320,
#         "quantity": 50,
#     },
#     {
#         "name": "Example 3",
#         "price": 1200,
#         "quantity": 5,
#     },
# ]
#
# Cambiar la cantidad del producto seleccionado por el usuario.

product_list = [
    {
        "name": "Example 1",
        "price": 800,
        "quantity": 80,
    },
    {
        "name": "Example 2",
        "price": 320,
        "quantity": 50,
    },
    {
        "name": "Example 3",
        "price": 1200,
        "quantity": 5,
    },
]


def get_input(prompt, fn_converter):
    while True:
        try:
            data = fn_converter(input(prompt))
            break
        except ValueError:
            print(f"El valor ingresado debe de ser un '{fn_converter}'")
    return data


def change_product_quantity():
    # 1. Obtener el producto que el usuario quiere cambiar.
    name_prompt = "Ingrese el nombre del producto que desea modificar: "
    product_name = input(name_prompt)

    # print(new_product_quantity)

    # 2. Encontrar el producto a actualizar en la lista
    product_to_update = None
    for product in product_list:
        if product_name == product["name"]:
            product_to_update = product
            break

    if not product_to_update:
        return print(f"No existe un producto con el nombre {product_name}")

    # 3. Obtener la nueva cantidad del producto
    # Acá sería el caso positivo en el que tenemos el producto.
    new_product_quantity = get_input(
        "Ingrese la nueva cantidad del producto a actualizar: ", float)

    # 4. Actualizamos el producto
    # product_to_update.update({"quantity": new_product_quantity})
    product_to_update["quantity"] = new_product_quantity


change_product_quantity()
