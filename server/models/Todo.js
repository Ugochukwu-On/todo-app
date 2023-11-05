const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        
        
    },
    progress:{
        type: Number,
        default: 50,
    },

    status: {
        type: String,
        enum: ['pending', 'completed', 'deleted'], // Specify the allowed status values
        default: 'pending',
    },
    description: {
        type: String,
      },
      
}, 
{ timestamps: 
    true}
    )


module.exports = mongoose.model('Todo', todoSchema)