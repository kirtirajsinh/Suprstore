/*
  Warnings:

  - You are about to drop the column `serverServerId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `discordtags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_serverServerId_fkey";

-- DropForeignKey
ALTER TABLE "discordtags" DROP CONSTRAINT "discordtags_serverId_fkey";

-- DropForeignKey
ALTER TABLE "discordtags" DROP CONSTRAINT "discordtags_tagId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "serverServerId";

-- DropTable
DROP TABLE "discordtags";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productUrl" TEXT,
    "image" TEXT,
    "channelId" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GuildToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToTag_AB_unique" ON "_GuildToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToTag_B_index" ON "_GuildToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "_GuildToTag" ADD CONSTRAINT "_GuildToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Guild"("serverId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildToTag" ADD CONSTRAINT "_GuildToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;
