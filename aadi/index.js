document.getElementById('fetch-posts').addEventListener('click', fetchPosts);

function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '';

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <button class="view-comments-btn" data-post-id="${post.id}">View Comments</button>
                    <div class="comments-container" style="display: none;"></div>
                `;
                postsContainer.appendChild(postElement);
            });

            const viewCommentsButtons = document.querySelectorAll('.view-comments-btn');
            viewCommentsButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const postId = button.getAttribute('data-post-id');
                    const commentsContainer = button.nextElementSibling;
                    fetchComments(postId, commentsContainer);
                });
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function fetchComments(postId, commentsContainer) {
    commentsContainer.innerHTML = ''; // Clear existing comments

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <p><strong>Name:</strong> ${comment.name}</p>
                    <p><strong>Email:</strong> ${comment.email}</p>
                    <p><strong>Comment:</strong> ${comment.body}</p>
                    <hr>
                `;
                commentsContainer.appendChild(commentElement);
            });
            commentsContainer.style.display = 'block'; // Show comments
        })
        .catch(error => console.error('Error fetching comments:', error));
}
