addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

class ReplaceText {
  constructor(new_text){
    this.new_text = new_text;
  }
  text(text) {
    // An incoming piece of text
    if (text.text.length != 0) text.replace(this.new_text) // prevent repeat twice
  }
}

class ReplaceUrlLink {
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

  // obtain the random index for the website => This could be run if the number of variants is more than two
  let no_website = data.variants.length
  let website_index = Math.floor(Math.random() * no_website); 
  
  // Display the keys
  if ( (request) &&  (request.headers.get('cookie') ) ){
  	cookie = request.headers.get('cookie')
    let index = cookie.search("type")
    
    website_index = parseInt( cookie.charAt(index+5) )
    if ( (website_index >= no_website) || (website_index < 0) )
      website_index = 0
  }

  // return the random variant
  let website = data.variants[website_index]
  let response = await fetch(website);

  // alter content
  new_response = new HTMLRewriter()
    .on('title', new ReplaceText('New title!'))
    .on('h1#title', new ReplaceText('This is Main title!'))
    .on('p#description', new ReplaceText('Welcome to new website!!'))
    .on('a#url', new ReplaceText('Click to go to Google!!'))
    .on('a', new ReplaceUrlLink('href'))
    .transform(response)


  // add Cookie to headers of response
  new_response.headers = new Headers();
	new_response.headers.append('Content-Type', 'text/html');
	new_response.headers.append('Set-Cookie', ['type=' + website_index.toString()]);

  return new_response
}

