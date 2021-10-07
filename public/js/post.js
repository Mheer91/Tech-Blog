

function Post (event) {
    event.preventDefault();

    console.log("post")
};

function editPost (event) {
    event.preventDefault();

    const postIdFetch = event.target.getAttribute('data-id');



    console.log("editPost", postIdFetch)
};

function deletePost(event) {
    event.preventDefault();

    const postIdFetch = event.target.getAttribute('data-id');

    console.log("deletePost", postIdFetch)
};

const postEdit = document.querySelectorAll('.edit-post');
[...postEdit].forEach(postEdit => postEdit.addEventListener('click', editPost))

const postDelete = document.querySelectorAll('.delete-post');
[...postDelete].forEach(postDelete => postDelete.addEventListener('click', deletePost))