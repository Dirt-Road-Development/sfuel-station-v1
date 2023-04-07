import styled from "styled-components";
import ReactModal from "react-modal";
import Projects from "../../config/projects.json";

import CalypsoLogo from "../../assets/calypsoLogo.svg";
import CletLogo from "../../assets/cletLogo.png";
import CryptoBladesLogo from "../../assets/cryptoBladesLogo.webp";
import CryptoColosseumLogo from "../../assets/cryptoColloseumLogo.svg";
import EuropaLogo from "../../assets/europaHubLogo.png";
import NFTradeLogo from "../../assets/nftradeLogo.svg";
import RubyLogo from "../../assets/rubyExchangeLogo.png";
import RazorLogo from "../../assets/razorNetworkLogo.svg";
import SkaleLogo from "../../assets/skale_logo_blue.svg";
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";

const images: string[] = [
    CalypsoLogo,
    CletLogo,
    CryptoBladesLogo,
    CryptoColosseumLogo,
    EuropaLogo,
    NFTradeLogo,
    RazorLogo,
    RubyLogo,
    SkaleLogo
];

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const HeaderSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
        font-size: 2.5rem;
    }

    p {
        font-size: 0.85rem;
    }
`;

const SplitterSection = styled.div`
    margin: 32px;
    height: 2.5px;
    background: var(--primary-color);
`;

const NetworkIntroductionSection = styled.div`
    margin: 32px;
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`;

const Project = styled.a<{color: string}>`
    height: 125px;
    margin: 0 10px;
    width: 22%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: 1px solid ${props => props.color};
    text-decoration: none;
    color: var(--text-color);
    &:hover {
        cursor: pointer;
    }

    img {
        width: auto;
        height: 30%;
    }

    p {
        heigth: 70%;
        &:hover {
            color: var(--text-color);
        }
    }
`;

const modalStyles: ReactModal.Styles = {
    content: {
        background: "var(--background-color)",
        color: "var(--text-color)",
        zIndex: '100000000000',
        width: '75%',
        height: '75%',
        overflow: 'none',
        position: "absolute",
        top: "12.5%",
        bottom: "12.5%",
        left: "12.5%",
        right: "12.5%",
        display: "flex",
        flexDirection: "column"
    }
};

ReactModal.setAppElement("#modal");

interface Props {
    toggleModal: any;
    isModalOpen: boolean;
    message: string;
}

const FilledUpModal = (props: Props) => {
    
    const {
        toggleModal,
        isModalOpen,
        // message
    } = props;
    
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <Container>
            <ReactModal
                style={modalStyles}
                onRequestClose={toggleModal}
                isOpen={isModalOpen}
            >
                <HeaderSection>
                    <h2>Explore the SKALEVERSE</h2>
                    <p>You successfully filled up your wallet using the sFUEL Station. You are now ready to explore the SKALEVERSE. Checkout some of the top dApps and projects in the SKALEVERSE below!</p>
                </HeaderSection>
                <SplitterSection />
                <NetworkIntroductionSection>
                    {Projects && Projects.map((project: any, index: number) => {
                        return (
                            <Project href={project.url} color={isDarkTheme ? project.dark : project.light}>
                                <img src={images[index]} alt="Project Identity" />
                                <p>{project.name}</p>
                            </Project>
                        );
                    })}                    
                </NetworkIntroductionSection>
            </ReactModal>
        </Container>
    );
}

export default FilledUpModal;
