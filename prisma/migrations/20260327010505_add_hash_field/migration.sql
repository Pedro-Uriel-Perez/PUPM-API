-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hash" TEXT,
ADD COLUMN     "rol_id" INTEGER;

-- CreateTable
CREATE TABLE "Rol" (
    "ide" SERIAL NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("ide")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("ide") ON DELETE SET NULL ON UPDATE CASCADE;
