import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location, area_marla, bedrooms, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = bath
    x[1] = bedrooms
    x[2] = area_marla

    if loc_index >= 0:
        x[loc_index] = 1

    return f"{round(__model.predict([x])[0]):,}"

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations

    with open("../model/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

    global __model
    if __model is None:
        with open('../model/lahore_home_prices_model.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")


def get_location_names():
    return __locations


def get_data_columns():
    return __data_columns


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price("Al-Hamd Park, Lahore, Punjab", 15.0, 5, 4))
    print(get_estimated_price("Al-Hamd Park, Lahore, Punjab", 5.0, 3, 3))
    print(get_estimated_price("Tariq Gardens, Lahore, Punjab", 4.5, 2, 2))