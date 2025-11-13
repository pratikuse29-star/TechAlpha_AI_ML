try:
    num = 10/0
    print("In Try Block")
except Arithmatic Exception as e:
    print("Exception is->",e)
else:
    print("Code Running....")
finally:
    print("Always Runs...")
