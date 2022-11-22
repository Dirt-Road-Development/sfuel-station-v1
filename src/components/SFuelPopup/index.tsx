import {useState} from 'react';
import styled from 'styled-components';
import sFUELV4 from '../../assets/sfuel_graphic_v4.svg';
import ReactModal from "react-modal";

const modalStyles: ReactModal.Styles = {
    content: {
        zIndex: '1000000000000000',
        position: 'relative',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'black', 
        width: '100%',
        height: '100%',
        // borderRadius: '32px',
        boxShadow: '0 0 2px 2px var(--background-color)'
    }
};


const PopupContainer = styled.div`
    position: fixed;
    bottom: 2.5%;
    right: 2.5%;
    height: 100px;
    width: 100px;
    background: black;
    border-radius: 50%;
    z-index: 10000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    #gas_pump {
        color: white;
        transform: scale(300%);
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

const Header = styled.h3`
    position: absolute;
    left: 5%;
    top: 5%;
    width: 100%;
    z-index: 1000000000;
    color: white;
    font-size: 2.5em;
    p {
        font-size: 0.85rem;
    }
`;


export const SFuelPopup = () => {
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const toggleModal = (e: any) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
    }

    return (
        <PopupContainer onClick={toggleModal}>
            <p id="gas_pump">&#9981;</p>
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
                    <Header>How sFUEL Works<br /><p>sFUEL is the gasless</p></Header>
                    <Image src={sFUELV4} alt="sFUEL Representation" /> 
                </ModalContainer>
            </ReactModal>
        </> 
    );

}

