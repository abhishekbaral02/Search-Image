// its an api 
const accessKey = "7CLDMTNMNaAwQo5ZMBsSudG2L5Ne1Z944WUwOCGKcmQ"

// get all the elements
const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

// input data store or page default
let inputData = ""
let page = 1;


// we are using async because we gonna use response and fetch
async function searchImages(){
    // input data value store
    inputData = inputE1.value;

    // link
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=
    ${inputData}&client_id=${accessKey}`;

    // fetching the url and response in the form of json
    const response = await fetch(url);
    const data = await response.json()

    // store results
    const results = data.results;

    // if page is equal to 1 than store nothing
    if (page === 1){  
        searchResults.innerHTML = "";
    }     
    
    // map result to first page
    results.map((result) => {
        // create div className Image than in image we create src alt and than we create a anchoor tag in anchor tag we use href or target or textcontent for description
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img');
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description


        // appendchild from parent element
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    }  );
    // than page++ for more results
    page++
    // if page is greater than 1 than we remove the styling property
    if(page>1){
        showMore.style.display = "block";
    }                                                                      
}

// here we use event listener for an event which is if someone submit the button first it would be preventdefault than passes to the function searchImages()
formE1.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImages()
})

// here is a one more eventlistener which is if someone click on the show more button it again passes to function searchImages()
showMore.addEventListener("click",()=>{
    searchImages()
})