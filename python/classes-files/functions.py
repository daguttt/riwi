# Definición y Sintaxis: Una función en Python se define usando la palabra clave def, seguida por el nombre de la función, paréntesis () que pueden incluir parametros, y dos puntos :. Luego, el bloque de código dentro de la función se identa.

# Argumentos: Las funciones pueden tener argumentos, que son valores pasados a la función cuando es llamada. Estos argumentos pueden ser obligatorios o opcionales (argumentos por defecto).

# Argumentos: Al llamar a una función, puedes especificar argumentos por nombre, lo cual permite omitir el orden de los argumentos y hacer el código más legible.  Cuando combines argumentos posicionales y KEYWORD en una llamada a función, los argumentos posicionales deben aparecer primero. Esto es porque Python asigna argumentos basado en la posición primero y luego por nombre.

# Valores de Retorno: Usando return, una función puede devolver uno o muchos valores. Si no se especifica un valor de retorno, la función devolverá None por defecto.

# Argumentos Variables: Las funciones pueden aceptar un número variable de argumentos usando *args para argumentos no clave y **kwargs para argumentos clave.

# Ámbito de Variables: Las variables definidas dentro de una función solo están disponibles en ese ámbito (local). Python busca variables en el ámbito local, luego en el ámbito superior donde se definió la función, y finalmente en el ámbito global.

def my_function():
    pass
print(my_function())