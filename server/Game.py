from Actions import Actions
from Util import sendAction, recvAction
import regex as re
import math

class Game:
    def __init__(self, ws1, ws2):
        self.boardWidth = 9
        self.boardHeight = 6
        self.ws1 = ws1
        self.ws2 = ws2
        self.turn = 0
        self.board = [0 for i in range(self.boardWidth * self.boardHeight)]

    def canPlaceToken(self, index):
        x = index % self.boardWidth
        y = math.floor(index / self.boardWidth)
        return self.board[index] == 0 and \
            (y ==
             self.boardHeight or self.board[x + (y + 1) * self.boardWidth] == 0)

    def getWsForTurn(self):
        if self.turn % 2 == 0:
            return self.ws1
        else:
            return self.ws2

    def getWinner(self):
        s = "".join(map(str, self.board))
        # Row, Col, Forward Diag, Backwards Diag
        exps = [
            '(1){4}|(2){4}',
            '(?:1.{{{}}}){3}(1)|(?:2.{{{}}}){3}(2)'.format(
                self.boardWidth-1, self.boardWidth-1),
            '(?:1.{{{}}}){3}(1)|(?:2.{{{}}}){3}(2)'.format(
                self.boardWidth, self.boardWidth),
            '(?:1.{{{}}}){3}(1)|(?:2.{{{}}}){3}(2)'.format(
                self.boardWidth-2, self.boardWidth-2)
        ]
        for exp in exps:
            r = re.compile(exp)
            match = r.search(s)
            if match:
                return 1 if match.group(1) else 2
        return None

    async def game(self):
        while self.turn < self.boardWidth * self.boardHeight:
            ws = self.getWsForTurn()

            await sendAction(ws, Actions.TAKE_TURN)
            msg = await recvAction(ws)
            if msg["type"] != Actions.TURN_COMPLETE:
                # TODO handle this error
                print("ERROR: expected to recv turn complete")

            if not self.canPlaceToken(msg["index"]):
                await sendAction(ws, Actions.INVALID_TURN)
                continue

            self.board[msg["index"]] = 1 if ws == self.ws1 else 2
            await sendAction(self.ws1, Actions.UPDATE_BOARD, {"board": self.board})
            await sendAction(self.ws2, Actions.UPDATE_BOARD, {"board": self.board})

            winner = self.getWinner()
            if winner:
                if winner == 1:
                    await sendAction(self.ws1, Actions.WON)
                    await sendAction(self.ws2, Actions.LOST)
                else:
                    await sendAction(self.ws1, Actions.LOST)
                    await sendAction(self.ws2, Actions.WON)
                return winner
            else:
                self.turn += 1
        return None
