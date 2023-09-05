export default async function() {
  await global.__MONGO_INSTANCE.stop()
}
