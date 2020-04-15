addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

class ElementHandler {
  constructor(attributeName, toText){
  	this.attributeName = attributeName
  	this.toText = toText
  }

  element(element) {
  	console.log(element.tagName)
  	console.log(element.attributes)
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        this.toText
      )
    }
  }

  // comments(comment) {
  //   // An incoming comment
  // }

  // text(text) {
  //   // An incoming piece of text
  //   if (text.text.length != 0) text.replace('New title') // prevent repeat twice
  // }
}


async function handleRequest(request) {
  // fetch and obtain data
  let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  let data = await response.json()

  let no_website = data.variants.length
  let website_index = Math.floor(Math.random() * no_website); 

  let website = data.variants[website_index]
  let second_response = await fetch(website);

  return new HTMLRewriter().on('body', new ElementHandler('title', 'New Title Test')).transform(second_response)
  // return second_response

}

