"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

export async function fetchRows() {
  try {
    const data = await sql`SELECT * FROM systems ORDER BY install_time DESC`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch row data.");
  }
}

export async function clearTable() {
  try {
    await sql`DELETE FROM systems`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to clear table.");
  }
  revalidatePath("/");
}

export async function addRow() {
  try {
    await sql`INSERT INTO systems DEFAULT VALUES`;
  } catch (error) {
    return {
      message: "Database Error: Failed to add row.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/");
}

export async function updateSystemName(id, value) {
  try {
    await sql`UPDATE systems SET name = ${value} WHERE id = ${id};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update system name.");
  }
  revalidatePath("/");
}

export async function updateLocation(id, value) {
  try {
    await sql`UPDATE systems SET location = ${value} WHERE id = ${id};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update location.");
  }
  revalidatePath("/");
}

export async function toggleAwake(id) {
  try {
    await sql`UPDATE systems SET awake = NOT awake WHERE id = ${id}`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to toggle awake.");
  }
  revalidatePath("/");
}
