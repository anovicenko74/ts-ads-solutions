import queue
import matplotlib.pyplot as plt
import networkx as nx


# Найти в заданном графе кратчайшие пути
# из заданной вершины до всех остальных вершин
# с помощью поиска в ширину
def shortest_paths(graph, start_vertex):
    n = len(graph)
    distances = [-1 for _ in range(n)]  # Создаем список расстояний и заполняем его -1,
                                        # которые будут означать "неизвестное расстояние"
    distances[start_vertex] = 0  # Расстояние от начальной вершины до себя равно 0
    q = queue.Queue()
    q.put(start_vertex)  # Добавляем начальную вершину в очередь

    while not q.empty():  # Пока очередь не пуста
        vertex = q.get()  # Извлекаем вершину из очереди
        for i in range(n):  # Для каждой вершины в графе
            if graph[vertex][i] == 1 and distances[i] == -1:  # Если вершина смежна с текущей и
                                                              # ее расстояние еще не известно
                distances[i] = distances[vertex] + 1  # Обновляем расстояние до этой вершины
                q.put(i)  # Добавляем эту вершину в очередь

    return distances  # Возвращаем список расстояний


# Найти в заданном графе количество и состав
# компонент связности с помощью поиска в ширину
def connected_components(graph):
    n = len(graph)
    visited = [False for _ in range(n)]
    components = []

    for start_vertex in range(n):
        if not visited[start_vertex]:
            component = []
            q = queue.Queue()
            q.put(start_vertex)
            visited[start_vertex] = True

            while not q.empty():
                vertex = q.get()
                component.append(vertex)

                for i in range(n):
                    if graph[vertex][i] == 1 and not visited[i]:
                        q.put(i)
                        visited[i] = True

            components.append(component)

    return components


def draw_graph(graph):
    G = nx.Graph()
    n = len(graph)

    # Добавляем все вершины в граф
    G.add_nodes_from(range(n))

    # Добавляем ребра в граф
    for i in range(n):
        for j in range(i, n):
            if graph[i][j] == 1:
                G.add_edge(i, j)

    nx.draw(G, with_labels=True)
    plt.show()


with open('../lab_4/graph.txt', 'r') as graph_file:
    graph_m = [list(map(int, line.split())) for line in graph_file]

    print("Shortest paths:", shortest_paths(graph_m, 0))
    print("Connected components:", connected_components(graph_m))

    draw_graph(graph_m)
