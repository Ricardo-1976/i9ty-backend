-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "cpfCnpj" VARCHAR(14) NOT NULL,
    "producerName" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" CHAR(2) NOT NULL,
    "totalAreaHa" DOUBLE PRECISION NOT NULL,
    "arableAreaHa" DOUBLE PRECISION NOT NULL,
    "vegetationAreaHa" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Culture" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Culture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmCulture" (
    "farmId" TEXT NOT NULL,
    "cultureId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FarmCulture_pkey" PRIMARY KEY ("farmId","cultureId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Culture_name_key" ON "Culture"("name");

-- AddForeignKey
ALTER TABLE "FarmCulture" ADD CONSTRAINT "FarmCulture_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmCulture" ADD CONSTRAINT "FarmCulture_cultureId_fkey" FOREIGN KEY ("cultureId") REFERENCES "Culture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
