// import Iron from '@hapi/iron';
import { parse, serialize } from 'cookie';

const IntersectionSecret = import.meta.env.VITE_INTERSECTION_SECRET
    ? import.meta.env.VITE_INTERSECTION_SECRET
    : '<<<<<++++random++++secret++++string++++>>>>>>';
const IntersectionAge = import.meta.env.VITE_INTERSECTION_AGE
    ? +import.meta.env.VITE_INTERSECTION_AGE
    : 60 * 60 * 12 * 1000; // seconds * minute * hour * 1000;
const IntersectionCookie = import.meta.env.VITE_INTERSECTION_COOKIE
    ? import.meta.env.VITE_INTERSECTION_COOKIE
    : 'intersection';


/**
 * Encrypt the given data using hapi/iron
 * @param jsonData : data to be encrypted
 * @returns encodeObject
 */
async function encode(jsonData) {
    const createdAt = Date.now();
    // Create an encoded object with a max age that we can validate later for expiry
    const finalObject = {
        data: jsonData,
        createdAt: createdAt,
        maxAge: IntersectionAge,
    };

    return finalObject
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // const encodeObject = await Iron.seal(finalObject, IntersectionSecret, Iron.defaults);
    // return encodeObject;
}

/**
 * Decrypt the given data using hapi/iron
 * @param encodeObject : Encrypted data by hapi/iron
 * @returns decodeObject
 */
// async function decode(encodeObject) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     const decodeObject = await Iron.unseal(
//         encodeObject,
//         IntersectionSecret,
//         Iron.defaults
//     );
//     const expiresAt = decodeObject.createdAt + decodeObject.maxAge;
//     // Validate the expiration date of the session
//     if (Date.now() > expiresAt) {
//         throw new Error('Encoded Object is expired');
//     }
//     return decodeObject;
// }

/**
 * Create a cookie object to be save
 * @param cookieData : data to be embedded in cookie
 * @returns cookie
 */
function createCookie(cookieData) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const cookie = serialize(IntersectionCookie, cookieData, {
        maxAge: IntersectionAge / 1000,
        expires: new Date(Date.now() + IntersectionAge),
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'none',
    });
    // TODO: implement below mentioned logic on later.
    // secure: import.meta.env.VITE_NODE_ENV === 'production',
    // sameSite: 'lax',
    return cookie;
}

/**
 * Create a cookie object to be clear
 * @returns cookie
 */
function createClearCookie(cookieName) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const cookie = serialize(cookieName, '', {
        maxAge: -1,
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'none',
    });
    return cookie;
}

/**
 * retrive intersection cookie (IntersectionCookie) from given request
 * @param request
 * @returns
 */
export async function getCookie(request) {
    let cookies;
    if (request.cookies) {
        cookies = request.cookies;
    } else {
        const cookie = request.headers?.cookie;
        cookies = parse(cookie || '');
    }
    const encodedCookie = cookies[IntersectionCookie];
    const decodedCookie = await decode(encodedCookie);
    return decodedCookie;
}


export async function setCookie(response, cookieData) {
    const encryptedCookieData = await cookieData
    const cookie = createCookie(encryptedCookieData);
    response.setHeader('Set-Cookie', cookie);
    return response;
}

/**
 * Reset cookie on the given request
 * @param {Object} response
 */
export function resetCookie(response) {
    const cookie = createClearCookie(IntersectionCookie);
    response.setHeader('Set-Cookie', cookie);
    return response;
}