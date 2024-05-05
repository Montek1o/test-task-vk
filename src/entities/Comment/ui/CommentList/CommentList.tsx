import { Icon24CommentOutline, Icon28RefreshOutline } from "@vkontakte/icons";
import { Counter, Spinner, Tooltip } from "@vkontakte/vkui";
import { FC, useEffect } from "react";
import CommentItem from "../CommentItem.tsx/CommentItem";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { fetchComments, updateComments } from "../../api/action";
import { IComment } from "../../model/types";
import { IDetailedNews } from "../../../DetailedNews/model/types";
import classes from './CommentList.module.css';

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
      <div className={classes.commentList__icons}>
        <Counter><Icon24CommentOutline />{countComments}</Counter>
        <Tooltip 
          placement="right" 
          text="Обновить комментарии"
        >
          <Icon28RefreshOutline 
            onClick={() => dispatch(updateComments(parent.id))} 
            className='refreshButton button'
          />
        </Tooltip>
      </div>
      {comments.map(comment => {
        return <CommentItem comment={comment} key={comment.id}/>
      }
      )}
    </div>
  );
};