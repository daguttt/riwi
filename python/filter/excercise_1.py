def get_max_number(number_list: list[int]):
    max_number = 0
    for number in number_list:
        if number > max_number:
            max_number = number
    return max_number


def get_min_number(number_list: list[int], max_number_in_target_list: float):
    min_number = max_number_in_target_list
    for number in number_list:
        if number < min_number:
            min_number = number
    return min_number


# print(get_min_number([123, 412, 124, 3421, 24, -12, 21], 3421))


def sum_list(number_list: list[int]):
    total = 0
    for number in number_list:
        total += number
    return total


# print(sum_list([1, 2, 3]))


def calculate_average(target_list: list[int]):
    total = sum_list(target_list)
    return total / len(target_list)


def filter_by_even(number_list: list[int]):
    even_number_list = []
    for number in number_list:
        if number % 2 == 0:
            even_number_list.append(number)
    return even_number_list


def get_input(prompt, fn_converter):
    while True:
        try:
            user_input = input(prompt)
            data = fn_converter(user_input)
            break
        except ValueError:
            print(f"'{user_input}' no es un valor admitido. Inténtalo de nuevo.'")
            print()
    return data


def ask_user_even_numbers_amount(number_list: list[int], even_number_list: list[int]):
    even_number_list_amount = len(even_number_list)
    prompt_amount = f"""
    ¿Cuantos números pares hay en la siguiente lista?
    {number_list}

    Números pares: """
    user_even_numbers_amount = get_input(prompt_amount, int)
    print()

    if user_even_numbers_amount == even_number_list_amount:
        print(f"Correcto! La lista tiene {even_number_list_amount} números pares")
        print()
    else:
        print(
            f"""
    ¡Incorrecto! La lista tiene {even_number_list_amount} números pares"""
        )
        print()


def ask_user_even_numbers_total(number_list: list[int], even_number_list: list[int]):
    even_number_list_total = sum_list(even_number_list)

    prompt_total = f"""
    Calcula la suma total de números pares en la siguiente lista
    {number_list}

    Suma total: """
    user_even_numbers_total = get_input(prompt_total, int)
    print()

    if user_even_numbers_total == even_number_list_total:
        print(
            f"""
    ¡Correcto! La suma de los números pares es: {even_number_list_total}"""
        )
        print()
    else:
        print(
            f"""
    ¡Incorrecto! La suma de los números pares es: {even_number_list_total}"""
        )
        print()


def main():
    number_list = [55, 84, 257, 954, 2211, 356, 17, 14, 2547, 8452]
    even_number_list = filter_by_even(number_list)

    ask_user_even_numbers_amount(number_list, even_number_list)

    ask_user_even_numbers_total(number_list, even_number_list)

    max_number = get_max_number(even_number_list)
    min_number = get_min_number(even_number_list, max_number)
    average = calculate_average(even_number_list)

    print(
        f"""
    El número mayor es: {max_number}
    El número menor es: {min_number}
    El promedio de los números es: {average}
"""
    )


main()
