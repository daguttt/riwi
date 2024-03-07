# Ejercicio 4: Juego de multiplicar
# Pregunta al usuario el resultado de multiplicar dos números aleatorios (creados por ti) hasta que responda incorrectamente.
from random import randint
MIN_NUMBER = 1
MAX_NUMBER = 3

score = 0
while True:
    number_one = randint(MIN_NUMBER, MAX_NUMBER)
    number_two = randint(MIN_NUMBER, MAX_NUMBER)
    result = number_one * number_two
    guessed_result = int(input(f"Adivina el resultado de multiplicar DOS numeros aletorios entre {MIN_NUMBER} y {MAX_NUMBER}: "))
    
    if guessed_result != result:
        print(f"No adivinaste el resultado. Racha {score}")
        break
    else:
        score += 1
        print(f"Adivinaste el resultado. Racha {score}")
        
