tables = [
    {"name": "mesa 1", "state": "disponible"},
    {"name": "mesa 2", "state": "disponible"},
    {"name": "mesa 3", "state": "no disponible"},
    {"name": "mesa 4", "state": "disponible"},
]

user_input = "3"

for index, table in enumerate(tables):
    if table["name"] == f"mesa {user_input}":

        print(f"Initial {id(table)} state: '{table['state']}'", )

        table["state"] = "disponible"
        table.update({"state": "disponible"})
        # tables[index]["state"] = "disponible"
        

        # tables[index]["state"] = "no disponible"

        table_ref = tables[index]
        table_ref["state"] = "no disponible"

        print(table is table_ref)
        print(id(table) == id(table_ref))
        print(id(table), id(table_ref))

        print(f"Final {id(table)} state: '{table['state']}'", )
        break



