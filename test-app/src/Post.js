import React from 'react';

const Post = props => {
    return (
        <div>
            <h1>{props.post.title}</h1>
            <h2>{props.post.contents}</h2>
        </div>
    );
};

export default Post;