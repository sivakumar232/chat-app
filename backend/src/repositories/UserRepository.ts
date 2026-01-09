import { WebSocket } from "ws";
import { UserSocket } from "../types";

export class UserRepository {
  private static instance: UserRepository;
  private users = new Map<WebSocket, UserSocket>();

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserRepository();
    }
    return this.instance;
  }

  save(user: UserSocket) {
    this.users.set(user.socket, user);
  }

  findBySocket(socket: WebSocket) {
    return this.users.get(socket);
  }

  getAll() {
    return Array.from(this.users.values());
  }

  remove(socket: WebSocket) {
    this.users.delete(socket);
  }

  getUsersByRoom(roomId: string) {
    return this.getAll().filter(u => u.rooms.has(roomId));
  }
}
