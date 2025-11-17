# Example1
def sum(num1,num2):
    print("Hello World")
    print(a + b)
a = int(input("Enter First Number:->"))
b = int(input("Enter Second Number:->"))=
sum(a,b)

# example2 args, kwargs
def train(*args):
    print("Model Train....",args)
train(1,2,3,4,5,6,7,8,9,10)

def train(**kwargs):
    print(kwargs) # {'name': 'A', 'age': 12}
    for value in kwargs.values():
        print(value) A,12
train(name = "A", age = 12)





