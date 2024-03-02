from typing import Literal


def convert_temperature(temperature: int, target_unit: Literal["C", "F"]):
    if target_unit == "C":
        return (temperature - 32) * (5 / 9)
    else:
        return (temperature * (9 / 5)) + 32


def main():
    temperature = int(input("Introduce la temperatura que deseas convertir: "))
    unit_prompt = """
    Selecciona la unidad a la que quieres convertir: 
    Farenheit (F)
    Celsius (C)
    Unidad: """
    target_unit = input(unit_prompt).upper()

    result = convert_temperature(
        temperature=temperature, target_unit=target_unit)

    inverse_unit = "C" if target_unit == "F" else "F"
    print(f"{temperature}°{inverse_unit} is {result}°{target_unit}")


main()
