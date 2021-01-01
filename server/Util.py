import asyncio
import json

async def sendAction(ws, action, params={}):
    await ws.send(json.dumps({"type": action.value, **params}))


async def recvAction(ws):
    msg = await ws.recv()
    return json.loads(msg)
