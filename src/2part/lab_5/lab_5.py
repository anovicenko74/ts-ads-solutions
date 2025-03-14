import networkx as nx
import matplotlib.pyplot as plt


# 5. Найти в заданном орграфе количество и состав сильно связных компонент с помощью поиска в глубину:
def depth_first_search_with_stack(graph, start_node, visited_nodes, stack):
    visited_nodes.add(start_node)   # Добавляем начальный узел в список посещенных
    for neighbor in graph[start_node]:  # Перебираем все соседние узлы
        if neighbor not in visited_nodes:   # Если соседний узел еще не был посещен
            # Рекурсивно вызываем функцию для каждого из соседних узлов
            depth_first_search_with_stack(graph, neighbor, visited_nodes, stack)

    # Добавляем узел в стек
    stack.append(start_node)
    return stack


# Функция для транспонирования графа
def transpose_graph(graph):
    transposed_graph = {node: set() for node in graph}  # Создаем новый граф с теми же узлами, что и исходный
    for node in graph:  # Перебираем все узлы в исходном графе
        for neighbor in graph[node]:    # Перебираем все соседние узлы
            # Добавляем узел в список соседей для соседнего узла в транспонированном графе
            transposed_graph[neighbor].add(node)
    return transposed_graph


# Функция для поиска сильно связных компонент в графе
def find_strongly_connected_components(graph):
    stack = []
    visited_nodes = set()
    for node in graph:  # Перебираем все узлы в графе
        if node not in visited_nodes:   # Если узел еще не был посещен
            # Выполняем поиск в глубину и добавляем узлы в стек
            depth_first_search_with_stack(graph, node, visited_nodes, stack)

    # Транспонируем граф
    transposed_graph = transpose_graph(graph)

    visited_nodes = set()
    strongly_connected_components = []
    while stack:    # Пока стек не пуст
        node = stack.pop()  # Извлекаем узел из стека
        if node not in visited_nodes:   # Если узел еще не был посещен
            # Выполняем поиск в глубину и добавляем узлы в список сильно связных компонент
            component = depth_first_search_with_stack(transposed_graph, node, visited_nodes, [])
            strongly_connected_components.append(set(component))
    return strongly_connected_components


def draw_graph(graph):
    G = nx.DiGraph()
    n = len(graph)

    G.add_nodes_from(range(n))

    for node, neighbors in graph.items():
        for neighbor in neighbors:
            G.add_edge(node, neighbor)

    pos = nx.spring_layout(G, k=0.7)
    nx.draw(G, pos, with_labels=True)
    plt.show()


# Читаем матрицу смежности из файла
with open('orgraph.txt', 'r') as file:
    matrix = [list(map(int, line.split())) for line in file]

    graph = {i: set() for i in range(len(matrix))}
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == 1:
                graph[i].add(j)
    draw_graph(graph)

    # Находим сильно связные компоненты
    components = find_strongly_connected_components(graph)
    print('Strongly connected components:', components)

