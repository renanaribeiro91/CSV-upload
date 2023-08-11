import { Request, Response } from "express";
import { prisma } from "../../../database";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const csvData = file.buffer.toString("utf-8");
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");

    for (const line of lines.slice(1)) {
      const values = line.split(",");
      const csvObject: Record<string, string> = Object.fromEntries(
        headers.map((header: any, index: any) => [header, values[index]])
      );

      const existingUser = await prisma.user.findFirst({
        where: csvObject,
      });

      if (!existingUser) {
        const newUser = {
          name: csvObject.name,
          city: csvObject.city || "",
          country: csvObject.country || "",
          favorite_sport: csvObject.favorite_sport || "",
        };

        await prisma.user.create({ data: newUser });
      }
    }

    res
      .status(200)
      .json({ message: "File uploaded and data stored successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the file" });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
      return res.status(400).json({ error: "Invalid search query" });
    }

    const searchResults = await prisma.$queryRaw`
      SELECT *
      FROM User
      WHERE LOWER(name) LIKE LOWER(${`%${q}%`})
         OR LOWER(city) LIKE LOWER(${`%${q}%`})
         OR LOWER(country) LIKE LOWER(${`%${q}%`})
         OR LOWER(favorite_sport) LIKE LOWER(${`%${q}%`})
    `;

    res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
