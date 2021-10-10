

const newPost = async (event) => {
    event.preventDefault();

    const post_title = document.querySelector('#postTitle').value.trim();
    const post_body = document.querySelector('#postBody').value.trim();



    if (post_title && post_body) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ post_title, post_body }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response)

        if (response.ok) {
            document.location.reload();
        }
        else {
            M.toast({ html: 'Error creating post, please try again!' })
        }
    }

    console.log("post", post_body, post_title)
};

const editPost = async (event) => {
    event.preventDefault();

    const postIdFetch = event.target.getAttribute('data-id');
    const post_title = document.querySelector(`#postTitleEdit${postIdFetch}`).value.trim();
    const post_body = document.querySelector(`#postBodyEdit${postIdFetch}`).value.trim();




    if (post_title && post_body) {
        const response = await fetch(`/api/posts/${postIdFetch}`, {
            method: 'PUT',
            body: JSON.stringify({ post_title, post_body }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response)

        if (response.ok) {
            document.location.reload();
        }
        else {
            M.toast({ html: 'Error updating post, please try again!' })
        }
    }



    console.log("editPost", postIdFetch, post_title, post_body)
};

const deletePost = async (event) => {
    event.preventDefault();

    const postIdFetch = event.target.getAttribute('data-id');

    if (postIdFetch) {
        const response = await fetch(`/api/posts/${postIdFetch}`, {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response)

        if (response.ok) {
            document.location.reload();
        }
        else {
            M.toast({ html: 'Error deleting post, please try again!' })
        }
    }

    console.log("deletePost", postIdFetch)
};

const postEdit = document.querySelectorAll('.edit-post');
[...postEdit].forEach(postEdit => postEdit.addEventListener('click', editPost));

const postDelete = document.querySelectorAll('.delete-post');
[...postDelete].forEach(postDelete => postDelete.addEventListener('click', deletePost));

document.querySelector('#submitPost').addEventListener('click', newPost);