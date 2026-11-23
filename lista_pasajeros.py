from pasajero import Pasajero


# cada nodo guarda un pasajero y apunta al siguiente nodo
class Nodo:

    def __init__(self, data):
        self.data = data
        self.next = None


# lista enlazada simple: los pasajeros quedan en el orden en que reservaron
class ListaPasajeros:

    def __init__(self):
        self.head = None        # primer nodo, None cuando no hay reservas
        self.cantidad = 0

    # agrega un pasajero al final de la lista
    def ingresar(self, pasajero):
        nuevo = Nodo(pasajero)

        if self.head is None:
            self.head = nuevo
        else:
            actual = self.head
            while actual.next is not None:      # avanzo hasta el ultimo nodo
                actual = actual.next
            actual.next = nuevo

        self.cantidad = self.cantidad + 1
        return True

    def esta_vacia(self):
        return self.head is None

    def longitud(self):
        return self.cantidad

    # devuelve una list de python con todos los pasajeros, de head hasta el final
    def listar(self):
        pasajeros = []
        actual = self.head
        while actual is not None:
            pasajeros.append(actual.data)
            actual = actual.next
        return pasajeros

    # busqueda lineal por numero de reserva
    def buscar(self, numero):
        actual = self.head
        while actual is not None:
            if actual.data.numero == numero:
                return actual.data
            actual = actual.next
        return None

    def buscar_por_asiento(self, asiento):
        actual = self.head
        while actual is not None:
            if actual.data.asiento == asiento:
                return actual.data
            actual = actual.next
        return None

    def buscar_por_cedula(self, cedula):
        actual = self.head
        while actual is not None:
            if actual.data.cedula == cedula:
                return actual.data
            actual = actual.next
        return None

    # el nodo no cambia de lugar, solo cambian los datos del pasajero
    def modificar(self, numero, nuevo_nombre, nueva_edad, nuevo_asiento):
        actual = self.head
        while actual is not None:
            if actual.data.numero == numero:
                actual.data.nombre = nuevo_nombre
                actual.data.edad = nueva_edad
                actual.data.asiento = nuevo_asiento
                return True
            actual = actual.next
        return False

    # desengancha el nodo: puede ser la cabeza, uno del medio, el ultimo o no existir
    def eliminar(self, numero):
        actual = self.head
        anterior = None
        while actual is not None:
            if actual.data.numero == numero:
                if anterior is None:            # era la cabeza
                    self.head = actual.next
                else:                           # estaba en medio o al final
                    anterior.next = actual.next
                self.cantidad -= 1
                return actual.data
            anterior = actual
            actual = actual.next
        return None

    # clase es "Ejecutiva" o "Economica", se compara con pasajero.clase()
    def filtrar_por_clase(self, clase):
        actual = self.head
        pasajeros_filtrados = []
        while actual is not None:
            if actual.data.clase() == clase:
                pasajeros_filtrados.append(actual.data)
            actual = actual.next
        return pasajeros_filtrados
