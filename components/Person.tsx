import Image from 'next/image';
import React, { useState, useCallback, useRef } from 'react';

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
}

interface Props {
  user: UserData;
  deleteUser: (id: string) => void;
  updateUser: (id: string, data: Partial<UserData>) => void;
  openModal: (event: any, userData: any) => void;
}

const Avatar: React.FC<{ username: string }> = ({ username }) => (
  <div className="cardHeadImage">
    <Image
      width={200}
      height={200}
      src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`}
      alt="Avatar"
      style={{
        width: '200px',
        height: '200px',
      }}
    />
  </div>
);

const UserInfo: React.FC<{ user: UserData }> = ({ user }) => (
  <div className="user__info">
    <h3 className="user__name">{user.name}</h3>
    <div className="contact">
      <span className="logo-wrapper">
        <Image src={'/icons/email.svg'} width={18} height={18} alt="email" />
      </span>
      <span className="text__label">{user.email}</span>
    </div>
    <div className="contact">
      <Image width={18} height={18} src={'/icons/phone.svg'} alt="phone" />
      <span className="text__label">{user.phone}</span>
    </div>
    <div className="contact">
      <Image src={'/icons/globe.svg'} width={18} height={18} alt="website" />
      <span className="text__label">{`https://${user.website}`}</span>
    </div>
  </div>
);

const ActionButton: React.FC<{
  onClick: (event: any) => void;
  iconSrc: string;
  alt: string;
}> = ({ onClick, iconSrc, alt }) => (
  <div className="action__container">
    <button className="action" onClick={onClick}>
      <Image src={iconSrc} width={18} height={18} alt={alt} />
    </button>
  </div>
);

const Person: React.FC<Props> = ({
  user,
  deleteUser,
  updateUser,
  openModal,
}) => {
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLiked = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <>
      <div className="card">
        <Avatar username={user.username} />
        <UserInfo user={user} />
        <div className="actions">
          <ActionButton
            onClick={toggleLiked}
            iconSrc={liked ? '/icons/red-dil.svg' : '/icons/dil.svg'}
            alt="like"
          />
          <ActionButton
            onClick={(e) => {
              openModal(e, user);
            }}
            iconSrc={'/icons/edit.svg'}
            alt="edit"
          />
          <ActionButton
            onClick={() => deleteUser(user.id)}
            iconSrc={'/icons/delete.svg'}
            alt="delete"
          />
        </div>
      </div>
    </>
  );
};

export default Person;
