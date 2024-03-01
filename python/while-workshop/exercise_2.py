# Ejercicio 2: Longitud de un número
# Calcula la longitud de un número entero dado en una variable externa (cuántos dígitos tiene).

n = 1203 # -> 4
digits_counter = 0

while digits_counter < len(str(n)):
    digits_counter += 1
    
print(digits_counter)
# Or just...
# print(len(str(n))) # right?🤷‍♂️