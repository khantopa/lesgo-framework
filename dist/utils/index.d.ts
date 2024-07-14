import generateUid from './generateUid';
import getCurrentTimestamp from './getCurrentTimestamp';
import getJwtSubFromAuthHeader from './getJwtSubFromAuthHeader';
import isDecimal from './isDecimal';
import isEmail from './isEmail';
import isEmpty from './isEmpty';
import logger from './logger';
import validateFields from './validateFields';
export { generateUid, getCurrentTimestamp, getJwtSubFromAuthHeader, isDecimal, isEmail, isEmpty, logger, validateFields, };
declare const _default: {
    generateUid: (params?: import("./generateUid").GenerateUidParams) => string;
    getCurrentTimestamp: () => number;
    getJwtSubFromAuthHeader: (authHeader: string) => any;
    isDecimal: (number: string | number) => boolean;
    isEmail: (email: string) => boolean;
    isEmpty: (value: any) => boolean;
    logger: import("../services").LoggerService;
    validateFields: (params: import("./validateFields").Params, validFields: import("./validateFields").Field[]) => {
        [key: string]: any;
    };
};
export default _default;
