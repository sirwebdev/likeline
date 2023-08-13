import path from "path"

export const GLOBAL_PREFIX = '/api'
export const STATIC_IMAGES_PATH = `${GLOBAL_PREFIX}/images`

export const TEMP_FOLDER = path.resolve(__dirname, '..', '..', 'temp')
export const UPLOADS_FOLDER = path.resolve(__dirname, '..', '..', 'uploads')
