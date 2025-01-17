import { Product } from "./api.types"
import mongoose from "mongoose"

const Schema = new mongoose.Schema<Product>(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const ImportedSchema = mongoose.model<Product>("products", Schema)
export default ImportedSchema
