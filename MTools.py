import os

os.system('clear')

black="\033[0;30m"
red="\033[0;31m"
green="\033[0;32m"
yellow="\033[0;33m"  
blue="\033[0;34m"
purple="\033[0;35m"
cyan="\033[0;36m"
white="\033[0;37m"

MTools = """
 ███╗░░░███╗░░░░░░████████╗░█████╗░░█████╗░██╗░░░░░ 
 ████╗░████║░░░░░░╚══██╔══╝██╔══██╗██╔══██╗██║░░░░░ 
 ██╔████╔██║█████╗░░░██║░░░██║░░██║██║░░██║██║░░░░░ 
 ██║╚██╔╝██║╚════╝░░░██║░░░██║░░██║██║░░██║██║░░░░░ 
 ██║░╚═╝░██║░░░░░░░░░██║░░░╚█████╔╝╚█████╔╝███████╗ 
 ╚═╝░░░░░╚═╝░░░░░░░░░╚═╝░░░░╚════╝░░╚════╝░╚══════╝
"""

Abox = """
=============================================================
* Düwüp bilýän faýllary : .nm / .tnl / .pb / .ziv
* Coded By              : 𝑨𝒎𝒂𝒏𝒐𝒇𝒇 𝑶𝒇𝒇𝒊𝒄𝒊𝒂𝒍
* Telegram              : t.me/Official_amanoff
=============================================================\nBuýrugy saýlaň : 
"""



def menu():
    os.system('clear')
    print(red + MTools + cyan + Abox)
    print(" [1.] NetMod Syna")
    print(" [2.] OpenTunnel")
    print(" [3.] PB Injector")
    print(" [4.] ZIV VPN")
    print(" [0.] Skript-dan çykmak üçin")

    choice = input("\n ~~> ")
    return choice

def run_script_python(script_name):
    print("Haýyş Garaşyň !!!")
    os.system("python " + script_name)
    input("\n𝗠𝗘𝗡𝗨 𝗚𝗜𝗧𝗠𝗘𝗞 𝗨𝗖𝗜𝗡 𝗘𝗡𝗧𝗘𝗥 𝗕𝗔𝗦")
    
def run_script_nodejs(script_name):
    print("Haýyş garaşyň !!!")
    os.system("node " + script_name)
    input("\n𝗠𝗘𝗡𝗨 𝗚𝗜𝗧𝗠𝗘𝗞 𝗨𝗖𝗜𝗡 𝗘𝗡𝗧𝗘𝗥 𝗕𝗔𝗦")


def main():
    while True:
        choice = menu()

        if choice == "1":
            run_script_python("M/NM.py")
        elif choice == "2":
            run_script_nodejs("M/OT.js")
        elif choice == "3":
            run_script_nodejs("M/PB.js")
        elif choice == "4":
            run_script_nodejs("M/ZIV.js")
        elif choice == "0":
            os.system('clear')
            print("Skript öçürildi. \nTäze moduly ullananyňyz üçin sagboluň! \n- H.Z.M DEV TEAM - \n")
            
            break
        else:
            print("Ýalňyş buýruk!\n Haýyş etýän menýudakylary saýlaň")

if __name__ == "__main__":
    main()
