# Ejercicio 10: Eliminar duplicados
# Dada la siguiente lista, utiliza un bucle for para eliminar los elementos duplicados y conservar una lista con elementos únicos.

lista_strings = ["manzana", "banana", "cereza", "manzana",
                 "durazno", "plátano", "cereza", "manzana", "durazno", "banana"]
unique_string_list = []

for string in lista_strings:
    if string in unique_string_list:
        continue
    unique_string_list.append(string)

print(unique_string_list)


# Alternative without for loop
# unique_string_list = set(lista_strings)
# print(unique_string_list)
