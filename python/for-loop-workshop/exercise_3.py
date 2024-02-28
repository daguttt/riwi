# Ejercicio 3: Multiplicación de elementos en una lista
# Dada una lista de números definidos por ti, calcula el producto de todos los números utilizando un bucle for.

number_list = [1, 5, -10, 2, 234, -23, 8, -91, -6]

product_number_result = 1
for number in number_list:
  product_number_result *= number
print(f"Result: {product_number_result}")