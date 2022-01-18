import React from "react";
import SocketIOClient from "socket.io-client";
import { API_URL } from "../lib/api";

export const socket = SocketIOClient.connect(API_URL + "/streamer");
export const SocketContext = React.createContext();
