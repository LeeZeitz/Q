import axios from 'axios'

// Make the http lib injectable such that
// this can be tested easily
export default (host: string, port: number = 5000, http: any = axios) => {
  const baseUrl = `${host}:${port}`
  // some http req
  const g = () => http.get(baseUrl)
  return {
    // await can only be used in functions
    // delcared "async".
    async hello () {
      // use axios as a promise or with async await
      const res: any = await g()
      console.log(`do stuff with ${res}`)
      return res

    },
    // keep in mind this is a plain
    // object, not a class, so we need
    // the , separator
    helloPromise () {
      return new Promise((resolve, reject) => {
        g().then((res: any) => {
          console.log(`do stuff with ${res}`)
          resolve(res)
        })
      })
    }
  }
}
