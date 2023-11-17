import re
import json

file_ = open("server/storage.json", "rb")
config = json.load(file_)
file_.close()


def validateId(text):
    # Define a regular expression pattern to match special characters and whitespace
    pattern = r'[^a-zA-Z0-9\s]'  # This pattern matches anything that is not a letter, digit, or whitespace

    # Use the sub function to replace matched characters with an empty string
    cleaned_text = re.sub(pattern, '', text).replace(" ", "")

    return cleaned_text


def write_json(path: str, data):
    try:
        with open(path, "w") as outfile:
            json.dump(data, outfile, indent=4)
    except Exception as e:
        print("There is an error in write_json function")
        print(e)


def change_json(path: str, data, keys):
    dataJson = read_json(path)
    dataJson[keys] = data
    write_json(path, dataJson)


def push_json(path: str, data, keys):
    try:
        dataJson = read_json(path)
        dataJson[keys].append(data)
        write_json(path, dataJson)
    except Exception as e:
        print("There is an error in push Data Json ")


def delete_json(path: str, data: list[int], keys):
    try:
        dataJson = read_json(path)

        for temp in data:
            dataJson[keys].pop(temp)
        write_json(path, dataJson)
    except Exception as e:
        print(e)


def read_json(path: str):
    """
    :param path: string
    :return: data
    """
    try:
        file_json = open(path, "rb")
        jsonObject_ = json.load(file_json)
        file_.close()
        return jsonObject_
    except Exception as e:
        print("There is an error in write_json function")
        print(e)


def validateFormData(formData, keys):
    """
    To validate if in form data contains all keys necessary
    :param formData: list     :param keys:
    :return: nothing if it's not wrong anything
    """
    for key in keys:
        if key not in formData or formData[key] is None:
            assert f'Missing information {key} not in formData or {key} is None'


def compareStrDate(fs: str, sc: str) -> int:
    """
    compare 2 input string of date and time
    :param fs: first element to compare
    :param sc: second element to compare
    :return:
    -1: fs < sc
    0: equal
    1: fs > sc
    """
    fs = int(fs)
    sc = int(sc)
    if fs == sc:
        return 0
    elif fs > sc:
        return 1
    else:
        return -1
