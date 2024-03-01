# Ejercicio 6: Filtrar divisibles
# Dada una lista de números, imprime solo aquellos que son divisibles por un número n definido por ti en una variable externa.
number_list = [1, 5, 12, 2, 240, 23, 8, 90, 6]
n = 6
divisible_number_list = []

for number in number_list:
    if number % n == 0:
        divisible_number_list.append(number)

# ! -****** Printing purpose only ******
stringified_number_list = map(lambda n: str(n), divisible_number_list)
print(
    f"The numbers: {', '.join(stringified_number_list)} are divisible by {n}")
