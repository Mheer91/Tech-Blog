const newComment = async (event) => {
    event.preventDefault();

    const postIdFetch = window.location.pathname.split('/');
    const post_id = parseInt(postIdFetch[2]);
    const comment_body = document.querySelector('#commentBody').value.trim();



    if (comment_body && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_body, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response)

        if (response.ok) {
            document.location.reload();
        }
        else {
            M.toast({ html: 'Error creating comment, please try again!' })
        }
    }

    console.log("comment", comment_body, post_id)
};

const editComment = async (event) => {
    event.preventDefault();

    const commentIdFetch = event.target.getAttribute('data-id');
    const comment_body = document.querySelector(`#commentBodyEdit${commentIdFetch}`).value.trim();



    if (comment_body) {
        const response = await fetch(`/api/comments/${commentIdFetch}`, {
            method: 'PUT',
            body: JSON.stringify({ comment_body }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response)

        if (response.ok) {
            document.location.reload();
        }
        else {
            M.toast({ html: 'Error updating comment, please try again!' })
        }
    }



    console.log("editComment", commentIdFetch)
};

const deleteComment = async (event) => {
    event.preventDefault();

    const commentIdFetch = event.target.getAttribute('data-id');

    if (commentIdFetch) {
        const response = await fetch(`/api/comments/${commentIdFetch}`, {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response)

        if (response.ok) {
            document.location.reload();
        }
        else {
            M.toast({ html: 'Error deleting comment, please try again!' })
        }
    }

    console.log("deleteComment", commentIdFetch)
};

const commentEdit = document.querySelectorAll('.edit-comment');
[...commentEdit].forEach(commentEdit => commentEdit.addEventListener('click', editComment));

const commentDelete = document.querySelectorAll('.delete-comment');
[...commentDelete].forEach(commentDelete => commentDelete.addEventListener('click', deleteComment));

document.querySelector('#submitComment').addEventListener('click', newComment);
