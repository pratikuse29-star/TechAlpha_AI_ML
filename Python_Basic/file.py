from datetime import datetime

with open("info.txt", "r+") as f:
    old = f.read()
    f.seek(0)
    f.write(str(datetime.now()) + "\n" + old)
