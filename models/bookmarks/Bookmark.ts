import User from "../users/User";
import Tuit from "../tuits/Tuit";

export default interface Bookmark {
    bookmarkedBy: User;
    tuit: Tuit;
}
