#using open weather API to get weather data
import requests

def getWeather(city):
    key = "1f6e1cfcec0147bb3d657685e0881a06"
    url = "http://api.openweathermap.org/data/2.5/weather"
    parameter = {'APPID':key,'q':city, 'units':'imperial'}
    response = requests.get(url,params = parameter)
    weather = response.json()
    lowT, highT = printout(weather)
    return lowT, highT

def printout(weather):

    name = weather['name']
    description = weather['weather'][0]['description']
    tempMin = weather['main']['temp_min']
    tempMax = weather['main']['temp_max']
    country = weather['sys']['country']
    final_str = "Country: %s \nCity: %s\nConditions: %s \nLow temperature (F): %s\nHigh temperature (F): %s"\
            %(country, name, description, tempMin, tempMax)
    print(final_str)
    lowT = float(tempMin)
    highT = float(tempMax)
    return lowT, highT

