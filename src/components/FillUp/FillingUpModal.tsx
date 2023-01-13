import styled from "styled-components";
import ReactModal from "react-modal";
import sFUELFillUp from "../../assets/sfuel_pump.mp4";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const modalStyles: ReactModal.Styles = {
    content: {
        zIndex: '100000000000',
        width: '50%',
        height: '50%',
        overflow: 'none',
        padding: 0,
        margin: 0,
        position: "absolute",
        top: "25%",
        left: "25%",
        right: "25%",
        bottom: "25%",
        background: "#000"
    }
};

ReactModal.setAppElement("#modal");

const Video = styled.video`
    width: 100%;
    height: auto;
    
`;
const FillingUpModal = (props: { toggleModal: any, isModalOpen: boolean }) => {
    

    return (
        <Container>
            <ReactModal
                style={modalStyles}
                onRequestClose={props.toggleModal}
                isOpen={props.isModalOpen}
            >
                    <Video autoPlay loop>
                        <source src={sFUELFillUp} type="video/mp4" />    
                        Your browser does not support the video tag.
                    </Video>
            </ReactModal>
        </Container>
    );
}

export default FillingUpModal;
