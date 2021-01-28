{
    //method to submit form data for new post using AJAX
    let createPost = function(){
        let postForm = $('#post-form');

        postForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url : '/posts/create',
                data : postForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post, data.data.name);

                    $(`#posts-list-container>ul`).prepend(newPost);

                    deletePost($(`.delete-post-button`, newPost));
                    new PostComments(data.data.post._id);
                    notification('success', "Post Published");

                }, error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    //method to create a post in DOM
    let newPostDom = function(post, Username){
        return $(`<li class = "onePost" id = "post-${post._id}">
        <div class = "post-content">

            <p class = "post-text">
                ${post.content}
            </p>
            <div class = "post-options">
                <small class = "post-name">
                    ${Username}
                </small class = "post-delete">

                <small class = "delete-post">
                    <a href="/posts/destroy/${post._id}" class = "delete-post-button">Delete</a>
                </small>
            </div>
        </div>

        <div class = "post_comments">

            <form action="/comment/create" method="POST" class = "comment-form" id = "post-${post._id}-comments-form">
                <textarea class = "addComment" cols="20" rows="3" type="text" name = "content" placeholder="Type Here"></textarea>
                <input type="hidden" name="post" value = "${post._id}">
                <br>
                <button class = "commentBtn" type="submit">Comment</button>
            </form>

            <div class = "post-comments_list">
                <ul id = "post-comments-${post._id}">
                </ul>
            </div>
        </div>
    </li>`)
    }

    //method to delete the post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    notification('success', "Post Deleted");
                },error : function(error){
                    notification('error', error);
                    console.log(error.responseText);
                }
            });
        });
    };
    let notification = function(isType, message){
        new Noty({
            theme: 'relax',
            text: message,
            type: isType,
            layout: 'topRight',
            timeout: 1500

        }).show();
    };
    createPost();

}