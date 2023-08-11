-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "favorite_sport" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_city_country_favorite_sport_key" ON "User"("name", "city", "country", "favorite_sport");
