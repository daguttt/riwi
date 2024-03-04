"""
Ejercicio 1: Concatenar Texto de Lista
Crea una función que tome una lista de cadenas de texto y las concatene en una sola cadena, separadas por espacios.

- Ejemplo de Entrada: ["Hola", "mundo", "Python"]
- Salida esperada: "Hola mundo Python"

"""


def concat_string_list(string_list: list[str]):
    return " ".join(string_list)


print(concat_string_list(["Hola", "mundo", "Python"]))
print(concat_string_list(["Hello", "Bye", "World", "Daniel", "Foo"]))
