"""
Ejercicio 9: Eliminar Duplicados de Lista
Crea una función que elimine los elementos duplicados de una lista y devuelva una nueva lista.

- Ejemplo de Entrada: [1, 2, 2, 3, 3, 3, 4]
- Salida esperada: [1, 2, 3, 4]
"""


def remove_duplicated_numbers(number_list: list[int]):
    unique_number_list = []
    for number in number_list:
        if number in unique_number_list:
            continue
        unique_number_list.append(number)
    return unique_number_list
    # Alternative
    return list(set(number_list))


print(remove_duplicated_numbers([1, 2, 2, 3, 3, 3, 4]))
