BASE_BONUS = 5_000_000

print(BASE_BONUS)

ages_list = []
bonuses_total = 0

# -*******************************************************************************-
# Utils
# -*******************************************************************************-


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


# -*******************************************************************************-
# Features
# -*******************************************************************************-


def calculate_bonus(age: int):
    if age < 18:
        return 0
    elif age >= 18 and age <= 30:
        return BASE_BONUS * 0.05
    elif age >= 31 and age <= 50:
        return BASE_BONUS * 0.08
    else:
        return BASE_BONUS * 0.12


def ask_user_for_ages():
    global bonuses_total
    ages_prompt = """
    Introduce la edad de la persona
    Edad: """
    while True:
        age = get_input(ages_prompt, int)
        print()

        ages_list.append(age)
        bonus = calculate_bonus(age)
        bonuses_total += bonus

        continue_asking_input = (
            input("¿Quieres añadir más edades? (si/no): ").lower().replace("í", "i")
        )
        print()

        valid_responses = ["si", "no"]
        is_valid_response = continue_asking_input in valid_responses
        if not is_valid_response:
            print("Respuesta invalida. No se preguntaran por más edades")
            print()
            break

        can_continue_asking = continue_asking_input == "si"
        if not can_continue_asking:
            break
    print(f"El total de las primas generadas es: {bonuses_total}")


def main():
    ask_user_for_ages()
    print(ages_list)


main()
