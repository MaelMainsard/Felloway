export const AvatarLayout = ({ user_array }) => {

    let avatar = user_array.images || null;
    avatar = avatar && avatar.image0 || null;
    const name = user_array.firstName || '?';

    return (
        <div className='avatar'>
            <div className="w-8 rounded-full">
                {avatar ? (
                    <img src={avatar} alt="Avatar" className='object-cover rounded-full w-8 avatar' />
                ) : (
                    <span className='text-grey_2 text-center justify-center w-8 h-8 pt-1 rounded-full font-semibold avatar'>
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
        </div>
    );
};