import random

startGame = True

def kockica() : 

    print("")
    print("--------------------KOCKICA---------------------")
    print("------------------------------------------------")

    userInput = input("Klinite 'Enter' da zapocnete igru.")

    while userInput != "":
        userInput = input("Klinite 'Enter' da zapocnete igru.")

    if userInput=="":
        botKockica = random.randrange(1, 7)
        igracKockica = random.randrange(1, 7)


        print(f"Vasa Kockica: {igracKockica}")
        print(f"Bot Kockica: {botKockica}")

        if botKockica > igracKockica:
            print("Pobjednik je : Bot!")
        elif igracKockica > botKockica:
            print("Vi ste pobjednik!")
        else:
            print("Nerješeno je!")

        print("------------------------------------------------")

def pogodiBroj():

    print("")
    print("------------------POGODI BROJ-------------------")
    print("------------------------------------------------")

    userInput = input("Klinite 'Enter' da zapocnete igru.")

    while userInput != "":
        userInput = input("Klinite 'Enter' da zapocnete igru.")

    if userInput == "":
        zamisljenBroj = random.randrange(1, 11)

        while True:
            pogodi = int(input("Unesite broj koji mislite da je program zamislio od 1 do 10 : "))

            if pogodi == zamisljenBroj:
                print("Pogodili ste. Cestitamo!")
                break
            elif pogodi > zamisljenBroj:
                print("Zamisljeni broj je manji od vaseg broja")
            elif pogodi < zamisljenBroj:
                print("Zamisljen broj je veci od vaseg broja")
            elif pogodi < 1 or pogodi > 10:
                print("Molimo vas, samo brojevi od 1 do 10.")

    print("------------------------------------------------")
    

while startGame == True:

    print("------------------------------------------------")
    print("Izaberite koju igricu zelite igrati ")
    print("1. Kockica")
    print("2. Pogodi broj!")
    print("0. Ugasi program!")
    print("------------------------------------------------")



    izabirIgre = int(input("Unesite odabir : "))


    while True:

        if izabirIgre == 1:
            kockica()
            break
        elif izabirIgre == 2:
            pogodiBroj()
            break
        elif izabirIgre == 0:
            exit()
        else: 
            while izabirIgre not in {1,2,0}:
                izabirIgre = int(input("Unesite odabir : "))