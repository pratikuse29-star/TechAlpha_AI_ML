# try:
#     num = 10/0
#     print("In Try Block")
# except Arithmatic Exception as e:
#     print("Exception is->",e)
# else:
#     print("Code Running....")
# finally:
#     print("Always Runs...")

try:
    result = 10 / 0
    print("Result:", result)

except ZeroDivisionError:
    print("Error occurred!")

except TypeError:
    print("Error occurred!")

except Exception as e:
    print("E is->", e)

else:
    print("Successful execution — NO errors!")

finally:
    print("Finally block ran")



