-- CreateTable
CREATE TABLE "Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "superzahl" INTEGER
);

-- CreateTable
CREATE TABLE "Box" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numbers" TEXT NOT NULL,
    "ticketId" INTEGER,
    CONSTRAINT "Box_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
