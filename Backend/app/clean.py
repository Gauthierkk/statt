# filters out all but the defined columns in getKeyValues. Also changes the date format to YYYY-MM-DD
def clean(data) -> list:
    cleaned_data = []

    for row in data:
        cleaned_row = {}
        for key in getKeyValues().keys():
            if key not in row:
                cleaned_row[key] = "no data"
            elif key == "issue_date":
                cleaned_row[key] = row[key][:10]
            else:
                cleaned_row[key] = row[key]
        cleaned_data.append(cleaned_row)

    return cleaned_data


# returns pre-defined list of key values, used to determine which columns to visualize in frontend
def getKeyValues() -> list:
    keyValues = {
        "permittype": "Permit Type",
        "permit_type_desc": "Permit Type Description",
        "permit_number": "Permit Number",
        "permit_class": "Permit Class",
        "work_class": "Work Class",
        "issue_date": "Issue Date",
        "permit_location": "Permit Location",
        "description": "Description",
    }
    return keyValues
