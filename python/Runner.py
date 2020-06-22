from getData import *

def main():
    city = input("What city are you in:")
    try:
        lowT, highT = getWeather(city)
        getClothes(lowT, highT)
    except:
        print('Something went wrong')
    
def getClothes(tempL, tempH):
    bottom = getBottom(tempL, tempH)
    tops = getTops(tempL, tempH)
    print('Your bottom options: ', bottom)
    print('Your top options: ', tops)

def getBottom(tempL, tempH):
    bottoms = ["shorts", "light pants/joggers", "heavy pants/joggers"]
    if tempH >= 70:
        bottom = bottoms[0]
    elif tempL >= 40:
        bottom = bottoms[1]
    else:
        bottom = bottoms[2]

    return bottom

def getTops(tempL, tempH):
    tops = ['short-sleeve T', 'long-sleeve T', 'hoodie/sweatshirt', 'jacket', 'coat']
    topn = [5, 8, 15, 18, 38]
    if tempL >= 72:
        return tops[0]

    comfort = 78
    temp = comfort - tempL
    choice = getLayers(temp, topn)
    choices = choice.split()
    options = []
    for k in choices:
        options.append(tops[int(k)])

    if (len(options) == 1 and options[0] == 'coat'):
        options[0] = 'short-sleeve T'
        options.append('coat')

    if (len(options) == 1 and options[0] == 'jacket'):
        options[0] = 'short-sleeve T'
        options.append('jacket')

    if (options.count('coat') > 1):
        options[options.index('coat')] = 'jacket'

    if (options.count('jacket') > 1):
        options[options.index('jacket')] = 'hoodie/sweatshirt'

    if ('short-sleeve T' in options and 'long-sleeve T' in options):
        options.remove('short-sleeve T')
        options[0] = 'hoodie/sweatshirt'
    return options
    
def getLayers(temp, topn):
    check = False
    output = ''
    while(temp >= 5):
        for i in range(0, len(topn)):
            if (temp >= topn[len(topn)-1-i]):
                output =  str(len(topn)-1-i) + ' ' + output
                temp = temp - topn[len(topn)-1-i]
                check = True
                break
        if check == False:
            output =  str(0) + ' ' + output
    output = output.strip()
    return output
    
if __name__ == '__main__':
    main()
