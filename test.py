import json


PATH = 'test_1.json'


def write(path, data):
    with open(path, 'w') as file:
        json.dump(data, file)


def read(path):
    with open(path, 'r') as file:
        return json.load(file)


objects = read(PATH)
print(objects)

object = objects[0]

for _ in range(999):
    objects.append(object)

write(PATH, objects)

objects = read(PATH)
print(len(objects))
