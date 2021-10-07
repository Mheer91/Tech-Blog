function Post (event) {
    event.preventDefault();

    console.log("post")
};

function editComment (event) {
    event.preventDefault();

    const commentIdFetch = event.target.getAttribute('data-id');



    console.log("editComment", commentIdFetch)
};

function deleteComment(event) {
    event.preventDefault();

    const commentIdFetch = event.target.getAttribute('data-id');

    console.log("deleteComment", commentIdFetch)
};

const commentEdit = document.querySelectorAll('.edit-comment');
[...commentEdit].forEach(commentEdit => commentEdit.addEventListener('click', editComment));

const commentDelete = document.querySelectorAll('.delete-comment');
[...commentDelete].forEach(commentDelete => commentDelete.addEventListener('click', deleteComment));

//need to make it so these functions are executed from the edit modal and not the base edit button. Base edit button should only call the modal, and the edit function here should be within the modal