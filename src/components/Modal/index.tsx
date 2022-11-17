import ReactModal from "react-modal";

const modalStyles: ReactModal.Styles = {
    content: {
        zIndex: '10000000000',
        position: 'relative',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'a`uto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--background-color)',
        width: '50%',
        height: '50%',
        borderRadius: '32px',
        boxShadow: '0 0 2px 2px var(--background-color)'
    }
};

ReactModal.setAppElement('#root');

export default({
    isModalOpen,
    toggleModal,
    children
}: {
    isModalOpen: boolean,
    toggleModal: () => void,
    children: JSX.Element | JSX.Element[]
}) => {



    return (
        <div id="customModal" onClick={(e) => e.stopPropagation()}>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={toggleModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                id="customModal2"
                style={modalStyles}
            >
                {children}
            </ReactModal>
        </div>
    );
}
