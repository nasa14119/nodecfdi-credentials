export default abstract class LocalFileOpen {
    /**
     * Read file and return file contents as binary string
     *
     * @param file - file name to be read
     * @returns binary string of file contents
     *
     * This function only works in Node.js.
     */
    static localFileOpen(file: string): string;
}
