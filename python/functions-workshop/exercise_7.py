"""
Ejercicio 7: Generar Diccionario de Conteos
Crea una función que tome una cadena de texto y devuelva un diccionario con el conteo de cada carácter.

- Ejemplo de Entrada: "banana"
- Salida esperada: {'b': 1, 'a': 3, 'n': 2}
"""


def count_letter_in_string(string: str):
    counter = {}
    for letter in string:
        if counter.get(letter):
            counter[letter] += 1
        else:
            counter[letter] = 1
    return counter
    # Alternative
    # counter = {}
    # split_string = list(string)
    # for letter in split_string:
    #     if not counter.get(letter):
    #         counter[letter] = split_string.count(letter)
    # return counter


print(count_letter_in_string("banana"))
