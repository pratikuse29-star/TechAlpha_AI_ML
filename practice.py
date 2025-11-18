####### Example2: Finding the minmum numbers #####
def funf(*numbers):
    if len(numbers) == 0:
        return None
    min_num = numbers[0]
    for num in numbers:
        if num < min_num:
            min_num = num
        return min_num
print(funf(87, 0, -12, 90))
#output: 87 #now
