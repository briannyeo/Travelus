-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "location_based" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "itineraries" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "num_days" INTEGER NOT NULL,
    "job_title" TEXT NOT NULL,
    "job_body" TEXT NOT NULL,
    "pay" BIGINT NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itineraries" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "num_days" INTEGER NOT NULL,
    "itinerary_title" TEXT NOT NULL,
    "itinerary_body" TEXT NOT NULL,
    "jobsId" INTEGER NOT NULL,

    CONSTRAINT "Itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnItineraries" (
    "userId" INTEGER NOT NULL,
    "itinerariesId" INTEGER NOT NULL,

    CONSTRAINT "UserOnItineraries_pkey" PRIMARY KEY ("userId","itinerariesId")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "itinerariesId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "itineraryId" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itineraries" ADD CONSTRAINT "Itineraries_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itineraries" ADD CONSTRAINT "Itineraries_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "Jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnItineraries" ADD CONSTRAINT "UserOnItineraries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnItineraries" ADD CONSTRAINT "UserOnItineraries_itinerariesId_fkey" FOREIGN KEY ("itinerariesId") REFERENCES "Itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_itinerariesId_fkey" FOREIGN KEY ("itinerariesId") REFERENCES "Itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
