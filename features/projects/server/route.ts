import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECT_ID } from '@/config';
import { ID, Query } from 'node-appwrite';
import { createProjectSchema } from "../schema";

const app = new Hono()
    .post(
        "/",
        sessionMiddleware,
        zValidator("form", createProjectSchema),
        async (c) => {
            const databases = c.get("databases");
            const storage = c.get("storage")
            const user = c.get("user");
            const { name, image, workspaceId } = c.req.valid("form");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            })

            if (!member) {
                return c.json({ error: "Unauthorize" }, 401)
            }
        
            let uploadedImageUrl: string | undefined;
        
            if (image instanceof File) {
              const file = await storage.createFile(
                IMAGES_BUCKET_ID,
                ID.unique(),
                image,
              );
              const arrayBuffer = await storage.getFilePreview(
                IMAGES_BUCKET_ID,
                file.$id,
              );
              uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`
            }
        
        
        
            const project = await databases.createDocument(
              DATABASE_ID,
              PROJECT_ID,
              ID.unique(),
              {
                name,
                imageUrl: uploadedImageUrl,
                workspaceId
              }
            );
        
        
            return c.json({ data: project });
          }
    )
    .get(
        "/",
        sessionMiddleware,
        zValidator("query", z.object({workspaceId: z.string()})),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const { workspaceId } = c.req.valid("query");
            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            })
            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }
            const projects = await databases.listDocuments(
                DATABASE_ID,
                PROJECT_ID,
                [
                    Query.equal("workspaceId", workspaceId),
                    Query.orderDesc("$createdAt")
                ],
                
            )
            return c.json({ data: projects });
        }
    )

export default app