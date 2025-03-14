"""
Эйлеров цикл в графе - это путь, который проходит через каждое
ребро графа ровно один раз и возвращается в исходную вершину.
Граф содержит Эйлеров цикл тогда и только тогда, когда степень
каждой вершины является четным числом.

Алгоритм:
1.  Инициализируем пустой стек и путь. Добавляем в стек произвольную вершину графа.
2.  Пока стек не пуст, берем вершину из вершины стека и ищем смежную вершину.
    Если находим, добавляем ее в стек и удаляем ребро между этими вершинами. Если
    не находим, добавляем вершину в путь и удаляем из стека.
3.  После того как стек становится пустым, все вершины графа будут в пути.
    Однако, поскольку мы добавляли вершины в путь после того, как они
    становились изолированными, путь будет в обратном порядке.
    Поэтому мы переворачиваем путь, чтобы получить Эйлеров цикл.

Если в графе нет Эйлерова цикла, то алгоритм вернет путь, который проходит
через некоторые ребра графа. Этот путь не будет циклом, так как он не
вернется в исходную вершину."""


def find_euler_cycle(adj_matrix_):
    # Список, где будем хранить путь
    cycle = []
    # Находим стартовую вершину
    start_vertex = 0
    # Создаем копию матрицы смежности, чтобы не изменять оригинал
    adj_matrix_copy = [row for row in adj_matrix_]
    while True:
        # Получаем список возможных следующих вершин
        next_vertices = find_next_vertexes(adj_matrix_copy, start_vertex)
        if not next_vertices:
            # Если список пуст, то мы нашли эйлеров цикл
            break
        # Если следующая вершина только одна, то добавляем её в путь
        if len(next_vertices) == 1:
            cycle.append(next_vertices[0])
        else:
            # Если следующих вершин несколько, то выбираем любую
            # и добавляем её в путь
            cycle.append(next_vertices[0])
        # Удаляем ребро между последней добавленной вершиной и новой вершиной
        if len(cycle) > 1:
            adj_matrix_copy[cycle[-1]][cycle[-2]] = 0
            adj_matrix_copy[cycle[-2]][cycle[-1]] = 0

        # Обновляем start_vertex
        start_vertex = next_vertices[0]

        if all(all(v == 0 for v in row) for row in adj_matrix_copy):
            break
    if cycle[0] != cycle[-1]:
        return False
    return cycle


def find_next_vertexes(adj_matrix_, vertex):
    """Получаем список возможных следующих вершин"""
    next_vertices = []
    for i in range(len(adj_matrix_[vertex])):
        if adj_matrix_[vertex][i] == 1:
            # Если ребро существует, добавляем вершину в список
            next_vertices.append(i)
    return next_vertices


# Открываем файл и читаем граф
file = open('matrix_adj.txt', 'r')
adj_matrix = [[int(num) for num in line.split()] for line in file]
file.close()

# Находим эйлеров цикл
euler_cycle = find_euler_cycle(adj_matrix)

# Вывод результата
if euler_cycle:
    print("Эйлеров цикл в графе состоит из следующих вершин:")
    print(' '.join(map(str, [v for v in euler_cycle])))
else:
    print('Для данного графа нет Эйлерова цикла')


import networkx as nx
import numpy as np
import matplotlib.pyplot as plt

matrix_g = np.loadtxt('matrix_adj.txt')
# Создаем граф из матрицы смежности
graph_to_show = nx.from_numpy_array(matrix_g)
# Рисуем граф
nx.draw(graph_to_show, with_labels=True)
plt.show()
