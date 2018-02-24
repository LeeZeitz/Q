export default (host: string, port: number = 5000) => {
  return {
    hello () {
      console.log('hello world from the provider')
      console.log(`the current provider is on host ${host} and port ${port}`)
    }
  }
}
