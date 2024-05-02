import { Icon24CommentOutline } from "@vkontakte/icons";
import { Counter, SimpleCell, Spinner } from "@vkontakte/vkui";
import { FC, useEffect } from "react";
import CommentItem from "../CommentItem.tsx/CommentItem";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { fetchComments } from "../../api/action";
import { IComment } from "../../model/types";
import { IDetailedNews } from "../../../DetailedNews/model/types";

interface CommentListProps {
  parent: IComment | IDetailedNews;
}

export const CommentList: FC<CommentListProps> = ({ parent }) => {
  const dispatch = useAppDispatch();
  const { comments, isCommentsLoading, commentsError, countComments } = useAppSelector(state => state.commentsReducer);
  const idsComments = parent.kids;

  useEffect(() => {
    if (idsComments) dispatch(fetchComments(idsComments));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isCommentsLoading) return <Spinner />
  if (commentsError) return <div>Ошибка {commentsError}</div>

  return (
    <div>
      <SimpleCell style={{padding: 0}}>
        <Counter><Icon24CommentOutline />{countComments}</Counter>
      </SimpleCell>
      {comments.map(comment => {
        return <CommentItem comment={comment} key={comment.id}/>
      }
      )}
    </div>
  );
};