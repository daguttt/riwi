# Ejercicio 4: Concatenación de cadenas
# Dada una lista de cadenas (strings) definida por ti, concaténalas todas en una sola cadena utilizando un bucle for.

str_list = ["Hello", ",", " Clan", " ", "Hopper", "!"]
greeting = ""
for string in str_list:
    greeting += string
# Alternative
# for string in str_list:
#     greeting = f"{greeting}{string}"

print(f"Greeting:\n'{greeting}'")
