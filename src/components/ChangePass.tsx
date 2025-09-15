import React, {useState} from "react";
import Modal from './Modal';


function ChangePass(){

    const [isOpen,setIsOpen] = useState(false);

    const handleChangePass = () => {
            setIsOpen(true);
    }

    return(
        <>
        <a href='#password'onClick={handleChangePass}>Change Password</a>

        {isOpen && (
        <Modal title="Enter Data" onClose={() => setIsOpen(false)}>
          <form>
            <div>
              <label>Name:</label>
              <input type="text" placeholder="Enter Name" />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="modal-actions">
              <button type="submit" className="btn" style={{ background: "blue", color: "white" }}>
                Submit
              </button>
              <button type="button" className="btn btn-cancel" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
      </>
    );
}

export default ChangePass;