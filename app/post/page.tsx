import PostForm from "@/components/post/PostForm";
import React from "react";
import { prisma } from "@/lib/db";

async function getGuilds() {
  const guilds = await prisma.guild.findMany({
    where: {
      active: true,
    },
  });
  return guilds;
}

const Post = async () => {
  const guilds = await getGuilds();
  console.log(guilds);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <PostForm activeGuilds={guilds} />
    </div>
  );
};

export default Post;
