addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  // fetch and obtain data
  let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  let data = await response.json()

  let no_website = data.variants.length
  let website_index = Math.floor(Math.random() * no_website); 
  
  let website = data.variants[website_index]
  let second_response = await fetch(website);
  return second_response

}




// async function handleRequest(request) {
//   // fetch and obtain data
//   let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
//   let data = await response.json()

//   let no_website = data.variants.length
//   let website_index = Math.floor(Math.random() * no_website); 
  
//   let website = data.variants[website_index]
//   let second_response = await fetch(website);
//   return second_response

// }

// /**
//  * Respond with hello worker text
//  * @param {Request} request
//  */
// async function handleRequest(request) {
//   return new Response('Hello worker!', {
//     headers: { 'content-type': 'text/plain' },
//   })
// }
