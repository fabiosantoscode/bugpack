import mongoose from "mongoose"

const test = () => {
  mongoose.Types.ObjectId.isValid("")
}

export { test }
