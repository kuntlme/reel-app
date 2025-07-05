-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_uploader_id_fkey";

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "viewcount" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_uploader_id_fkey" FOREIGN KEY ("uploader_id") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;
