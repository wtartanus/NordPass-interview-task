import {FC, useState} from 'react';
import Modal from 'react-modal';

import {IItem} from "~/services/getUserItems";
import updateItem from '~/services/updateItem';

import ItemIcon from './components/ItemIcon';

import './list-style.scss';

interface IList {
  items: Array<IItem>,
  refreshUserItems: () => Promise<any>,
}

interface IUpdateModal {
  item: IItem;
  onChange: () => Promise<any>;
}

const UpdateModal: FC<IUpdateModal> = ({ item, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState('');

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        appElement={document.getElementById('app')}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)}
          autoFocus
        />
        <div className="pt-12px text-center">
          <button className="button" onClick={async () => {
            await updateItem({
              ...item,
              password: newPass,
            })

            setNewPass('');
            setShowModal(false);
            onChange();
          }}>Change</button>
          <button className="button ml-12px" onClick={() => {
            setNewPass('');
            setShowModal(false)
          }}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

const List: FC<IList> = ({items, refreshUserItems}) => (
  <ul className="list">
    {
      items.map((item) => (
        <li key={item.title} className="item">
          <ItemIcon title={item.title}/>
          <div>
            <div className="title">
              {item.title}
            </div>
            <div className="description">
              {item.description}
            </div>
          </div>
          <UpdateModal item={item} onChange={refreshUserItems}/>
        </li>
      ))
    }
  </ul>
)

export default List;
