-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('comment', 'like');

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilename" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Creator" (
    "userid" TEXT NOT NULL,
    "total_videos_uploaded" INTEGER NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Viewer" (
    "userid" TEXT NOT NULL,
    "total_interactions" INTEGER NOT NULL,

    CONSTRAINT "Viewer_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Video" (
    "videoid" TEXT NOT NULL,
    "uploader_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sharelink" TEXT NOT NULL,
    "viewcount" INTEGER NOT NULL DEFAULT 0,
    "uploaded_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("videoid")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "interaction_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "interaction_at" TIMESTAMP(3) NOT NULL,
    "type" "InteractionType" NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("interaction_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "interaction_id" TEXT NOT NULL,
    "comment_text" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("interaction_id")
);

-- CreateTable
CREATE TABLE "Like" (
    "interaction_id" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("interaction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Creator" ADD CONSTRAINT "Creator_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viewer" ADD CONSTRAINT "Viewer_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_uploader_id_fkey" FOREIGN KEY ("uploader_id") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("videoid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_interaction_id_fkey" FOREIGN KEY ("interaction_id") REFERENCES "Interaction"("interaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_interaction_id_fkey" FOREIGN KEY ("interaction_id") REFERENCES "Interaction"("interaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;
