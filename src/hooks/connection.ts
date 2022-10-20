import { useState } from 'react';

export default function useConnectedWallet() {
    return useState<boolean>(false);
}
