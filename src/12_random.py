import random

with open("input_to_sort.txt", "w") as f:
    for _ in range(1000):
            f.write(f"{random.randint(1, 10000)}\n")