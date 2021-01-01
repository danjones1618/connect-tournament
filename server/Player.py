class Player:
    def __init__(self, name, ws):
        self.name = name
        self.ws = ws

    def __str__(self):
        return f"(Player: {self.name})"

    def __repr__(self):
        return f"(Player: {self.name})"
