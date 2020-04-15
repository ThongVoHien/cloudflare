addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

class WebTitle {
  text(text) {
    // An incoming piece of text
    if (text.text.length != 0) text.replace('New title') // prevent repeat twice
  }
}

class MainTitle {
  text(text) {
    // An incoming piece of text
    if (text.text.length != 0) text.replace('New Main title') // prevent repeat twice
  }
}

class ParagraphDescription {
  text(text) {
    // An incoming piece of text
    if (text.text.length != 0) text.replace('Welcome to new website!!') // prevent repeat twice
  }
}

class ActionLink {
  text(text) {
    // An incoming piece of text
    if (text.text.length != 0) text.replace('Click to go to Google!') // prevent repeat twice
  }
}

class UrlLink {
  constructor(attributeName) {
    this.attributeName = attributeName
  }
 
  element(element) {
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        'https://google.com/'
      )
    }
  }
}

async function handleRequest(request) {
  // fetch and obtain data
  let json = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  let data = await json.json()

  let no_website = data.variants.length
  let website_index = Math.floor(Math.random() * no_website); 
  
  if ( (request) &&  (request.headers.get('set-cookie') ) ){
  	website_index = request.headers.get('set-cookie')
  	for (var prop in website_index)
  		console.log(prop)
  	console.log("1Cookie")
  	console.log(typeof website_index)
  	console.log(website_index)
  }

  let website = data.variants[website_index]
  let response = await fetch(website);


  new_response = new HTMLRewriter()
    .on('title', new WebTitle())
    // .on('h1#title', new MainTitle())
    .on('p#description', new ParagraphDescription())
    .on('a#url', new ActionLink())
    .on('a', new UrlLink('href'))
    .transform(response)


  	new_response.headers = new Headers();

	new_response.headers.append('Content-Type', 'text/html');
	new_response.headers.append('Set-Cookie', ['type=2']);
	new_response.credentials = 'include';

	console.log("Cookie")
    console.log(new_response.headers.get('Set-Cookie'))

    return new_response
}

