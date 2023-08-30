import path from "path"

export const GLOBAL_PREFIX = '/api'
export const PORT = Number(process.env.PORT) || 3333;
export const STATIC_IMAGES_PATH = `${GLOBAL_PREFIX}/images`

const environment = process.env.NODE_ENV
export const isTestEnvironment = environment === 'test';

export const TEMP_FOLDER = path.resolve(__dirname, '..', '..', 'temp')
export const UPLOADS_FOLDER = path.resolve(__dirname, '..', '..', 'uploads')
