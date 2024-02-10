'use client';
import React, { useState, useEffect, useRef } from 'react';
// import { Row, Col } from 'antd';
import './globals.css';
import Person, { UserData } from '@/components/Person';

import jsonData from '../data.json';
import Modal from '@/components/Modal';

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserData>({
    email: '',
    id: '',
    name: '',
    phone: '',
    username: '',
    website: '',
  });

  const [transformOrigin, setTransformOrigin] = useState('center');

  const modalContentRef: any = useRef(null);
  // const transformOrigin: any = useRef('center');
  const timeOutId = useRef();
  useEffect(() => {
    setTimeout(() => {
      setUsers(jsonData);
    }, 2000);
  }, []);

  const deleteUser = (id: any) => {
    setUsers((prevUsers) => prevUsers.filter((entry) => entry.id !== id));
  };

  const updateUser = (id: any, data: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((entry) => {
        if (entry.id === id) return { ...entry, ...data };
        return entry;
      })
    );
  };
  const handleOk = (formData: any) => {
    updateUser(formData.id, formData);
    closeModal();
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    document.body.style.marginRight = '';
    setEditModalVisible(false);
   
    (timeOutId.current as any) = setTimeout(() => {
      setTransformOrigin(`center`);
    });
  };

  const openModal = (event: any, userData: any) => {
    const currentWidth = document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    const scrollBarWidth = document.body.offsetWidth - currentWidth;
    document.body.style.marginRight = `${scrollBarWidth}px`;

    clearTimeout(timeOutId.current);
    setCurrentUser(userData);
    const buttonRect = event.target.getBoundingClientRect();
    const modalContentRect = modalContentRef?.current?.getBoundingClientRect();

    const offsetX =
      buttonRect.left + buttonRect.width / 2 - modalContentRect.left;
    const offsetY =
      buttonRect.top + buttonRect.height / 2 - modalContentRect.top;
    setTransformOrigin(`${offsetX}px ${offsetY}px`);
    setEditModalVisible(true);
  };

  if (users.length === 0) {
    return (
      <div>
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    );
  }

  return (
    <div className="users">
      {users.map((user) => (
        <div key={user.username}>
          <Person
            user={user}
            deleteUser={deleteUser}
            updateUser={updateUser}
            openModal={openModal}
          />
        </div>
      ))}
      <Modal
        closeModal={closeModal}
        editModalVisible={editModalVisible}
        formData={currentUser}
        handleOk={handleOk}
        transformOrigin={transformOrigin}
        ref={modalContentRef}
      />
    </div>
  );
}
