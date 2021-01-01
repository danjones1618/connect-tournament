#!/usr/bin/env python3

from Actions import Actions
from Player import Player
from Util import sendAction, recvAction
from Tournament import Tournament
from threading import Thread
from time import sleep
import asyncio
import websockets

tournaments = {"test": Tournament(Player("host", None))}

async def handleConnection(websocket, path):
    global tournaments
    action = await recvAction(websocket)
    while action["type"] != Actions.JOIN_TOURNAMENT.value \
            or action["tournamentId"] not in tournaments:
        await sendAction(websocket, Actions.INVALID_TOURNAMENT)
        action = await recvAction(websocket)

    await sendAction(websocket, Actions.ASK_NAME)
    nameA = await recvAction(websocket)
    while nameA["type"] != Actions.SET_NAME.value \
            or tournaments[action["tournamentId"]].isPlayerNameTaken(nameA["name"]):
        await sendAction(websocket, Actions.INVALID_NAME)
        nameA = await recvAction(websocket)

    tournaments[action["tournamentId"]].addPlayer(Player(nameA["name"], websocket))
    await sendAction(websocket, Actions.JOINED_TOURNAMENT)
    await websocket.wait_closed()

def handleTournaments():
    while True:
        print(tournaments["test"].players)
        sleep(20)

if __name__ == "__main__":
    thread = Thread(target=handleTournaments)
    thread.start()
    asyncio.get_event_loop().run_until_complete(
        websockets.serve(handleConnection, 'localhost', 3080))
    asyncio.get_event_loop().run_forever()
    thread.join()
