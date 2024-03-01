"""
# Ejercicio 12: Números Fibonacci
# Genera e imprime los primeros n números de la secuencia Fibonacci.
## Secuencia Fibonnacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597
#                        1, 2, 3, 4, 5, 6, 7,  8,  9, 10, 11, 12,  13
"""
# n = 6  # -> 5
n = 8  # -> 13
n = 13  # -> 144
fib_sequence = []
for i in range(n):
    if len(fib_sequence) < 2:
        fib_sequence.append(i)
        continue
    fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])

# ! -****** Printing purpose only ******
print(", ".join([str(element) for element in fib_sequence]))
