"""
Ejercicio 6: Mayor y Menor en Lista
Crea una función que encuentre el número mayor y menor en una lista y los devuelva.

- Ejemplo de Entrada: [50, 20, 65, 30]
- Salida esperada: (65, 20) (65 es el mayor, 20 es el menor)
"""


def find_max_and_min(number_list: list[int]):
    max_number = 0
    for number in number_list:
        if number > max_number:
            max_number = number

    min_number = max_number
    for number in number_list:
        if number < min_number:
            min_number = number

    return f"({max_number}, {min_number}) ({max_number} es el mayor, {min_number} es el menor)"
    # Alternative
    # min_number = min(target_list)
    # max_number = max(target_list)
    # return f"({max_number}, {min_number}) ({max_number} es el mayor, {min_number} es el menor)"


print(find_max_and_min([50, 20, 65, 30]))
print(find_max_and_min([50, 20, 65, 30, 5]))
