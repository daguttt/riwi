"""
Ejercicio 2: Suma de Números hasta N
Crea una función que sume todos los números hasta n usando un bucle while.

- Ejemplo de Entrada: 5
- Salida esperada: 15 (porque 1+2+3+4+5=15)
"""


def sum_until(target_number: int):
    result = 0
    for number_to_sum in range(1, target_number + 1):
        result += number_to_sum
    return result


print(sum_until(5))
