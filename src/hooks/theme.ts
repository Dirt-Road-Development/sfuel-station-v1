import { useState } from 'react';

export default function useCustomTheme() {
    return useState<boolean>(false);
}
