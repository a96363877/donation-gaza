"use server"

import { addDonation } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function processDonation(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phoneNumber = formData.get("phoneNumber") as string
    const amount = Number.parseFloat(formData.get("amount") as string)
    const projectName = formData.get("projectName") as string
    const paymentMethod = formData.get("paymentMethod") as string

    // Validate data
    if (!amount || amount <= 0) {
      return { success: false, message: "Invalid donation amount" }
    }

    if (!projectName) {
      return { success: false, message: "Project name is required" }
    }

    if (!paymentMethod) {
      return { success: false, message: "Payment method is required" }
    }

    // In a real application, you would process the payment here
    // For this example, we'll simulate a successful payment

    // Add donation to Firestore
    const result = await addDonation({
      name,
      email,
      phoneNumber,
      amount,
      projectName,
      paymentMethod,
      status: "completed", // In a real app, this would be 'pending' until payment confirmation
    })

    if (result.success) {
      // Revalidate the donation page to show updated stats
      revalidatePath("/donation-page")
      return { success: true, message: "Donation processed successfully", donationId: result.id }
    } else {
      return { success: false, message: "Failed to process donation" }
    }
  } catch (error) {
    console.error("Error processing donation:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}

