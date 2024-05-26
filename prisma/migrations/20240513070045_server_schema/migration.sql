-- CreateTable
CREATE TABLE "Server" (
    "serverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "memberCount" INTEGER,
    "channelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("serverId")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "serverId" TEXT NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serverServerId" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "discordtags" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "discordtags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Server_serverId_key" ON "Server"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "Server_channelId_key" ON "Server"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "discordtags_serverId_tagId_key" ON "discordtags"("serverId", "tagId");

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("serverId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_serverServerId_fkey" FOREIGN KEY ("serverServerId") REFERENCES "Server"("serverId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discordtags" ADD CONSTRAINT "discordtags_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("serverId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discordtags" ADD CONSTRAINT "discordtags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;
