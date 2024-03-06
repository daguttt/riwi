animals_to_study = ["elefantes", "jirafas", "chimpances"]
samples_per_animal = {
    animals_to_study[0]: 20,
    animals_to_study[1]: 15,
    animals_to_study[2]: 40,
}

age_categories = [
    {
        "name": "Categoria 1",
        "description": "De 0 a 1 año",
    },
    {
        "name": "Categoria 2",
        "description": "Más de 1 año y menos de 3",
    },
    {
        "name": "Categoria 3",
        "description": "3 o más años",
    },
]

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


def print_message(message: str = ""):
    if message:
        print()
        print(message)
    print()
    input("Presiona enter para continuar...\n")


def list_animals():
    animal_list_str = [
        f"\t{index + 1}. {animal}" for index, animal in enumerate(animals_to_study)
    ]
    return "\n".join(animal_list_str)


def get_percentage(total_number: int, number_to_compare: int):
    # total_number      -> 100%
    # number_to_compare -> x
    return number_to_compare * 100 / total_number


# -*******************************************************************************-
# Features
# -*******************************************************************************-


def ask_animal_amount_per_category(animal_sample: int):
    error_message = ""
    animal_study_list_per_category = []

    for category in age_categories:
        print(f"*********** {category['name']} ***********")

        animals_with_patology_amount = get_input(
            f"""
    Ingresa el número de animales con patología para la categoria:
    {category['description']}

    Número de animales con patologia (entre 1 y {animal_sample}): """,
            int,
        )
        print()

        is_invalid_amount = (
            animals_with_patology_amount > animal_sample
            or animals_with_patology_amount < 1
        )
        if is_invalid_amount:
            error_message = "El numero de animales ingresados es erroneo o no está disponible en la muestra."
            break

        animals_percentage_with_patology = get_percentage(
            total_number=animal_sample, number_to_compare=animals_with_patology_amount
        )
        healthy_animals_percentage = 100 - animals_percentage_with_patology

        study = {
            "category": f'{category["name"]}: {category["description"]}',
            "percentages": (
                animals_percentage_with_patology,
                healthy_animals_percentage,
            ),
        }
        animal_study_list_per_category.append(study)

    return (error_message, animal_study_list_per_category)


def ask_animal_to_study():
    selected_animal_prompt = f"""
    Selecciona el animal a estudiar:
{list_animals()}

    Número: """
    selected_animal_number = get_input(selected_animal_prompt, int)
    print()

    is_invalid_animal_number = (
        selected_animal_number > len(animals_to_study) or selected_animal_number < 1
    )
    if is_invalid_animal_number:
        return print_message("El número seleccionado no representa un animal")

    selected_animal = animals_to_study[selected_animal_number - 1]
    animal_sample = samples_per_animal[selected_animal]

    error_message, animal_study_list_per_category = ask_animal_amount_per_category(
        animal_sample
    )
    if error_message:
        return print_message(error_message)

    for study in animal_study_list_per_category:
        message = f"""
    En la {study["category"]}.
    El porcentaje de {selected_animal} con patología es: {study["percentages"][0]}%
    El porcentaje de {selected_animal} sanos es: {study["percentages"][1]}%
        """
        print(message)


def main():
    ask_animal_to_study()


main()
