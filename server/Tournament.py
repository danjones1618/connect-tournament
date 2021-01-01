class Tournament:
    def __init__(self, host):
        self.host = host
        self.players = {host}
        self.round = 0

    def addPlayer(self, player):
        self.players.add(player)

    def isPlayerNameTaken(self, name):
        for p in self.players:
            if p.name is name:
                return True
        return False
