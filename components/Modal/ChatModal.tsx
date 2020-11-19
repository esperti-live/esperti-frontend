import Chat from '../Chat'
import Modal from "../Modal";

const ChatModal = ({ closeModal, channel, user, expert }) => {


  return (
    <Modal closeModal={closeModal}>
      <Chat 
        channel={channel} 
        user={user}
        expert={expert}
      />
    </Modal>
  );
};

export default ChatModal;
