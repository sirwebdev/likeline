import multer from 'multer'

import { TEMP_FOLDER } from '@infrastructures/constants/server'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, TEMP_FOLDER)
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname)
  }
})

export const uploadFile = multer({ storage })
