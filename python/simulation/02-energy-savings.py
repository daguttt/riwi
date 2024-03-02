def calculate_annual_energy_savings(changed_bulbs_number: int, daily_energy_usage_in_hours: int = 12, kilowatt_cost_hour: int = 150):
    vi = 230
    vl = 3.5
    bulb_active_days = 365
    return ((vi - vl) * daily_energy_usage_in_hours * bulb_active_days * kilowatt_cost_hour) * changed_bulbs_number


def main():
    try:
        changed_bulbs_number = int(
            input("Introduce el número de bombillas cambiadas: "))
        daily_energy_usage = int(
            input("Introduce el uso diario promedio de las bombillas en horas: "))
        kilowatt_cost_hour = int(
            input("Introduce el costo por kWh en tu localidad: "))
    except ValueError:
        print("Has ingresado un valor erróneo.")
    annual_savings = calculate_annual_energy_savings(
        changed_bulbs_number=changed_bulbs_number,
        daily_energy_usage_in_hours=daily_energy_usage,
        kilowatt_cost_hour=kilowatt_cost_hour
    )
    print(f"El ahorro anual estimado es {annual_savings}")


main()
