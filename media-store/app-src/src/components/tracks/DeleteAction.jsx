import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteTrack } from '../../api/calls';
import { useErrors } from '../../hooks/useErrors';
import { MESSAGE_TIMEOUT } from '../../util/constants';

const DeleteAction = ({ ID, onDeleteTrack }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { handleError } = useErrors();

  const onOk = () => {
    setModalVisible(false);
    deleteTrack(ID)
      .then(() => {
        onDeleteTrack();
        setModalVisible(false);
        message.success('Track successfully deleted!', MESSAGE_TIMEOUT);
      })
      .catch(handleError);
  };

  const onCancel = () => setModalVisible(false);
  const onOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <DeleteOutlined onClick={onOpenModal}>Delete</DeleteOutlined>
      <Modal title="Confirm" visible={modalVisible} onOk={onOk} onCancel={onCancel}>
        <p>Are You really want to delete this track?</p>
      </Modal>
    </>
  );
};

DeleteAction.propTypes = {
  ID: PropTypes.number.isRequired,
  onDeleteTrack: PropTypes.func.isRequired,
};

export { DeleteAction };