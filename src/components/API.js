export const API = 'https://aqueous-tor-11299.herokuapp.com';
export const fetch = (url, options, timeout = 7000)=> {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}