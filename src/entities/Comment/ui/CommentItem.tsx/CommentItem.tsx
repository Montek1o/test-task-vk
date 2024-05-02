import { FC } from "react";
import { IComment } from "../../model/types";
import { formatDate } from "../../../../shared/lib/utils";
import { Counter, Group, SimpleCell } from "@vkontakte/vkui";
import { Icon24CommentOutline } from "@vkontakte/icons";
// import { CommentList } from "../CommentList/CommentList";

interface CommentItemProps {
  comment: IComment;
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  return (
    <Group>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <p><b>{comment.by}</b></p>
        <p>{formatDate(comment.time)}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
      {comment.kids && <SimpleCell style={{padding: 0}}>
        <Counter><Icon24CommentOutline />{comment.kids.length}</Counter>
      </SimpleCell>}
      {/* <CommentList parent={comment}/> */}
    </Group>
  );
};

export default CommentItem;