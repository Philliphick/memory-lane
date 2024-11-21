import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } else if (req.method === "POST") {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.json(post);
  }
}

// TODO: when able to get session and extract userId - pass id into this endpoint - place said userId into the post row.
