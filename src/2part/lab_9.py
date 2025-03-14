"""Алгоритм проходит по всем ребрам графа и "расслабляет" их.
Релаксация ребра - это процесс обновления минимального известного расстояния
до конечной вершины ребра, если текущее известное расстояние больше, чем
расстояние до начальной вершины ребра плюс вес ребра."""

# Открываем файл и читаем граф
file = open('matrix.txt', 'r')
graph = [[int(num) for num in line.split()] for line in file]
file.close()

# Инициализируем начальную вершину и расстояния
start_vertex = 0
D = [float('inf')] * len(graph)
D[start_vertex] = 0

# Создаем список ребер графа. Для каждой пары вершин (u, v), если вес ребра не равен 0,
# добавляем в список кортеж (u, v, graph[u][v]), где graph[u][v] - это вес ребра.
edges = [(u, v, graph[u][v]) for u in range(len(graph)) for v in range(len(graph)) if graph[u][v] != 0]

# Реализуем алгоритм Беллмана-Форда
for _ in range(len(graph) - 1):  # Проходим по всем вершинам графа n-1 раз
    for u, v, w in edges:  # Для каждого ребра (u, v) с весом w
        if D[u] + w < D[v]:  # Если расстояние до u + w короче, чем текущее известное расстояние до v
            D[v] = D[u] + w  # Обновляем расстояние до вершины v


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
