import { CommentDto } from './dto';
import { _DateState } from './hook';

export type CommentListHook = _DateState<CommentDto[]>;
