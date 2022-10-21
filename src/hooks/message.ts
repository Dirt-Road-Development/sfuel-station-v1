import { useState } from "react";

interface Message {
    message: string;
    color: string | "var(--text-color)";
}

export default function useMessage() {
    return useState<Message | undefined>(undefined);
}
