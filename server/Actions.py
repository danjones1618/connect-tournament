from enum import Enum

class Actions(Enum):
    SET_UUID = "SET_UUID"
    JOIN_TOURNAMENT = "JOIN_TOURNAMENT"
    INVALID_TOURNAMENT = "INVALID_TOURNAMENT"
    ASK_NAME = "ASK_NAME"
    SET_NAME = "SET_NAME"
    INVALID_NAME = "INVALID_NAME"
    JOINED_TOURNAMENT = "JOINED_TOURNAMENT"
    TAKE_TURN = "TAKE_TURN"
    TURN_COMPLETE = "TURN_COMPLETE"
    INVALID_TURN = "INVALID_TURN"
    UPDATE_BOARD = "UPDATE_BOARD"
    WON = "WON"
    LOST = "LOST"
