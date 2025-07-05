/*
  Warnings:

  - You are about to drop the column `total_video_uploaded` on the `Creator` table. All the data in the column will be lost.
  - Added the required column `total_videos_uploaded` to the `Creator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creator" DROP COLUMN "total_video_uploaded",
ADD COLUMN     "total_videos_uploaded" INTEGER NOT NULL;
