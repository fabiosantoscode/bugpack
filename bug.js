import mongoose from "mongoose"

const test = async () => {
  await mongoose.disconnect()
}

export { test }
