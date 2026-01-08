import { WebSocket } from "ws";
import { UserSocket } from "../types";

export class UserRepository {
    private static instance: UserRepository;
    private userconnections: UserSocket[] = [];

    public static getInstance() {
        if (!UserRepository.instance) UserRepository.instance = new UserRepository();
        return UserRepository.instance;
    }

    public save(user: UserSocket) {
        this.userconnections.push(user);
    }

    public findBySocket(socket: WebSocket) {
        return this.userconnections.find(u => u.socket === socket);
    }

    public getAll() {
        return this.userconnections;
    }

    public remove(socket: WebSocket) {
        this.userconnections = this.userconnections.filter(u => u.socket !== socket);
    }
}