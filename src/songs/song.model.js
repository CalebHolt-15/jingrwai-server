import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
    {
      title: String,
      artist: String,
      genre: String,
      comment: String,
    },
  )

  export const Song = mongoose.model('song', songSchema);
  
  