"""
Ejercicio 4: Invertir Diccionario
Crea una función que invierta las llaves y valores de un diccionario. Asume que los valores son únicos.

- Ejemplo de Entrada: {'a': 1, 'b': 2, 'c': 3}
- Salida esperada: {1: 'a', 2: 'b', 3: 'c'}
"""


def invert_key_for_value(target_dict: dict[str, int]):
    inverted_dict = {}
    for key, value in target_dict.items():
        inverted_dict.setdefault(value, key)
    return inverted_dict
    # * Alternative with dictionary comprehension
    # return {value: key for key, value in target_dict.items()}


print(invert_key_for_value({'a': 1, 'b': 2, 'c': 3}))
