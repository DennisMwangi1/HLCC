const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export const MAX_RESUME_SIZE = 5 * 1024 * 1024;

function getExtension(filename: string): string | undefined {
    return filename.toLowerCase().match(/\.[^.]+$/)?.[0];
}

export function isValidResumeFile(file: File): boolean {
    if (file.size > MAX_RESUME_SIZE) return false;

    const ext = getExtension(file.name);
    if (ext && ALLOWED_EXTENSIONS.includes(ext)) return true;

    return ALLOWED_MIME_TYPES.includes(file.type);
}
