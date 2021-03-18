import { CurrentUser } from "./currentUser.model";
import { PermissionModel } from "./Permissions.model";

export interface UserModel {
    User: CurrentUser;
    Permission: PermissionModel;
    SuperUser: boolean;
    Photos?: any[];
}