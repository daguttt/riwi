"""
Ejercicio 3: Contar Ocurrencias en Lista (metodo count)
Crea una función que cuente cuántas veces aparece un elemento en una lista.

- Ejemplo de Entrada: Lista: [1, 2, 3, 2, 4, 2, 5], Elemento: 2
- Salida esperada: 3 (el número 2 aparece 3 veces)
"""


def count_ocurrencies(target_list: list[int], number_to_count: int):
    times_found = target_list.count(number_to_count)
    return f"{times_found} (el número {number_to_count} aparece {times_found})"


print(count_ocurrencies([1, 2, 3, 2, 4, 2, 5], 2))
