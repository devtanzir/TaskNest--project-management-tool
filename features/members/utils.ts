
import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { type Databases, Query } from "node-appwrite"

interface GetMemberProps {
    databases: Databases;
    workspaceId : string;
    userId: string;
}
export const getMember = async ({databases, workspaceId, userId}: GetMemberProps) => {

    const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [
            Query.equal("workspaceId", workspaceId),
            Query.equal("userId", userId)
        ]
    )
    
    // if (members.total === 0) {
    //     throw new Error("No member found")
    // }
    
    return members.documents[0]
}