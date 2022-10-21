import { useEffect } from 'react';
import PrivacyPolicy from '../../assets/sfuel-station-privacy-policy.pdf';

import CookieConsent, {
    getCookieConsentValue,
    Cookies
} from 'react-cookie-consent';

export default function FuelCookieConsent({ initGA }: { initGA: (gaCode: string) => void}) {
    const acceptCookies = () => {
        if (process.env.REACT_APP_GA_UA_CODE as string) {
            initGA(process.env.REACT_APP_GA_UA_CODE as string);
        }
    };

    const declineCookies = () => {
        Cookies.remove("_ga");
        Cookies.remove("_gat");
        Cookies.remove("_gid");
    };

    useEffect(() => {
        const isConsent = getCookieConsentValue();
        if (isConsent === "true") {
            acceptCookies();
        }
    }, []);

    return (
        <>
            <CookieConsent
                enableDeclineButton
                onAccept={acceptCookies}
                onDecline={declineCookies}
                buttonText="Accept Cookies"
                declineButtonText="Decline Cookies"
                declineButtonStyle={{
                    background: "var(--background-color)",
                    color: 'red'
                }}
                buttonStyle={{
                    background: "var(--primary-color)"
                }}
                style={{
                    background: "var(--background-color)",
                    color: "var(--text-color)"
                }}
            >
                This website uses cookies to enhance the user experience. View Privacy Policy <a style={{ textDecoration: 'none', color: 'var(--text-color)' }} href={PrivacyPolicy}> here</a>
            </CookieConsent>        
        </>
    );
} 
