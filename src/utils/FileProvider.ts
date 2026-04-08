import type { Transaction } from "../types/Transaction";

interface DownloadFileOptions<T extends string = string> {
    data: T;
    filename: string;
    type: string;
}

const downloadFile = <T extends string>({ data, filename, type } : DownloadFileOptions<T>) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = filename;

    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    a.dispatchEvent(clickEvent);
    a.remove();
}

const uploadFile = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');

        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) {
                resolve(null);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            reader.readAsText(file);
        };

        input.oncancel = () => resolve(null);
        input.click();
    });
}

export const exportToJson = (data: any, filename: string) => {
    downloadFile({
        data: JSON.stringify(data),
        filename: `${filename}.json`,
        type: 'text/json'
    });
}

export const importFromJson : () => Promise<Transaction[]> = async () => {
    const data = await uploadFile();
    if (data) {
        return JSON.parse(data) as Transaction[];
    } else {
        throw new Error('No file selected or invalid JSON');
    }
}