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
  // Validate form using Zod
  // const validatedFields = CreateInvoice.safeParse({
  //   customerId: formData.get("customerId"),
  //   amount: formData.get("amount"),
  //   status: formData.get("status"),
  // });

  // If form validation fails, return errors early. Otherwise, continue.
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: "Missing Fields. Failed to Create Invoice.",
  //   };
  // }

  // Prepare data for insertion into the database
  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`INSERT INTO systems DEFAULT VALUES`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to add row.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
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
