type Repo = {
    name: string, 
    stargazers_count: number
  }
  
  export async function getData() {
    const res = await fetch('http://localhost:3000/api/hello');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    console.log('data fetched from backend',  (res));
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return {
      props: {
        videos: await res.json()
      }
    }
  }