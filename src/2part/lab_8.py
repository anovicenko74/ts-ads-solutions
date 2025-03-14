"""
В алгоритме Дейкстры из всех непосещенных вершин выбирается
вершина с минимальным известным расстоянием. Затем для всех соседей
этой вершины проверяется, будет ли путь до них через текущую вершину
короче текущего известного расстояния. Если да, то обновляется
расстояние до этого соседа. После этого текущая вершина помечается
как посещенная и больше не рассматривается. Эти действия повторяются,
пока все вершины не будут посещены."""

# Открываем файл и читаем граф
file = open('matrix.txt', 'r')
graph = [[int(num) for num in line.split()] for line in file]
file.close()

# Инициализируем начальную вершину и расстояния
start_vertex = 0
D = [float('inf')] * len(graph)  # длина до каждой вершины - бесконечность
D[start_vertex] = 0

# Создаем список непосещенных вершин
unvisited = list(range(len(graph)))

while unvisited:  # Пока есть непосещенные вершины
    current_vertex = min(unvisited,  key=lambda vertex: D[vertex])  # Выбираем вершину с минимальным расстоянием
    unvisited.remove(current_vertex)  # Удаляем выбранную вершину из списка непосещенных

    for neighbor, distance in enumerate(graph[current_vertex]):  # Для каждого соседа текущей вершины
        if distance > 0:
            old_distance = D[neighbor]  # Старое расстояние до соседа
            new_distance = D[current_vertex] + distance  # Новое расстояние до соседа через текущую вершину
            if new_distance < old_distance:  # Если новое расстояние меньше старого
                D[neighbor] = new_distance  # Обновляем расстояние до соседа

# Выводим расстояния
for i, distance in enumerate(D):
    if i != start_vertex:
        print('Расстояние от вершины {} до {} = {}'.format(start_vertex, i, distance))


import matplotlib.pyplot as plt
import networkx as nx

# Создаем граф с помощью библиотеки networkx
G = nx.Graph()
for i in range(len(graph)):
    for j in range(i, len(graph)):
        if graph[i][j] != 0:
            G.add_edge(i, j, weight=graph[i][j])

# Рисуем граф с помощью библиотеки matplotlib
pos = nx.spring_layout(G)
nx.draw(G, pos, with_labels=True)
labels = nx.get_edge_attributes(G, 'weight')
nx.draw_networkx_edge_labels(G, pos, edge_labels=labels)
plt.show()
