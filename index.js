const postTitle = document.getElementById("post-title")
const postBody = document.getElementById("post-body")

const posts = document.getElementById("blog-list");
const url = "https://apis.scrimba.com/jsonplaceholder/posts"
const form = document.getElementById("new-post");

let blogsArray = [];

function renderPosts(array) {
    let html = "" // initialize a variable to empty string to contain innerHTML //
    for(let post of array){ // use a for loop to loop thru the array and concatentate desired outputs //
        html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
                `
    }
    posts.innerHTML = html // insert the inner HTML into the desired element
}

fetch(url)
    .then(res => res.json())
    .then(data => {
        blogsArray = data.slice(0,5) // first slice the returned array of objects //
        // console.log(blogsArray)
        renderPosts(blogsArray)
    })


    form.addEventListener("submit", getPost)

    function getPost(e){
        e.preventDefault()

        const blogPost = {title: postTitle.value, body: postBody.value}

        const option = {
            method: "POST", // Method is GET by default
            body: JSON.stringify(blogPost),
            headers: {"Content-Type": "application/json"}
        }

        fetch(url, option)
            .then(res => res.json()) // convert the respose from JSON to Javascript
            .then(post => {
                blogsArray.unshift(post);
                renderPosts(blogsArray);
                // postTitle.value = "";
                // postBody.value = "";
                form.reset()
        })
    }

