"""
Ejercicio 5: Filtrar Números Pares
Crea una función que devuelva solo los números pares de una lista.

- Ejemplo de Entrada: [1, 2, 3, 4, 5, 6]
- Salida esperada: [2, 4, 6]
"""


def filter_even_numbers(number_list: list[int]):
    even_numbers = []
    for number in number_list:
        if number % 2 == 0:
            even_numbers.append(number)
    return even_numbers
    # * Alternative with filter() function, unpacking, and lambda function
    # (Unpacking is necessary because `filter()` return a generator-like [iterable] )
    # return [*filter(lambda number: number % 2 == 0, target_list)]


print(filter_even_numbers([1, 2, 3, 4, 5, 6]))
