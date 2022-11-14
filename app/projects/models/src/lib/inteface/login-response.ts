import { Status } from "../enum/status.enum";
import { User } from "./user";

export interface LoginResponse {
    status : Status;
    user?: User;
}
