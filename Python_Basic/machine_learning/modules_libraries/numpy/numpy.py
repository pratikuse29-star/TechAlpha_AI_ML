# Comparision Between List and Numpy Arrays

import numpy as np
import time

# Create large data
size = 10000000  # 1 crore elements
py_list = list(range(size))
print(py_list)
# np_arr = np.arange(size)

# Python list speed
start = time.time()
py_list_result = [x + 1 for x in py_list]
end = time.time()
list_time = end - start
print("Python List Time:", list_time)

# NumPy array speed
start = time.time()
np_arr_result = np_arr + 1   # vectorized
end = time.time()
numpy_time = end - start
print("NumPy Array Time:", numpy_time)

print("NumPy is faster by:", list_time / numpy_time, "times")
