import mongoose from "mongoose";



const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  rank: String,
  createdAt: Date,
});

const Employee = mongoose.model("employees", employeeSchema);
// Employee.collection.createIndex({name:1},{unique:true}) // index and perform optimaization better qury perfomence
export default Employee;
