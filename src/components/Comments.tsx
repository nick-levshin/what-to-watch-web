import { supabase } from '@/utils/supabaseClient';
import { Comment } from '../../typings';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import { useRecoilValue } from 'recoil';
import { userState } from '@/atoms/detailsAtom';
import { Toaster, toast } from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  comments: Comment[];
  setComments: Function;
  movieId: number;
}

const Comments = ({ comments, setComments, movieId }: Props) => {
  const user = useRecoilValue(userState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ text: string }>();

  const handleComment: SubmitHandler<{ text: string }> = async ({ text }) => {
    const { error } = await supabase
      .from('comments')
      .insert({ text, userId: user?.id, movieId });

    if (!error) {
      const { data } = await supabase
        .from('comments')
        .select('created_at, text, userId, movieId, users(username)')
        .eq('movieId', movieId)
        .order('created_at', { ascending: false });
      setComments(data);
      toast.success('Комментарий оставлен', { duration: 3000 });
    } else {
      toast.error('Ошибка, попробуйте позже', { duration: 3000 });
    }
    reset();
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="mt-10">
        <div className="flex items-center gap-4">
          <ChatBubbleBottomCenterTextIcon className="w-7 h-7 text-[#dc2626]" />
          <h3 className="text-2xl font-semibold lg:text-3xl">
            Оставить комментарий
          </h3>
        </div>
        <form onSubmit={handleSubmit(handleComment)}>
          <textarea
            className="mt-4 bg-transparent border-white rounded border-[1px] resize-none w-full p-1.5 focus:border-[red]"
            placeholder="Ваш комментарий..."
            {...register('text', { required: true, minLength: 10 })}
          />
          {errors.text && (
            <p className="p-1 text-[13px] font-light text-orange-500">
              Введите не менее 10 символов
            </p>
          )}
          <button
            className="bg-[#dc2626] font-semibold p-2 rounded hover:bg-[#ee3f3f] transition mt-2 w-[150px] mb-6"
            type="submit"
          >
            Отправить
          </button>
        </form>
        {comments?.length ? (
          comments.map((comment) => (
            <div
              className="border-t-[1px] border-gray-500 py-2"
              key={comment.id}
            >
              <div className="flex items-center gap-3">
                <h5 className="font-semibold">{comment?.users?.username}</h5>
                <span className="bg-gray-500/50 p-0.5 text-sm">
                  {comment.created_at?.slice(0, 19).replace('T', ' ')}
                </span>
              </div>
              <p className="mt-1.5 pl-2">{comment.text}</p>
            </div>
          ))
        ) : (
          <h4 className="text-center text-xl font-semibold lg:text-2xl border-y-2 border-gray-500 py-2 mt-4">
            Комментариев пока нет
          </h4>
        )}
      </div>
    </div>
  );
};

export default Comments;
