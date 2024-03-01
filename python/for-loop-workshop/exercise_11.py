"""
# Ejercicio 11: Factorial de un numero
# Calcula el factorial de un número n (crear variable n) utilizando un bucle for.
"""
n = 4
factorial = 1
for i in range(1, n + 1):
    factorial *= i
print(factorial)
