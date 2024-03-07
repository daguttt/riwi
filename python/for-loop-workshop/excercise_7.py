"""
Ejercicio 7: Crear una lista de tuplas
Utilizando un bucle for, crea una lista de tuplas donde el primer elemento sea el índice y el segundo elemento sea el valor cuadrado del índice. El tamaño es de tu eleccion.
"""

tuple_list = []
for i in range(100):
    tuple_list.append((i, i**2))

print(tuple_list)
