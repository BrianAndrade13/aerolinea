import json
import os

from pasajero import Pasajero

CARPETA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
ARCHIVO = os.path.join(CARPETA, "reservas.json")
EJEMPLO = os.path.join(CARPETA, "ejemplo.json")

# numero de reserva que se le da al proximo pasajero
siguiente_numero = 1001


# lee el json y mete cada pasajero a la lista, si no existe reservas.json usa ejemplo.json
def cargar(lista, ruta=ARCHIVO):
    global siguiente_numero
    if not os.path.exists(ruta):
        ruta = EJEMPLO

    with open(ruta, "r", encoding="utf-8") as archivo:
        contenido = json.load(archivo)

    for d in contenido["reservas"]:
        pasajero = Pasajero(d["numero"], d["nombre"], d["cedula"], d["edad"], d["asiento"])
        lista.ingresar(pasajero)

    siguiente_numero = contenido["siguiente_numero"]


# recorre la lista y escribe todo en reservas.json
def guardar(lista):
    reservas = []
    actual = lista.head
    while actual is not None:
        reservas.append(actual.data.a_diccionario())
        actual = actual.next
        # por si un nodo quedara apuntando a si mismo y el while nunca termine
        if len(reservas) > 1000:
            raise RuntimeError("La lista no termina nunca: ¿un nodo se apunta a sí mismo?")

    contenido = {"siguiente_numero": siguiente_numero, "reservas": reservas}
    os.makedirs(CARPETA, exist_ok=True)

    with open(ARCHIVO, "w", encoding="utf-8") as archivo:
        json.dump(contenido, archivo, ensure_ascii=False, indent=2)


# entrega un numero de reserva que no se haya usado
def nuevo_numero():
    global siguiente_numero
    numero = siguiente_numero
    siguiente_numero = siguiente_numero + 1
    return numero


# vuelve a los 12 pasajeros de ejemplo
def restaurar(lista):
    lista.head = None
    lista.cantidad = 0
    cargar(lista, EJEMPLO)
    guardar(lista)
