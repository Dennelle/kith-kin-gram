import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
function PostCard({ post, isProfile, loggedUser, removeLike, addLike }) {
  // if the loggedUser's id is in the post.likes array
  // that means the user has liked the post
  // so the heart should be red, and the onClick should call the removeLike function

  // if the loggedUser's id is NOT IN the post.likes array
  // that means the user HAS NOT liked the post
  // so the heart should be grey, and the onClick should call the addLike function

  // findIndex returns the index of the like, or -1 if there no match
  const likedIndex = post.likes.findIndex(
    (like) => like.userId === loggedUser._id
  );

  // if the user has liked the post, likedIndex be greater then negative 1 so the likeColor should be red
  const likeColor = likedIndex > -1 ? "red" : "grey";

  // if the user has liked the post, we need to call our removeLike function (is there anything we need to pass to it?)
  // if the user has not liked the post, we need to call our addLike function (is there anything we need to pass to it?)
  const clickHandler =
    likedIndex > -1
      ? () => removeLike(post.likes[likedIndex]._id)
      : () => addLike(post._id);

  return (
    <Card>
      {isProfile ? null : (
        <Card.Content textAlign="left">
          <Link to={`/${post.user.username}`}>
            <Image
              floated="left"
              size="large"
              avatar
              src={
                post.user.photoUrl
                  ? post.user.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
            />
            <Card.Header floated="right">{post.user.username}</Card.Header>
          </Link>
        </Card.Content>
      )}

      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon
          name={"heart"}
          size="large"
          color={likeColor}
          onClick={clickHandler}
        />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default PostCard;
