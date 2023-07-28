export default function SinglePost(arg: {
  className: any;
  post: any;
  likeClicked: any;
  commentClicked: any;
  deletePostClicked: any;
}) {

  const { id, companyName, imageCompanyUrl, totalComments, totalLikes } = arg.post;

  return (
    <div className={arg.className + ' outline-1'} style={{ width: 650 }}>
      <div className="flex flex-col space-y-2">
        {/* <div className="flex flex-row items-center space-x-4 cursor-pointer active:opacity-80">
          <UserIcon className="cursor-pointer hover:text-gray-900 active:text-gray-700 h-14 w-14 text-gray-700" />
          <p className="text-lg  hover:underline">username</p>
        </div> */}

        <p className="text-base">{companyName}</p>

        <div className="flex flex-row items-end space-x-4 justify-center">
          <img className="rounded" width="430" height="768" src={imageCompanyUrl}></img>

          {/* Actions */}
          <div className="flex flex-col space-y-4">
            {/* <div className="flex flex-col items-center" onClick={() => arg.likeClicked({ id })}>
              <HeartOutline className="cursor-pointer hover:text-gray-900 active:text-gray-700 h-14 w-14 text-gray-700" />
              <p>{totalLikes}</p>
            </div>
            <div className="flex flex-col items-center" onClick={() => arg.commentClicked({ id })}>
              <ChatIcon className="cursor-pointer hover:text-gray-900 active:text-gray-700 h-14 w-14 text-gray-700" />
              <p>{totalComments}</p>
            </div> */}

            <div className="flex flex-col items-center" onClick={() => arg.deletePostClicked({ id })}>
              <>Delete</>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
