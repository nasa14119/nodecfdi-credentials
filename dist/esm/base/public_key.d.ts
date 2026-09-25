import forge from '@vilic/node-forge';
import Key from '#src/internal/key';
import { type Algorithm } from '#src/types';
export default class PublicKey extends Key {
    constructor(source: string);
    /**
     *
     * @param callableFunction - Function to call and inject content
     * @param _publicKeyContents - PublicKey content
     *
     * @throws Error when Cannot open public key
     */
    private static callOnPublicKeyWithContents;
    /**
     * Verify the signature of some data
     *
     * @param data - Input data
     * @param signature - Target signature
     * @param algorithm - Algorithm to be used
     */
    verify(data: string, signature: string, algorithm?: Algorithm): boolean;
    /**
     * Run a Callable function with this public key opened
     *
     * @param callableFunction - Function to call and inject content
     */
    callOnPublicKey<T>(callableFunction: (pbk: forge.pki.rsa.PublicKey) => T): T;
}
