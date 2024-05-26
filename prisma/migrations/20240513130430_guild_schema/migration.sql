/*
  Warnings:

  - You are about to drop the `Server` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_serverServerId_fkey";

-- DropForeignKey
ALTER TABLE "channels" DROP CONSTRAINT "channels_serverId_fkey";

-- DropForeignKey
ALTER TABLE "discordtags" DROP CONSTRAINT "discordtags_serverId_fkey";

-- DropTable
DROP TABLE "Server";

-- CreateTable
CREATE TABLE "Guild" (
    "serverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "memberCount" INTEGER,
    "channelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("serverId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_serverId_key" ON "Guild"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_channelId_key" ON "Guild"("channelId");

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Guild"("serverId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_serverServerId_fkey" FOREIGN KEY ("serverServerId") REFERENCES "Guild"("serverId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discordtags" ADD CONSTRAINT "discordtags_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Guild"("serverId") ON DELETE CASCADE ON UPDATE CASCADE;
