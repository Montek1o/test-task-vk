import { FC, useState } from "react";
import { IComment } from "../../model/types";
import { formatDate } from "../../../../shared/lib/utils";
import { Counter, Group, SimpleCell } from "@vkontakte/vkui";
import { Icon24CommentOutline } from "@vkontakte/icons";
import axios from "axios";
import classes from "./CommentsItem.module.css";
// import { CommentList } from "../CommentList/CommentList";

interface CommentItemProps {
  comment: IComment;
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const [nestComments, setNestComments] = useState<IComment[]>([]);
  
  async function openNestedComment() {
    if (!comment.kids) return;
    const comments = [];
    for (let i = 0; i < comment.kids.length; i++) {
      const response = await axios.get<IComment>('https://hacker-news.firebaseio.com/v0/item/' + comment.kids[i] + '.json');
      comments.push(response.data);
    }
    setNestComments(comments);
  }

  return (
    <Group onClick={openNestedComment} className={comment.kids ? classes.commentsItem : classes.commentsItem_notKids}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <p><b>{comment.by}</b></p>
        <p>{formatDate(comment.time)}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
      {comment.kids && <SimpleCell style={{padding: 0}}>
        <Counter><Icon24CommentOutline />{comment.kids.length}</Counter>
      </SimpleCell>}
      <div style={{marginLeft: '10px'}}>
        {nestComments && 
          nestComments.map((comm) => 
            <CommentItem comment={comm} key={comm.id} />
          )
        }
      </div>
    </Group>
  );
};

export default CommentItem;