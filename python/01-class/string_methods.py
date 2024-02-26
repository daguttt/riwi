# String Methods

my_name = "Daniel"
print(my_name) # "Daniel"

# capitalize
my_name1 = "DANIEL"
print(my_name1.capitalize()) # "Daniel"

# upper
my_name2 = "daniel"
print(my_name2.upper()) # "DANIEL"

# lower
my_different_name = "Daniel"
print(my_different_name.lower()) # "daniel"

# strip
my_name3 = "   Daniel   "
print(my_name3.strip()) # "Daniel"

# Get string length
my_name4 = "Daniel"
print(len(my_name4)) # 6

# split
my_name5 = "unacadena"
print(my_name5.split()) # ['unacadena']
print(my_name5.split("a")) # ['un', 'c', 'den', '']

# replace
my_str = "Esta es una cadena"
print(my_str.replace("Esta", "This")) # "This es una cadena"

# find
my_str2 = "una cadena"
print(my_str2.find("u")) # 0

# isnumeric
my_str3 = "123"
print(my_str3.isnumeric()) # True

# Carriage
my_str4 = "hola \rmundo"
print(my_str4) # "mundo"

# Tab
my_str5 = "hola\tmundo"
print(my_str5) # "hola    mundo" -> the number of spaces depends on how the tab is set up

# New line
my_str6 = "hola\nmundo"
print(my_str6) 
"""
hola
mundo
"""

