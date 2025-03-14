import networkx as nx
import matplotlib.pyplot as plt


# Найти в заданном графе количество и состав
# компонент связности с помощью поиска в глубину

# Функция для выполнения поиска в глубину
def depth_search(_graph, start_node, visited_nodes=None):
    if visited_nodes is None:   # Если список посещенных узлов пуст, создаем новый
        visited_nodes = set()
    visited_nodes.add(start_node)   # Добавляем начальный узел в список посещенных
    for next_node in _graph[start_node] - visited_nodes:  # Перебираем все непосещенные соседние узлы
        depth_search(_graph, next_node, visited_nodes)  # Рекурсивно вызываем функцию для каждого из соседних узлов
    return visited_nodes


# Функция для поиска компонент связности в графе
def find_connected_components(_graph):
    visited_nodes = set()
    _components = []
    for node in _graph:  # Перебираем все узлы в графе
        if node not in visited_nodes:
            component = depth_search(_graph, node)  # Выполняем поиск в глубину
            visited_nodes.update(component)  # и добавляем узлы в список посещенных
            _components.append(component)    # Добавляем компоненту в список компонент
    return _components


# Функция для записи результатов в файл
def write_to_file(filename, components):
    with open(filename, 'w') as file:
        for component in components:
            # Записываем каждую компоненту на новую строку
            file.write(' '.join(map(str, component)) + '\n')


def draw_graph(graph):
    G = nx.Graph()
    n = len(graph)

    # Добавляем все вершины в граф
    G.add_nodes_from(range(n))

    # Добавляем ребра в граф
    for node, neighbors in graph.items():
        for neighbor in neighbors:
            # Добавляем ребро в граф
            G.add_edge(node, neighbor)

    nx.draw(G, with_labels=True)
    plt.show()


with open('graph.txt', 'r') as file:
    matrix = [list(map(int, line.split())) for line in file]

    graph = {i: set() for i in range(len(matrix))}
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == 1:
                graph[i].add(j)
    draw_graph(graph)

    components = find_connected_components(graph)   # Находим компоненты связности
    print('Connected components:', components)
