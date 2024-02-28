# Ejercicio 2: Suma de números negativos
# Dada una lista de números que incluye tanto positivos como negativos, calcula la suma de todos los números negativos.

number_list = [1, 5, -10, 2, 234, -23, 8, -91, 10, 6, -3]
total = 0
for number in number_list:
  if number < 0:
    total += number
print(total)