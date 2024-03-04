"""
Ejercicio 10: Contar Palabras
Crea una función que tome una cadena de texto y devuelva un diccionario con el conteo de palabras que aparecen en ella.

- Ejemplo de Entrada: "este es un texto este texto"
- Salida esperada: {'este': 2, 'es': 1, 'un': 1, 'texto': 2}
"""


def count_words_in_string(string: str):
    counter = {}
    words_list = string.split(" ")
    for word in words_list:
        if not counter.get(word):
            counter[word] = words_list.count(word)
        # Alternative
        # if counter.get(word):
        #     counter[word] += 1
        # else:
        #     counter[word] = 1
    return counter


print(count_words_in_string("este es un texto este texto"))
