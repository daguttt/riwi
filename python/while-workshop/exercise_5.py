# Ejercicio 5: Contador de palabras
# Dado el siguiente string, cuenta cuántas palabras contiene.
my_string = "El Arzobispo de Constantinopla se quiere desarzobispoconstantinoplanizar, el desarzobispoconstantiplanizador que lo desarzobispoconstantinoplanice, buen desarzobispoconstantinoplanizador será."

split_string = my_string.split()
words_counter = 0
while words_counter < len(split_string):
    words_counter += 1
    
print(words_counter)