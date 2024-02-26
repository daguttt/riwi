"""
Normalizar Nombres: Dada una cadena con el nombre completo de una persona en minúsculas, convertir la primera letra de cada nombre a mayúscula.
	Ejemplo: 'juan perez' → 'Juan Perez'
"""
my_str = 'juan perez'
print(my_str.title())  # -> Juan Perez

"""
Convertir a Mayúsculas: Dado un título de libro, convertir todo el texto a mayúsculas.
	Ejemplo: 'cien años de soledad' → 'CIEN AÑOS DE SOLEDAD'
"""
my_str = 'cien años de soledad'
print(my_str.upper())  # -> CIEN AÑOS DE SOLEDAD

"""
Crear un Identificador: Dada una frase, convertirla a minúsculas y reemplazar los espacios con guiones para crear un identificador web (slug).
	Ejemplo: 'Hola Mundo Python' → 'hola-mundo-python'
"""
my_str = 'Hola Mundo Python'
print(my_str.lower().replace(' ', '-'))  # -> hola-mundo-python

"""
Limpiar Espacios: Dada una cadena con espacios extra al principio y al final, eliminar estos espacios.
	Ejemplo: ' hola mundo ' → 'hola mundo'
"""
my_str = ' hola mundo '
print(my_str.strip())  # -> hola mundo

"""
Extraer Dominio de Email: Dado un email, extraer el dominio utilizando el método split().
	Ejemplo: 'usuario@example.com' → 'example.com'
"""
my_str = 'usuario@example.com'
print(my_str.split('@')[1])  # -> example.com

"""
Reemplazar Caracteres: Dada una cadena que contiene puntos como separadores de palabras, reemplazarlos con espacios.
	Ejemplo: 'hola.mundo' → 'hola mundo'
"""
my_str = 'hola.mundo'
print(my_str.replace('.', ' '))  # -> hola mundo

"""
	Encontrar Posición de Subcadena: Dada una cadena, 
	encontrar la posición de la primera ocurrencia de 'Python'.
	Ejemplo: 'Aprendiendo Python en OpenAI' → Índice de 'Python'
"""
my_str = 'Aprendiendo Python en OpenAI'
print(my_str.find('Python'))  # -> 12

"""
	Verificar si es Numérico: Dada una cadena, verificar si esta cadena es un número.
		Ejemplo: '1234' → True
"""
my_str = '1234'
print(my_str.isnumeric())  # -> True

"""
Capitalizar Frases: Dada una cadena representando una frase, capitalizar solo la primera letra de la frase.
	Ejemplo: 'este es un título.' → 'Este es un título.'
"""

my_str = 'este es un título.'
print(my_str.capitalize())  # -> Este es un título.

"""
Convertir a Minúsculas: Dado un aviso en mayúsculas, convertirlo todo a minúsculas para hacerlo menos agresivo.
	Ejemplo: '¡ESTE ES UN AVISO IMPORTANTE!' → '¡este es un aviso importante!'
"""
my_str = '¡ESTE ES UN AVISO IMPORTANTE!'
print(my_str.lower())  # -> ¡este es un aviso importante!

"""
Eliminar Caracteres Específicos: Dada una cadena que incluye comillas al principio y al final, eliminarlas.
	Ejemplo: '"importante"' → 'importante'
"""
my_str = '"importante"'
print(my_str.replace('"', ''))  # -> importante

"""
Dividir en Palabras: Dado un texto, dividirlo en palabras usando espacios como separadores.
	Ejemplo: 'hola mundo python' → ['hola', 'mundo', 'python']
"""
my_str = 'hola mundo python'
print(my_str.split())  # -> ['hola', 'mundo', 'python']

"""
Reemplazar Espacios por Subrayados: Dada una cadena, reemplazar todos los espacios por subrayados.
	Ejemplo: 'hola mundo python' → 'hola_mundo_python'
"""
my_str = 'hola mundo python'
print(my_str.replace(' ', '_'))  # -> hola_mundo_python

"""
Encontrar Palabra Clave: Dada la cadena larga, encontrar si la palabra 'clave' está presente y su posición.
	Ejemplo: 'La palabra clave está aquí.' → Posición de 'clave'
"""
my_str = 'La palabra clave está aquí.'
print(my_str.find('clave'))  # -> 11

"""
Validar Código Postal: Dada una cadena que representa un código postal, verificar si todos los caracteres son numéricos.
	Ejemplo: '08021' → True
"""
my_str = '08021'
print(my_str.isnumeric())  # -> 11
