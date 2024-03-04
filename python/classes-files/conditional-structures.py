'''
Uso del if
Verificar si un número es positivo.
Si el número es mayor que cero, imprimiremos que es positivo.
'''

# number = 0
# if number > 0:
#     print("El número es positivo.")


'''
Uso del elif
Queremos clasificar un número como positivo, negativo o cero.
Utilizaremos `elif` para la clasificación múltiple.
'''

# number = -1
# if number > 0:
#     print("El número es positivo.")
# elif number < 0:
#     print("El número es negativo.")
# else:
#     print("El numero es 0")

'''
Expresiones booleanas

Verificamos si un número es par e imprimimos un booleano como resultado.
Un número es par si el resto de dividir por 2 es cero.
'''

# number = 3
# is_even = number % 2 == 0
# print(is_even)

'''
Operadores de comparacion.

Dada una edad, decidimos si una persona es mayor de edad.
Consideramos mayor de edad a quien tenga 18 años o más.
'''

# edad = 17
# if edad >= 18:
#     print("Es mayor de edad.")
# else:
#     print("No es mayor de edad.")

'''
Operadores logicos

Determinamos si un número está dentro de un rango específico.
El número debe ser mayor que 10 y menor que 20.
'''

# number = 7
# if number > 10 and number < 20:
#     print("El número está en el rango de 11 a 19.")
# else:
#     print("Fuera del rango")
'''
Expresiones condicionales u operadores ternarios
Usamos una expresión condicional para asignar un mensaje basado en si un número es positivo o no.
'''

# number = 2
# message = "Positivo" if number > 0 else "No positivo"
# print(message)

'''
Evaluacion de Corto circuito
Mostramos cómo Python no evalúa la segunda condición si la primera es suficiente para determinar el resultado.
Si el primer número no es cero (lo cual es verdadero), Python no necesitará verificar la segunda condición.
'''

# a = 0
# b = 0
# if a != 0 or b != 0:
#     print("Al menos uno de los números no es cero.")

'''
Sentencia pass
En un bloque condicional, a veces no queremos realizar ninguna acción.
Utilizamos `pass` como un lugar para mantener la estructura del código sin realizar ninguna acción.
'''

# number = 0
# if number == 0:
#     pass  # do nothing
# else:
#     print("El número no es cero.")

'''
Mejores Practicas
Es una buena práctica escribir condiciones claras y usar nombres descriptivos para las variables.
Aquí verificamos si el cliente es elegible para un descuento sin anidar condiciones innecesariamente.
'''

# client_age = 25
# is_client_student = True

# if client_age < 30 and is_client_student:
#     print("El cliente es elegible para el descuento estudiantil.")

'''
Sentencias Truthy y Falsy

--Falsy
None
False
Cero (0, 0.0, 0j, etc.)
Una secuencia o colección vacía ('', (), [], {}, set(), range(0))
Un objeto de una clase que define un método __bool__ que devuelve False o un método __len__ que devuelve 0.

--Truthy
Cadenas no vacías ('algo')
Números diferentes de cero
Objetos de clases que no se encuentran en las condiciones anteriores o que definen un método __bool__ que devuelve True.
'''

print(bool(0))