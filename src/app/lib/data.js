import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

export async function fetchRows() {
  try {
    const data = await sql`SELECT * FROM systems`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch row data.");
  }
}
