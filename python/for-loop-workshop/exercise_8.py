# Ejercicio 8: Intersección de listas
# Dados dos listas, utiliza un bucle for para encontrar los elementos comunes a ambas listas.

list_one = [5, 4, 3, 2, 1]
list_two = [3, 4, 5, 6, 7]
common_elements = []
for index, element in enumerate(list_one):
    if element in list_two:
        common_elements.append(element)
print(common_elements)
