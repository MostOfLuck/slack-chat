import { useSelector } from 'react-redux';
import AddModalWindow from './AddModalWindow';
import RenameChannelModalWindow from './RenameChannelModalWindow';
import RemoveChannelModalWindow from './DeleteChannelModalWindow';

const ModalWindow = () => {
  const currentModalWindowType = useSelector((state) => state.modalWindow.type);

  if (currentModalWindowType === 'add') {
    return <AddModalWindow />;
  }

  if (currentModalWindowType === 'remove') {
    return <RemoveChannelModalWindow />;
  }

  if (currentModalWindowType === 'rename') {
    return <RenameChannelModalWindow />;
  }

  return null;
};

export default ModalWindow;
