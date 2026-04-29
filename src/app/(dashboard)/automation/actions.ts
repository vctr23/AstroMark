"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function saveAutomation(name: string, nodes: any) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  try {
    const automation = await db.automation.upsert({
      where: { id: "current-user-automation" }, // For demo simplicity, using a fixed ID or finding by name
      update: {
        nodes: nodes,
        updatedAt: new Date(),
      },
      create: {
        id: "current-user-automation",
        name: name,
        nodes: nodes,
      },
    })

    revalidatePath("/automation")
    return { success: true, id: automation.id }
  } catch (error) {
    console.error("Failed to save automation:", error)
    return { error: "Failed to save to neural database" }
  }
}

export async function getAutomation() {
  try {
    const automation = await db.automation.findUnique({
      where: { id: "current-user-automation" },
    })
    return automation
  } catch (error) {
    return null
  }
}
