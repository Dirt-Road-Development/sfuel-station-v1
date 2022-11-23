import {useState} from 'react';
import styled from 'styled-components';
import sFUELV4 from '../../assets/how_sfuel_works.svg';
import sFUELTokenIcon from '../../assets/sfuel_gas_token.svg';
import ReactModal from "react-modal";

const modalStyles: ReactModal.Styles = {
    content: {
        zIndex: '100000000000',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: '0',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'none',
        padding: 0,
        margin: 0
    }
};


const PopupContainer = styled.div`
    position: fixed;
    bottom: 2.5%;
    right: 2.5%;
    height: 100px;
    width: 100px;
    z-index: 10000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    #gas_pump {
        color: red;
        background: white;
        border-radius: 50%;
        padding: 16px 32px;
        font-size: 2em;
    }

    #gas_icon {
        background: none;
    }
`;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background: black;
    postion: relative;
`;

ReactModal.setAppElement('#modal');

const Image = styled.img`
    width: 100%;
    height: 100%;
    transform: scale(100%);
`;

export const SFuelPopup = () => {
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const toggleModal = (e: any) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
    }

    return (
        <PopupContainer onClick={toggleModal}>
            {isModalOpen ? <p id="gas_pump">X</p> : <img id="gas_icon" src={sFUELTokenIcon} alt="sFUEL Token Icon" />}

            <SFuelModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
            />
        </PopupContainer>
    );

}

export const SFuelModal = (props: any) => {
    return (
        <>
            <ReactModal
                style={modalStyles}
                onRequestClose={props.toggleModal}
                isOpen={props.isModalOpen}
            >
                <ModalContainer>
                    <Image src={sFUELV4} alt="sFUEL Representation" /> 
                </ModalContainer>
            </ReactModal>
        </> 
    );

}

