"""
# Ejercicio 13: Tablas de multiplicar
# Imprime las tablas de multiplicar del 1 al 10 utilizando bucles for anidados.
"""

for number in range(1, 10 + 1):
    for multiplier in range(1, 10 + 1):
        ending_str = ", " if multiplier != 10 else ""
        print(f"{number} × {multiplier} = {number * multiplier}", end=ending_str)
    print("\n")
