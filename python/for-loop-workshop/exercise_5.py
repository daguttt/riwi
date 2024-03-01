# Ejercicio 5: Contar elementos específicos. Hacer metodo count.
# Dada una lista de numeros o de cadenas, cuenta cuántas veces aparece un elemento en la lista.

number_str_list = [1, 5, -10, -23, 234, "Hello", ",",
                   " Clan", " ", "Hopper", "!", -23, 8, -91, 10, 6, -23, "My",
                   "lastname", "is", "Hopper", "too"]

mapper = {}
for element in number_str_list:
    if mapper.get(element):
        mapper[element] += 1
    else:
        mapper.setdefault(element, 1)

# -***** (loop only for printing purposes) -*****
for element, times in mapper.items():
    to_print_element = f"'{element}'" if type(element) == str else element
    times_word = 'times' if times > 1 else 'time'
    print(f"{to_print_element} is {times} {times_word} ")
