import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const PayrowSchema =   new Schema( {
    type: {
       type: String,
       default: "pay"
    },
    name: String,
    code: String,
    salary: String,
    allowance: String,
    bonus: String,
}, { timestamps: true })

export default  mongoose.model("payrow", PayrowSchema);