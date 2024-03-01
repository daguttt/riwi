"""
Ejercicio 9: Patrón de números
Imprime el siguiente patrón de números utilizando bucles for. Cada línea debe contener números del 1 al número de línea (inclusive).

1
12
123
1234
12345
"""

for i in range(1, 5 + 1):
    for j in range(1, i + 1):
        print(j, end="")
    print()
    # Alternative
    # line = ""
    # for j in range(1, i + 1):
    #     line += str(j)
    # print(line)
